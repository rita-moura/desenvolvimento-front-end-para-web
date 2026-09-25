// A navegação permanece disponível quando o JavaScript está desativado.
const menu = document.querySelector('#menu-principal');
const toggle = document.querySelector('.menu-toggle');
const submenu = document.querySelector('.submenu');
const desktop = matchMedia('(min-width: 1024px)');
function fecharMenu(devolverFoco = false) {
  toggle.setAttribute('aria-expanded', 'false');
  submenu.open = false;
  menu.hidden = !desktop.matches;
  if (devolverFoco) toggle.focus();
}
function adaptarMenu() {
  toggle.hidden = desktop.matches;
  fecharMenu();
}
toggle.addEventListener('click', () => {
  const aberto = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!aberto));
  menu.hidden = aberto;
  if (aberto) submenu.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (submenu.open) {
    submenu.open = false;
    submenu.querySelector('summary').focus();
  } else if (!desktop.matches && !menu.hidden) fecharMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('header')) fecharMenu();
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) fecharMenu();
});
desktop.addEventListener('change', adaptarMenu);
adaptarMenu();
