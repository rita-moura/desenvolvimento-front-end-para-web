// Executado antes do CSS para aplicar a preferência antes da primeira pintura.
(() => {
  const chave = 'lacos-tema';
  const temas = ['claro', 'escuro', 'contraste'];
  const escuro = matchMedia('(prefers-color-scheme: dark)');
  const contraste = matchMedia('(prefers-contrast: more)');
  let preferencia = 'sistema';
  function lerPreferencia() {
    try {
      const salva = localStorage.getItem(chave);
      return temas.includes(salva) ? salva : 'sistema';
    } catch {
      return 'sistema';
    }
  }
  function aplicar() {
    document.documentElement.dataset.tema = preferencia === 'sistema'
      ? (contraste.matches ? 'contraste' : escuro.matches ? 'escuro' : 'claro')
      : preferencia;
    const seletor = document.querySelector('#tema');
    if (seletor) seletor.value = preferencia;
  }
  preferencia = lerPreferencia();
  aplicar();
  escuro.addEventListener('change', aplicar);
  contraste.addEventListener('change', aplicar);
  window.addEventListener('storage', event => {
    if (event.key !== chave && event.key !== null) return;
    preferencia = lerPreferencia();
    aplicar();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const seletor = document.querySelector('#tema');
    seletor.value = preferencia;
    seletor.addEventListener('change', () => {
      preferencia = temas.includes(seletor.value) ? seletor.value : 'sistema';
      try {
        if (preferencia === 'sistema') localStorage.removeItem(chave);
        else localStorage.setItem(chave, preferencia);
      } catch {
        // A troca continua disponível nesta página quando o armazenamento é bloqueado.
      }
      aplicar();
    });
    seletor.closest('.preferencias-tema').hidden = false;
  });
})();
