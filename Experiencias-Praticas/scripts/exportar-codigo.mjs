import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const arquivos = [
  'html/index.html', 'html/projetos.html', 'html/participe.html', 'html/cadastro.html',
  'css/estilos.css', 'js/app.js', 'js/vistas.js', 'js/tema.js', 'js/navegacao.js', 'js/projetos.js', 'js/cadastro.js',
  'imagens/leitura-comunitaria.svg', 'package.json', '.gitignore',
  'scripts/build.mjs', 'scripts/preparar-pages.mjs', 'scripts/exportar-codigo.mjs',
  'playwright.config.js', 'playwright.producao.config.js',
  '../.github/workflows/pages.yml'
];
let texto = 'Laços da Comunidade — código final da aplicação e automação\n';
texto += 'Repositório: https://github.com/rita-moura/desenvolvimento-front-end-para-web\n';
texto += 'Os separadores indicam arquivos independentes; este texto não é um único HTML.\n';
texto += 'Testes, verificadores, PNG, WebP e package-lock.json acompanham o repositório; os binários não são incorporados neste campo textual.\n';
for (const arquivo of arquivos) {
  texto += `\n${'='.repeat(60)}\nARQUIVO: ${arquivo}\n${'='.repeat(60)}\n`;
  texto += (await readFile(resolve(raiz, arquivo), 'utf8')).trimEnd() + '\n';
}
if (texto.length > 100000) throw new Error(`O código excede o campo de 100.000 caracteres: ${texto.length}.`);
await mkdir(resolve(raiz, 'entrega'), { recursive: true });
await writeFile(resolve(raiz, 'entrega/codigo-fonte-completo.txt'), texto);
console.log(`Código consolidado: ${texto.length}/100000 caracteres, ${arquivos.length} arquivos.`);
