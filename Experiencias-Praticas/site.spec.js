const { test, expect } = require('@playwright/test');

for (const pagina of ['index', 'projetos', 'participe', 'cadastro']) {
  test(`${pagina}: navegação, recursos e largura da tela`, async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    page.on('response', resposta => { if (resposta.status() >= 400) erros.push(resposta.url()); });
    await page.goto(`/html/${pagina}.html`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#menu-principal > ul > li > a')).toHaveText(['Início', 'Projetos sociais', 'Participe', 'Cadastro']);
    await expect(page.locator('[aria-current="page"]')).toHaveAttribute('href', `${pagina}.html`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('header').evaluate(el => getComputedStyle(el).display)).toBe('flex');
    if (pagina === 'index') expect(await page.locator('img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    if (await page.locator('.menu-toggle').isVisible()) await page.locator('.menu-toggle').click();
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Cadastro', exact: true }).click();
    await expect(page).toHaveURL(/cadastro.html$/);
    expect(erros).toEqual([]);
  });
}

test('teclado permite pular a navegação', async ({ page }) => {
  await page.goto('/html/index.html');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('cadastro vazio exibe erros acessíveis e foca o primeiro campo', async ({ page }) => {
  await page.goto('/html/cadastro.html');
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
  await page.goto('/html/cadastro.html');
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
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
});

test('sem JavaScript mantém a demonstração desabilitada', async ({ browser }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false });
  const page = await contexto.newPage();
  await page.goto('http://127.0.0.1:8765/html/cadastro.html');
  await expect(page.locator('#nome')).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Validar cadastro de exemplo' })).toBeDisabled();
  await expect(page.locator('noscript')).toBeVisible();
  await contexto.close();
});

test('restrições HTML bloqueiam o submit com mensagens nativas', async ({ page }) => {
  await page.goto('/html/cadastro.html');
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
      await page.goto(`/html/${pagina}.html`);
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
  await expect(page).toHaveURL(/projetos.html#voluntariado$/);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(menu).toBeHidden();
});

test('estados visuais de erro e sucesso do formulário', async ({ page }) => {
  await page.goto('/html/cadastro.html');
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
