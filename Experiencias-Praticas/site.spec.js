const { test, expect } = require('@playwright/test');
const rota = pagina => `/html/index.html${pagina === 'index' ? '' : `?pagina=${pagina}`}`;

for (const pagina of ['index', 'projetos', 'participe', 'cadastro']) {
  test(`${pagina}: navegação, recursos e largura da tela`, async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    page.on('response', resposta => { if (resposta.status() >= 400) erros.push(resposta.url()); });
    await page.goto(rota(pagina));
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#menu-principal > ul > li > a')).toHaveText(['Participe', 'Cadastro', 'Projetos sociais']);
    await expect(page.locator('[aria-current="page"]')).toHaveAttribute('href', rota(pagina).replace('/html/', ''));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('header').evaluate(el => getComputedStyle(el).display)).toBe('flex');
    if (pagina === 'index') expect(await page.locator('img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    if (await page.locator('.menu-toggle').isVisible()) await page.locator('.menu-toggle').click();
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Cadastro', exact: true }).click();
    await expect(page).toHaveURL(/index\.html\?pagina=cadastro$/);
    await page.getByRole('link', { name: 'Laços da Comunidade', exact: true }).click();
    await expect(page).toHaveURL(/index.html$/);
    expect(erros).toEqual([]);
  });
}

test('teclado permite pular a navegação', async ({ page }) => {
  await page.goto('/html/index.html');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#app$/);
});

test('cadastro vazio exibe erros acessíveis e foca o primeiro campo', async ({ page }) => {
  await page.goto('/html/index.html?pagina=cadastro');
  await page.getByRole('button', { name: 'Validar cadastro de exemplo' }).click();
  await expect(page.locator('#nome')).toBeFocused();
  await expect(page.locator('#nome')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#nome')).toHaveAttribute('aria-describedby', /erro-nome/);
  const estado = await page.locator('#nome').evaluate(el => ({ missing: el.validity.valueMissing, custom: el.validity.customError, mensagem: el.validationMessage, nativa: !el.form.noValidate }));
  expect(estado.missing).toBe(true);
  expect(estado.custom).toBe(false);
  expect(estado.nativa).toBe(true);
  await expect(page.locator('#erro-nome')).toHaveText(estado.mensagem);
  await expect(page.getByRole('status')).toContainText('Revise');
});

test('rejeita dados inválidos e permite corrigir o cadastro sem envio', async ({ page }) => {
  await page.goto('/html/index.html?pagina=cadastro');
  for (const [id, valor] of Object.entries({ nome: '123', email: 'invalido', cpf: '11111111111', telefone: '0000000000', cep: '00000000', nascimento: '2999-01-01', numero: 'abc' })) {
    await page.locator(`#${id}`).fill(valor);
    await page.locator(`#${id}`).blur();
    await expect(page.locator(`#${id}`)).toHaveAttribute('aria-invalid', 'true');
  }
  for (const [id, valor] of Object.entries({ nome: 'Pessoa Teste', email: 'teste@example.com', cpf: '12345678909', telefone: '11988887777', cep: '01234567', nascimento: '2000-01-01', logradouro: 'Rua Exemplo', numero: 's/n', bairro: 'Centro', cidade: 'Cidade Exemplo' })) {
    await page.locator(`#${id}`).fill(valor);
  }
  await expect(page.locator('#cpf')).toHaveValue('123.456.789-09');
  await expect(page.locator('#telefone')).toHaveValue('(11) 98888-7777');
  await expect(page.locator('#cep')).toHaveValue('01234-567');
  await page.locator('#estado').selectOption('SP');
  await page.locator('#interesse').selectOption('voluntariado');
  await page.locator('[type="checkbox"]').check();
  const envios = [];
  page.on('request', req => envios.push(req.url()));
  await page.getByRole('button', { name: 'Validar cadastro de exemplo' }).click();
  await expect(page.getByRole('status')).toContainText('Cadastro de exemplo validado!');
  expect(envios).toEqual([]);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('lacos-cadastro-rascunho')).nome)).toBe('Pessoa Teste');
});

test('sem JavaScript preserva a Home e informa a necessidade para outras vistas', async ({ browser }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false });
  const page = await contexto.newPage();
  await page.goto('http://127.0.0.1:8765/html/index.html?pagina=cadastro');
  await expect(page.locator('main h1')).toContainText('Juntos');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('.aviso-sem-js')).toContainText('Ative o JavaScript');
  await contexto.close();
});

test('restrições HTML bloqueiam o submit com mensagens nativas', async ({ page }) => {
  await page.goto('/html/index.html?pagina=cadastro');
  for (const [id, valor, flag] of [['email', 'invalido', 'typeMismatch'], ['cpf', '123', 'patternMismatch'], ['telefone', '11', 'patternMismatch'], ['cep', '12', 'patternMismatch'], ['nascimento', '2999-01-01', 'rangeOverflow']]) {
    const estado = await page.locator(`#${id}`).evaluate((el, {valor, flag}) => {
      el.setCustomValidity('');
      el.value = valor;
      let enviado = false;
      const observar = () => { enviado = true; };
      el.form.addEventListener('submit', observar);
      el.form.requestSubmit();
      el.form.removeEventListener('submit', observar);
      return { falha: el.validity[flag], custom: el.validity.customError, mensagem: el.validationMessage, enviado };
    }, {valor, flag});
    expect(estado.falha).toBe(true);
    expect(estado.custom).toBe(false);
    expect(estado.mensagem).not.toBe('');
    expect(estado.enviado).toBe(false);
  }
});

test('Grid de 12 colunas nos limites dos cinco breakpoints', async ({ page }) => {
  for (const largura of [375, 479, 480, 767, 768, 1023, 1024, 1279, 1280, 1535, 1536, 1920]) {
    await page.setViewportSize({ width: largura, height: 900 });
    for (const pagina of ['index', 'projetos', 'participe', 'cadastro']) {
      await page.goto(rota(pagina));
      const layout = await page.locator('main').evaluate(el => ({
        colunas: getComputedStyle(el).gridTemplateColumns.split(' ').length,
        semOverflow: document.documentElement.scrollWidth <= innerWidth
      }));
      expect(layout.colunas).toBe(12);
      expect(layout.semOverflow).toBe(true);
      if (pagina === 'projetos') {
        const span = await page.locator('article').first().evaluate(el => getComputedStyle(el).gridColumnStart);
        expect(span).toBe(largura >= 1024 ? 'span 6' : '1');
      }
      if (pagina === 'cadastro') {
        const grid = await page.locator('#campos > fieldset').first().evaluate(el => { const campos = el.querySelectorAll(':scope > p'); return Math.abs(campos[0].getBoundingClientRect().top - campos[1].getBoundingClientRect().top) < 2 ? 2 : 1; });
        expect(grid).toBe(largura >= 768 ? 2 : 1);
        const inicio = await page.locator('form').evaluate(el => getComputedStyle(el).gridColumnStart);
        expect(inicio).toBe(largura >= 1536 ? '3' : largura >= 1280 ? '2' : '1');
      }
    }
  }
});

test('menu móvel, dropdown, teclado e mudança de breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/html/index.html');
  const toggle = page.locator('.menu-toggle');
  const menu = page.locator('#menu-principal');
  const summary = page.locator('.submenu summary');
  await expect(menu).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('link', { name: 'Voluntariado', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(menu).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(menu).toBeVisible();
  await expect(toggle).toBeHidden();
  await summary.click();
  await expect(page.locator('.submenu-lista')).toHaveCSS('position', 'absolute');
  await page.getByRole('link', { name: 'Voluntariado', exact: true }).click();
  await expect(page).toHaveURL(/index\.html\?pagina=projetos#voluntariado$/);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(menu).toBeHidden();
});

test('estados visuais de erro e sucesso do formulário', async ({ page }) => {
  await page.goto('/html/index.html?pagina=cadastro');
  await page.getByRole('button', { name: 'Validar cadastro de exemplo' }).click();
  await expect(page.locator('#resultado')).toHaveClass(/feedback-erro/);
  await expect(page.locator('#nome')).toHaveAttribute('aria-invalid', 'true');
  const dados = { nome: 'Pessoa Teste', email: 'teste@example.com', nascimento: '2000-01-01', cpf: '12345678909', telefone: '11988887777', cep: '01234567', logradouro: 'Rua Exemplo', numero: '100', bairro: 'Centro', cidade: 'Cidade Exemplo' };
  for (const [id, valor] of Object.entries(dados)) await page.locator(`#${id}`).fill(valor);
  await page.locator('#estado').selectOption('SP');
  await page.locator('#interesse').selectOption('voluntariado');
  await page.locator('[name="demonstracao"]').check();
  await page.getByRole('button', { name: 'Validar cadastro de exemplo' }).click();
  await expect(page.locator('#resultado')).toHaveClass(/feedback-sucesso/);
  await expect(page.locator('#resultado')).toContainText('validado');
});

test('projetos são renderizados a partir de template e dados JavaScript', async ({ page }) => {
  await page.goto('/html/index.html?pagina=projetos');
  await expect(page.locator('#projeto-template')).toHaveCount(1);
  await expect(page.locator('#lista-projetos article')).toHaveCount(2);
  await expect(page.locator('#aprender h2')).toHaveText('Aprender juntos');
  await expect(page.locator('#leitura li')).toHaveCount(2);
});

test('rascunho do cadastro persiste com JSON no localStorage', async ({ page }) => {
  await page.goto('/html/index.html?pagina=cadastro');
  await page.locator('#nome').fill('Pessoa Persistida');
  await page.locator('#email').fill('persistida@example.com');
  const salvo = await page.evaluate(() => JSON.parse(localStorage.getItem('lacos-cadastro-rascunho')));
  expect(salvo.nome).toBe('Pessoa Persistida');
  await page.reload();
  await expect(page.locator('#nome')).toHaveValue('Pessoa Persistida');
  await expect(page.locator('#email')).toHaveValue('persistida@example.com');
});


test('mudança de breakpoint mantém o foco em um controle visível', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/html/index.html');
  const toggle = page.locator('.menu-toggle');
  const primeiroLink = page.locator('#menu-principal > ul > li > a').first();
  await primeiroLink.focus();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(toggle).toBeFocused();
  await expect(page.locator('#menu-principal')).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(primeiroLink).toBeFocused();
  await expect(toggle).toBeHidden();
});

test('redimensionar fecha o submenu sem perder o foco nem mover foco externo', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/html/index.html');
  await page.locator('.menu-toggle').click();
  const summary = page.locator('.submenu summary');
  await summary.click();
  await page.getByRole('link', { name: 'Voluntariado', exact: true }).focus();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(summary).toBeFocused();
  await expect(page.locator('.submenu')).not.toHaveAttribute('open');
  const pular = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await pular.focus();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('.menu-toggle')).toBeVisible();
  await expect(pular).toBeFocused();
});

for (const tema of ['claro', 'escuro', 'contraste']) {
  test(`tema ${tema} persiste ao recarregar e navegar nas quatro páginas`, async ({ page }) => {
    await page.goto('/html/index.html');
    await page.getByLabel('Tema', { exact: true }).selectOption(tema);
    await page.reload();
    for (const pagina of ['index', 'projetos', 'participe', 'cadastro']) {
      await page.goto(rota(pagina));
      await expect(page.locator('html')).toHaveAttribute('data-tema', tema);
      await expect(page.getByLabel('Tema', { exact: true })).toHaveValue(tema);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(await page.evaluate(() => localStorage.getItem('lacos-tema'))).toBe(tema);
  });
}

test('tema do sistema acompanha mudanças e respeita escolha manual', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', contrast: 'no-preference' });
  await page.goto('/html/index.html');
  const raiz = page.locator('html');
  const seletor = page.getByLabel('Tema', { exact: true });
  await expect(raiz).toHaveAttribute('data-tema', 'escuro');
  await expect(seletor).toHaveValue('sistema');
  await page.emulateMedia({ colorScheme: 'light', contrast: 'more' });
  await expect(raiz).toHaveAttribute('data-tema', 'contraste');
  await seletor.selectOption('claro');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(raiz).toHaveAttribute('data-tema', 'claro');
  await seletor.selectOption('sistema');
  await expect(raiz).toHaveAttribute('data-tema', 'contraste');
  expect(await page.evaluate(() => localStorage.getItem('lacos-tema'))).toBeNull();
  await page.emulateMedia({ contrast: 'no-preference' });
  await expect(raiz).toHaveAttribute('data-tema', 'escuro');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(raiz).toHaveAttribute('data-tema', 'claro');
});

test('seletor de tema funciona por teclado e preserva o foco', async ({ page }) => {
  await page.goto('/html/index.html');
  const seletor = page.getByLabel('Tema', { exact: true });
  // Percorre a ordem natural, incluindo o link para pular a navegação.
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    if (await seletor.evaluate(el => el === document.activeElement)) break;
  }
  await expect(seletor).toBeFocused();
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(seletor).toHaveValue('contraste');
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'contraste');
  await expect(seletor).toBeFocused();
  await expect(seletor).toHaveCSS('outline-style', 'solid');
});

test('tema funciona sem armazenamento e ignora preferência inválida', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Armazenamento bloqueado'); };
    Storage.prototype.setItem = () => { throw new Error('Armazenamento bloqueado'); };
    Storage.prototype.removeItem = () => { throw new Error('Armazenamento bloqueado'); };
  });
  const erros = [];
  page.on('pageerror', error => erros.push(error.message));
  await page.goto('/html/index.html');
  const seletor = page.getByLabel('Tema', { exact: true });
  await seletor.selectOption('escuro');
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'escuro');
  await seletor.selectOption('sistema');
  await expect(seletor).toHaveValue('sistema');
  expect(erros).toEqual([]);
});

test('valor de tema desconhecido usa a preferência do sistema', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lacos-tema', 'invalido'));
  await page.emulateMedia({ colorScheme: 'dark', contrast: 'no-preference' });
  await page.goto('/html/index.html');
  await expect(page.getByLabel('Tema', { exact: true })).toHaveValue('sistema');
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'escuro');
});

test('sem JavaScript as cores seguem o sistema e o seletor fica oculto', async ({ browser }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
  try {
    const page = await contexto.newPage();
    await page.goto('http://127.0.0.1:8765/html/index.html');
    await expect(page.locator('#tema')).toBeHidden();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(16, 28, 23)');
    await page.emulateMedia({ contrast: 'more' });
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
    await expect(page.locator('body')).toHaveCSS('color', 'rgb(255, 255, 255)');
  } finally { await contexto.close(); }
});

test('cores forçadas preservam controles e foco do sistema', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/html/index.html?pagina=cadastro');
  await page.getByLabel('Tema', { exact: true }).selectOption('contraste');
  const botao = page.locator('button[type="submit"]');
  await botao.focus();
  await expect(botao).toHaveCSS('border-top-style', 'solid');
  await expect(botao).toHaveCSS('outline-style', 'solid');
  await expect(botao).toHaveCSS('forced-color-adjust', 'auto');
  await botao.press('Enter');
  await expect(page.locator('#nome')).toBeFocused();
});

async function abrirRotaPeloMenu(page, nome) {
  if (await page.locator('.menu-toggle').isVisible() && await page.locator('#menu-principal').isHidden()) {
    await page.locator('.menu-toggle').click();
  }
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: nome, exact: true }).click();
}

test('SPA troca vistas sem recarregar o documento e atualiza título, foco e menu', async ({ page }) => {
  await page.goto(rota('index'));
  await page.evaluate(() => { window.marcaDaSessaoSPA = 'preservada'; });
  const documentos = [];
  page.on('request', req => { if (req.isNavigationRequest()) documentos.push(req.url()); });
  for (const [nome, vista, titulo] of [['Projetos sociais', 'projetos', 'Projetos sociais'], ['Participe', 'participe', 'Participe da nossa comunidade'], ['Cadastro', 'cadastro', 'Cadastro de participação']]) {
    await abrirRotaPeloMenu(page, nome);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('#app h1')).toHaveText(titulo);
    await expect(page.locator('#app h1')).toBeFocused();
    await expect(page.locator(`[data-rota="${vista}"]`)).toHaveAttribute('aria-current', 'page');
    await expect(page).toHaveTitle(`${nome} | Laços da Comunidade`);
  }
  expect(documentos).toEqual([]);
  expect(await page.evaluate(() => window.marcaDaSessaoSPA)).toBe('preservada');
});

test('SPA restaura vistas com Voltar e Avançar, inclusive o estado inicial', async ({ page }) => {
  await page.goto(rota('index'));
  await abrirRotaPeloMenu(page, 'Projetos sociais');
  await abrirRotaPeloMenu(page, 'Cadastro');
  await page.goBack();
  await expect(page.locator('#app h1')).toHaveText('Projetos sociais');
  await expect(page.locator('#lista-projetos article')).toHaveCount(2);
  await page.goBack();
  await expect(page.locator('#app h1')).toContainText('Juntos');
  await page.goForward();
  await expect(page.locator('#app h1')).toHaveText('Projetos sociais');
  await page.goForward();
  await expect(page.locator('#nome')).toBeVisible();
});

test('SPA preserva rascunho e não duplica mensagens ao remontar o cadastro', async ({ page }) => {
  await page.goto(rota('cadastro'));
  await page.locator('#nome').fill('Pessoa Persistida');
  for (let i = 0; i < 3; i++) {
    await abrirRotaPeloMenu(page, 'Projetos sociais');
    await expect(page.locator('#lista-projetos article')).toHaveCount(2);
    await abrirRotaPeloMenu(page, 'Cadastro');
    await expect(page.locator('#nome')).toHaveValue('Pessoa Persistida');
    await expect(page.locator('#erro-nome')).toHaveCount(1);
  }
  await page.locator('#cpf').fill('12345678909');
  await expect(page.locator('#cpf')).toHaveValue('123.456.789-09');
});

test('SPA aceita rota direta, recarga e âncora de projeto', async ({ page }) => {
  await page.goto(rota('projetos') + '#leitura');
  await expect(page.locator('#leitura')).toBeFocused();
  await page.reload();
  await expect(page.locator('#leitura')).toBeFocused();
  await expect(page.locator('#lista-projetos article')).toHaveCount(2);
});

test('SPA mostra rota desconhecida com retorno funcional e respeita novas abas', async ({ page }) => {
  await page.goto('/html/index.html?pagina=__proto__');
  await expect(page.locator('#app h1')).toHaveText('Página não encontrada');
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect(page.locator('#app h1')).toContainText('Juntos');
  const link = page.locator('[data-rota="projetos"]');
  await link.evaluate(el => el.target = '_blank');
  if (await page.locator('.menu-toggle').isVisible()) await page.locator('.menu-toggle').click();
  const [popup] = await Promise.all([page.waitForEvent('popup'), link.click()]);
  await expect(popup.locator('#app h1')).toHaveText('Projetos sociais');
  await expect(page.locator('#app h1')).toContainText('Juntos');
  await popup.close();
});

test('endereços antigos encaminham para a SPA preservando âncoras', async ({ page }) => {
  await page.goto('/html/projetos.html#leitura');
  await expect(page).toHaveURL(/index\.html\?pagina=projetos#leitura$/);
  await expect(page.locator('#leitura')).toBeFocused();
  await page.goto('/html/cadastro.html');
  await expect(page.locator('#nome')).toBeVisible();
  await page.goto('/html/participe.html');
  await expect(page.locator('#app h1')).toHaveText('Participe da nossa comunidade');
});

test('SPA mantém cadastro utilizável com localStorage indisponível ou rascunho corrompido', async ({ page }) => {
  const erros = [];
  page.on('pageerror', error => erros.push(error.message));
  await page.addInitScript(() => localStorage.setItem('lacos-cadastro-rascunho', 'null'));
  await page.goto(rota('cadastro'));
  await expect(page.locator('#nome')).toBeEnabled();
  await page.evaluate(() => {
    Storage.prototype.getItem = Storage.prototype.setItem = Storage.prototype.removeItem = () => { throw new Error('Bloqueado'); };
  });
  await abrirRotaPeloMenu(page, 'Projetos sociais');
  await abrirRotaPeloMenu(page, 'Cadastro');
  await page.locator('#nome').fill('Pessoa Teste');
  await expect(page.locator('#nome')).toHaveValue('Pessoa Teste');
  expect(erros).toEqual([]);
});
