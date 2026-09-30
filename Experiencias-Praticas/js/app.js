import { renderHome, renderProjetos, renderParticipe, renderCadastro, renderNaoEncontrada } from './vistas.js';
import { iniciarNavegacao } from './navegacao.js';

const app = document.querySelector('#app');
const entrada = new URL('index.html', location.href);
const menu = iniciarNavegacao();
// Query strings mantêm links diretos e recargas no GitHub Pages sem regras de rewrite.
const rotas = {
  inicio: { titulo: 'Início', render: renderHome },
  projetos: { titulo: 'Projetos sociais', render: renderProjetos },
  participe: { titulo: 'Participe', render: renderParticipe },
  cadastro: { titulo: 'Cadastro', render: renderCadastro }
};
let rotaAtual;
function nomeDaRota(url) { return url.searchParams.get('pagina') || 'inicio'; }
function focarDestino(url) {
  let id;
  try { id = decodeURIComponent(url.hash.slice(1)); } catch { id = ''; }
  const alvo = (id && document.getElementById(id)) || app.querySelector('h1') || app;
  if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
  alvo.focus({ preventScroll: true });
  if (id && document.getElementById(id)) alvo.scrollIntoView();
  else window.scrollTo(0, 0);
}
function apresentar(url, moverFoco = true) {
  const nome = nomeDaRota(url);
  const rota = Object.hasOwn(rotas, nome) ? rotas[nome] : { titulo: 'Página não encontrada', render: renderNaoEncontrada };
  if (rotaAtual !== nome) {
    // Não recria a Home no primeiro carregamento; preserva a imagem já carregada.
    if (rotaAtual !== undefined || nome !== 'inicio') rota.render(app);
    rotaAtual = nome;
  }
  document.title = `${rota.titulo} | Laços da Comunidade`;
  for (const link of document.querySelectorAll('header [data-rota]')) {
    if (link.dataset.rota === nome) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  menu.fechar();
  if (moverFoco || url.hash) focarDestino(url);
}
// Só intercepta cliques comuns em links desta aplicação. Novas abas e downloads permanecem nativos.
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== entrada.origin || url.pathname !== entrada.pathname) return;
  event.preventDefault();
  if (url.href !== location.href) history.pushState({ rota: nomeDaRota(url) }, '', url.href);
  apresentar(url);
});
window.addEventListener('popstate', () => apresentar(new URL(location.href)));
history.replaceState({ rota: nomeDaRota(new URL(location.href)) }, '', location.href);
apresentar(new URL(location.href), false);
