// Execute na raiz: node Experiencias-Praticas/validacao/verificar-contraste.cjs
// Fórmula: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
const { chromium } = require('@playwright/test');
const { resolve } = require('node:path');
const servir = require('./servidor-local.cjs');
const { writeFileSync } = require('node:fs');
const producao = process.argv.includes('--build');
const raizSite = resolve(__dirname, producao ? '../dist' : '..');
function luminancia(rgb) {
  const c = rgb.map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
}
function hex(rgb) { return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join(''); }
(async () => {
  const servidor = await servir(raizSite);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
    const medicoes = [];
    let tema;
    async function medir(elemento, seletor, propriedade = 'color', fundoSeletor = null, minimo = 4.5) {
      const cores = await page.locator(seletor).first().evaluate((el, { propriedade, fundoSeletor }) => {
        const parse = valor => valor.match(/[\d.]+/g).map(Number);
        const texto = parse(getComputedStyle(el)[propriedade]);
        let fundo;
        for (let atual = fundoSeletor ? document.querySelector(fundoSeletor) : el; atual; atual = atual.parentElement) {
          const cor = parse(getComputedStyle(atual).backgroundColor);
          if (cor.length === 3 || cor[3] === 1) { fundo = cor.slice(0, 3); break; }
          if (cor[3] !== 0) throw new Error('Fundo semitransparente exige composição.');
        }
        if (!fundo) throw new Error('Fundo opaco não encontrado.');
        return { texto: texto.slice(0, 3), fundo };
      }, { propriedade, fundoSeletor });
      const l = [luminancia(cores.texto), luminancia(cores.fundo)].sort((a, b) => b - a);
      const razao = (l[0] + 0.05) / (l[1] + 0.05);
      medicoes.push({ tema, elemento, seletor, propriedade, minimo, texto: hex(cores.texto), fundo: hex(cores.fundo), razao, aprovado: razao >= minimo });
    }
    for (tema of ['claro', 'escuro', 'contraste']) {
      async function abrir(pagina) {
        await page.goto(`${servidor.url}/html/index.html${pagina === 'index' ? '' : `?pagina=${pagina}`}`);
        await page.getByLabel('Tema', { exact: true }).selectOption(tema);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(250);
      }
      await abrir('index');
      await medir('Texto principal', 'h1');
      await medir('Texto dos blocos', 'main > section p');
      await medir('Texto de apresentação', 'main > p');
      await medir('Rodapé', 'footer');
      await medir('Links do menu', '#menu-principal a');
      await medir('Seletor de tema', '#tema');
      await medir('Borda do seletor', '#tema', 'borderTopColor', null, 3);
      await page.locator('#tema').focus();
      await page.keyboard.press('ArrowDown');
      // A medição do foco não deve alterar o tema selecionado.
      await page.getByLabel('Tema', { exact: true }).selectOption(tema);
      await medir('Contorno de foco do seletor', '#tema', 'outlineColor', 'header', 3);
      await page.locator('#tema').blur();
      if (tema !== 'claro') {
        await page.screenshot({ path: `/tmp/lacos-${tema}-desktop.png` });
        await page.setViewportSize({ width: 375, height: 812 });
        await page.screenshot({ path: `/tmp/lacos-${tema}-celular.png` });
        await page.setViewportSize({ width: 1280, height: 900 });
      }
      await abrir('cadastro');
      await medir('Link ativo no menu', '#menu-principal a[aria-current]');
      await medir('Texto dos campos', '#nome');
      await medir('Instruções dos campos', '#ajuda-cpf');
      await medir('Botão de cadastro', 'button[type="submit"]');
      await page.locator('button[type="submit"]').hover();
      await page.waitForTimeout(250);
      await medir('Botão de cadastro em hover', 'button[type="submit"]');
      await page.locator('button[type="submit"]').click();
      await medir('Erro junto ao campo', '#erro-nome');
      await medir('Resultado com erro', '#resultado');
      const dados = { nome: 'Pessoa Teste', email: 'teste@example.com', nascimento: '2000-01-01', cpf: '12345678909', telefone: '11988887777', cep: '01234567', logradouro: 'Rua Exemplo', numero: '100', bairro: 'Centro', cidade: 'Cidade Exemplo' };
      for (const [id, valor] of Object.entries(dados)) await page.locator(`#${id}`).fill(valor);
      await page.locator('#estado').selectOption('SP');
      await page.locator('#interesse').selectOption('voluntariado');
      await page.locator('[name="demonstracao"]').check();
      await page.locator('button[type="submit"]').click();
      if (!(await page.locator('#resultado').getAttribute('class')).includes('feedback-sucesso')) {
        throw new Error('O formulário não alcançou o estado de sucesso.');
      }
      await medir('Resultado com sucesso', '#resultado');
      // Não compartilhar rascunhos entre as amostras dos temas.
      await page.evaluate(() => localStorage.removeItem('lacos-cadastro-rascunho'));
    }
    const report = {
      versao: producao ? 'build minificada (dist)' : 'fontes',
      ferramenta: 'Playwright/Chromium + script JavaScript (fórmula WCAG)',
      referencia: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
      escopo: 'Três temas; textos (4,5:1), borda e foco do seletor (3:1). Cores computadas com fundos opacos e validação real do formulário. Não é auditoria integral.',
      medicoes
    };
    writeFileSync(resolve(__dirname, producao ? 'contraste-producao.json' : 'contraste.json'), JSON.stringify(report, null, 2) + '\n');
    for (const t of ['claro', 'escuro', 'contraste']) {
      const grupo = medicoes.filter(m => m.tema === t);
      console.log(t, grupo.length, 'medições;', grupo.filter(m => !m.aprovado));
    }
    if (medicoes.some(m => !m.aprovado)) process.exitCode = 1;
  } finally { await browser.close(); await servidor.fechar(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
