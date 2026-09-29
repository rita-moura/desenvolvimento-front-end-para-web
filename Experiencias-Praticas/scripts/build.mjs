import { build, version as esbuildVersion } from 'esbuild';
import { minify } from 'html-minifier-terser';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = resolve(raiz, 'dist');
const entradas = [
  'css/estilos.css',
  'js/cadastro.js',
  'js/navegacao.js',
  'js/projetos.js',
  'js/tema.js'
];
const paginas = ['index', 'projetos', 'participe', 'cadastro'].map(nome => `html/${nome}.html`);

// Apenas o diretório gerado é limpo; os fontes continuam legíveis e versionados.
await rm(destino, { recursive: true, force: true });
await mkdir(resolve(destino, 'html'), { recursive: true });
await build({
  absWorkingDir: raiz,
  entryPoints: entradas,
  outbase: '.',
  outdir: destino,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome109', 'firefox115', 'safari15.4'],
  minify: true,
  charset: 'utf8',
  legalComments: 'inline',
  sourcemap: false,
  logLevel: 'warning'
});

for (const arquivo of paginas) {
  const html = await readFile(resolve(raiz, arquivo), 'utf8');
  const resultado = await minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
    minifyCSS: true,
    removeAttributeQuotes: false,
    removeOptionalTags: false
  });
  // Caminhos, atributos ARIA, IDs e ordem dos scripts são preservados.
  await writeFile(resolve(destino, arquivo), resultado);
}
await cp(resolve(raiz, 'imagens'), resolve(destino, 'imagens'), {
  recursive: true,
  filter: origem => !origem.endsWith('.gitkeep')
});

const arquivos = [];
for (const arquivo of [...paginas, ...entradas].sort()) {
  const original = await readFile(resolve(raiz, arquivo));
  const minificado = await readFile(resolve(destino, arquivo));
  arquivos.push({
    arquivo,
    tipo: arquivo.split('.').pop(),
    bytesOriginal: original.length,
    bytesMinificado: minificado.length,
    reducaoPercentual: (1 - minificado.length / original.length) * 100,
    sha256Original: createHash('sha256').update(original).digest('hex'),
    sha256Minificado: createHash('sha256').update(minificado).digest('hex')
  });
}
function resumir(itens) {
  const bytesOriginal = itens.reduce((soma, item) => soma + item.bytesOriginal, 0);
  const bytesMinificado = itens.reduce((soma, item) => soma + item.bytesMinificado, 0);
  return { bytesOriginal, bytesMinificado, reducaoPercentual: (1 - bytesMinificado / bytesOriginal) * 100 };
}
const relatorio = {
  ferramentas: { esbuild: esbuildVersion, 'html-minifier-terser': require('html-minifier-terser/package.json').version },
  escopo: 'Bytes UTF-8 dos quatro HTML, um CSS e quatro JS usados no site; sem gzip/Brotli. Imagens copiadas sem alteração e excluídas deste cálculo.',
  formula: '(1 - bytesMinificado / bytesOriginal) * 100',
  arquivos,
  porTipo: Object.fromEntries(['html', 'css', 'js'].map(tipo => [tipo, resumir(arquivos.filter(item => item.tipo === tipo))])),
  total: resumir(arquivos)
};
await mkdir(resolve(raiz, 'validacao'), { recursive: true });
await writeFile(resolve(raiz, 'validacao/minificacao.json'), JSON.stringify(relatorio, null, 2) + '\n');
console.log(`Build gerada em dist/: ${relatorio.total.bytesOriginal} → ${relatorio.total.bytesMinificado} bytes (${relatorio.total.reducaoPercentual.toFixed(2)}% de redução).`);
for (const [tipo, dados] of Object.entries(relatorio.porTipo)) console.log(`${tipo.toUpperCase()}: ${dados.reducaoPercentual.toFixed(2)}% de redução.`);
