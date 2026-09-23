const { test, expect } = require('@playwright/test');

for (const pagina of ['index', 'projetos', 'participe', 'cadastro']) {
  test(`${pagina}: navegação, recursos e largura da tela`, async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    page.on('response', resposta => { if (resposta.status() >= 400) erros.push(resposta.url()); });
    await page.goto(`/html/${pagina}.html`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[aria-current="page"]')).toHaveAttribute('href', `${pagina}.html`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('header').evaluate(el => getComputedStyle(el).display)).toBe('flex');
    if (pagina === 'index') expect(await page.locator('img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
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
  await page.getByRole('button').click();
  await expect(page.locator('#nome')).toBeFocused();
  await expect(page.locator('#nome')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#nome')).toHaveAttribute('aria-describedby', /erro-nome/);
  await expect(page.locator('#erro-nome')).toHaveText('Preencha este campo.');
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
  await page.getByRole('button').click();
  await expect(page.getByRole('status')).toContainText('Cadastro de exemplo validado!');
  expect(envios).toEqual([]);
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
});

test('sem JavaScript mantém a demonstração desabilitada', async ({ browser }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false });
  const page = await contexto.newPage();
  await page.goto('http://127.0.0.1:8765/html/cadastro.html');
  await expect(page.locator('#nome')).toBeDisabled();
  await expect(page.getByRole('button')).toBeDisabled();
  await expect(page.locator('noscript')).toBeVisible();
  await contexto.close();
});
