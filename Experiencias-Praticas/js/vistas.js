import { inicializarCadastro } from './cadastro.js';
import { renderizarProjetos } from './projetos.js';

// A Home já está no HTML para continuar legível sem JavaScript.
const inicio = document.createElement('template');
for (const node of document.querySelector('#app').childNodes) inicio.content.append(node.cloneNode(true));
function montar(app, modelo) {
  app.replaceChildren(modelo.content.cloneNode(true));
}
export function renderHome(app) {
  montar(app, inicio);
}
export function renderProjetos(app) {
  montar(app, document.querySelector('#vista-projetos'));
  renderizarProjetos(app); // Reutiliza projeto-template e textContent.
}
export function renderParticipe(app) {
  montar(app, document.querySelector('#vista-participe'));
}
export function renderCadastro(app) {
  montar(app, document.querySelector('#vista-cadastro'));
  inicializarCadastro(app); // Cada nova vista recebe seus próprios listeners.
}
export function renderNaoEncontrada(app) {
  const titulo = document.createElement('h1');
  titulo.textContent = 'Página não encontrada';
  const link = document.createElement('a');
  link.href = 'index.html';
  link.textContent = 'Voltar ao início';
  app.replaceChildren(titulo, link);
}
