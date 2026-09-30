// Execute após npm run build: node validacao/verificar-imagens.cjs
const { chromium } = require('@playwright/test');
const { readFileSync, writeFileSync, statSync } = require('node:fs');
const { resolve, relative } = require('node:path');
const servir = require('./servidor-local.cjs');
const raiz = resolve(__dirname, '../dist');

(async () => {
  const servidor = await servir(raiz);
  const browser = await chromium.launch({ headless: true });
  try {
    const formatos = [];
    const probe = await browser.newPage();
    for (const formato of ['svg', 'webp', 'png']) {
      const arquivo = `imagens/leitura-comunitaria.${formato}`;
      const url = `${servidor.url}/${arquivo}`;
      await probe.goto(url);
      const dimensoes = await probe.evaluate(async url => {
        const img = new Image();
        img.src = url;
        await img.decode();
        return { largura: img.naturalWidth, altura: img.naturalHeight };
      }, url);
      formatos.push({ formato, arquivo, bytes: statSync(resolve(raiz, arquivo)).size, ...dimensoes });
      if (!readFileSync(resolve(raiz, arquivo)).equals(readFileSync(resolve(__dirname, '..', arquivo)))) {
        throw new Error('A imagem na build difere da imagem de origem.');
      }
    }
    await probe.close();
    const cenarios = [];
    for (const [larguraViewport, dpr] of [[375, 1], [375, 2], [768, 1], [1280, 1], [1920, 2]]) {
      const contexto = await browser.newContext({ viewport: { width: larguraViewport, height: 900 }, deviceScaleFactor: dpr });
      const page = await contexto.newPage();
      const pedidos = new Set();
      page.on('request', req => pedidos.add(req.url()));
      await page.goto(`${servidor.url}/html/index.html`);
      const imagem = await page.locator('picture img').evaluate(async img => {
        await img.decode();
        const rect = img.getBoundingClientRect();
        return {
          selecionada: img.currentSrc.split('/').pop(),
          larguraCaixa: rect.width, alturaCaixa: rect.height,
          objectFit: getComputedStyle(img).objectFit,
          semOverflow: document.documentElement.scrollWidth <= innerWidth,
          alt: img.alt
        };
      });
      const recursos = [...pedidos].filter(url => url.startsWith(servidor.url)).map(url => {
        const caminho = resolve(raiz, '.' + new URL(url).pathname);
        return { arquivo: relative(raiz, caminho), bytes: statSync(caminho).size };
      }).sort((a, b) => a.arquivo.localeCompare(b.arquivo));
      if (imagem.selecionada !== 'leitura-comunitaria.svg' || !imagem.semOverflow || !imagem.alt) {
        throw new Error('Falha na seleção, no layout ou no texto alternativo da imagem.');
      }
      if (recursos.filter(r => r.arquivo.startsWith('imagens/')).length !== 1) {
        throw new Error('Mais de uma imagem solicitada na navegação inicial.');
      }
      cenarios.push({ larguraViewport, dpr, ...imagem, recursos, bytesRecursos: recursos.reduce((s, r) => s + r.bytes, 0) });
      await contexto.close();
    }
    const png = formatos.find(f => f.formato === 'png').bytes;
    const comparacoes = formatos.filter(f => f.formato !== 'png').map(f => ({
      formato: f.formato,
      economiaBytesFrenteAoPNG: png - f.bytes,
      reducaoPercentual: (1 - f.bytes / png) * 100,
      economiaTransferenciaMsA1Mbps: (png - f.bytes) * 8 / 1000000 * 1000
    }));
    const svg = formatos.find(f => f.formato === 'svg').bytes;
    const relatorio = {
      ferramenta: 'Playwright/Chromium e tamanhos em bytes do sistema de arquivos',
      escopo: 'Build local; seleção e layout medidos em navegador. Bytes dos recursos solicitados, sem cabeçalhos ou compressão HTTP. Não mede tempo global, LCP ou desempenho público.',
      formatos,
      cenarios,
      comparacoes,
      estimativa: {
        velocidadeBitsPorSegundo: 1000000,
        premissas: 'Sem cache, latência, DNS/TLS, cabeçalhos, compressão de rede, concorrência ou custo de processamento. Estimativa de transferência, não medição de tempo global.',
        bytesPaginaComSVG: cenarios[0].bytesRecursos,
        bytesPaginaHipoteticaComPNG: cenarios[0].bytesRecursos - svg + png,
        transferenciaComSVGMs: cenarios[0].bytesRecursos * 8 / 1000000 * 1000,
        transferenciaComPNGMs: (cenarios[0].bytesRecursos - svg + png) * 8 / 1000000 * 1000
      }
    };
    writeFileSync(resolve(__dirname, 'imagens.json'), JSON.stringify(relatorio, null, 2) + '\n');
    console.log(JSON.stringify({ formatos, cenarios: cenarios.map(({recursos, ...c}) => c), comparacoes, estimativa: relatorio.estimativa }, null, 2));
  } finally { await browser.close(); await servidor.fechar(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
