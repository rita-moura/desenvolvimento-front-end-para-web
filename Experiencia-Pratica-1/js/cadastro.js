// Máscaras formatam a entrada; pattern verifica o formato final.
const form = document.querySelector('form');
const resultado = document.querySelector('#resultado');
const mascaras = {
  cpf: valor => valor.replace(/\D/g, '').slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  cep: valor => valor.replace(/\D/g, '').slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2'),
  telefone: valor => {
    const digitos = valor.replace(/\D/g, '').slice(0, 11);
    if (digitos.length <= 2) return digitos;
    const assinante = digitos.slice(2);
    const separador = assinante.length > 8 ? 5 : 4;
    return `(${digitos.slice(0, 2)}) ${assinante.slice(0, separador)}${assinante.length > separador ? '-' + assinante.slice(separador) : ''}`;
  }
};
function cpfValido(valor) {
  const numeros = valor.replace(/\D/g, '');
  if (!/^\d{11}$/.test(numeros) || /^(\d)\1{10}$/.test(numeros)) return false;
  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(numeros[i]) * (tamanho + 1 - i);
    const digito = (soma * 10 % 11) % 10;
    if (digito !== Number(numeros[tamanho])) return false;
  }
  return true;
}
for (const [id, mascara] of Object.entries(mascaras)) {
  const campo = document.getElementById(id);
  campo.addEventListener('input', () => {
    const posicao = campo.selectionStart;
    const digitosAntes = campo.value.slice(0, posicao).replace(/\D/g, '').length;
    campo.value = mascara(campo.value);
    let cursor = 0;
    let contagem = 0;
    while (cursor < campo.value.length && contagem < digitosAntes) {
      if (/\d/.test(campo.value[cursor])) contagem++;
      cursor++;
    }
    campo.setSelectionRange(cursor, cursor);
    if (id === 'cpf') campo.setCustomValidity(campo.value && !cpfValido(campo.value) ? 'Informe um CPF com 11 dígitos e dígitos verificadores válidos.' : '');
  });
}
const hoje = new Date();
document.querySelector('#nascimento').max = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
// Mensagens persistentes associadas a cada campo, além da validação nativa.
const campos = [...form.querySelectorAll('input, select')];
function validar(campo) {
  campo.setCustomValidity('');
  const valor = campo.value.trim();
  let mensagem = '';
  if (campo.required && (campo.type === 'checkbox' ? !campo.checked : !valor)) {
    mensagem = campo.type === 'checkbox' ? 'Confirme que usará dados fictícios.' : 'Preencha este campo.';
  } else if (valor) {
    if (campo.id === 'nome' && (valor.length < 3 || !/^[\p{L}]+(?:[ ’'-][\p{L}]+)+$/u.test(valor))) mensagem = 'Informe nome e sobrenome, usando letras.';
    if (campo.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) mensagem = 'Informe um e-mail como nome@exemplo.com.';
    if (campo.id === 'cpf' && !cpfValido(valor)) mensagem = 'Informe um CPF com 11 dígitos e dígitos verificadores válidos.';
    if (campo.id === 'telefone' && !/^\([1-9][0-9]\) (?:[2-5][0-9]{3}|9[0-9]{4})-[0-9]{4}$/.test(valor)) mensagem = 'Informe DDD e telefone: (11) 3333-4444 ou (11) 98888-7777.';
    if (campo.id === 'cep' && (!/^[0-9]{5}-[0-9]{3}$/.test(valor) || valor === '00000-000')) mensagem = 'Informe um CEP com 8 dígitos, no formato 00000-000.';
    if (campo.id === 'nascimento' && (valor > campo.max || Number(valor.slice(0, 4)) < 1)) mensagem = 'Informe uma data de nascimento válida, sem datas futuras.';
    if (campo.id === 'numero' && !/^(?:[0-9]+[a-zA-Z]?|s\/n)$/i.test(valor)) mensagem = 'Informe um número, como 100 ou 100A, ou s/n.';
  }
  if (!mensagem && !campo.validity.valid) mensagem = campo.validationMessage;
  campo.setCustomValidity(mensagem);
  campo.setAttribute('aria-invalid', String(Boolean(mensagem)));
  document.getElementById(`erro-${campo.id}`).textContent = mensagem;
  return !mensagem;
}
for (const campo of campos) {
  if (!campo.id) campo.id = campo.name;
  const erro = document.createElement('span');
  erro.id = `erro-${campo.id}`;
  erro.className = 'erro';
  erro.setAttribute('aria-live', 'polite');
  campo.closest('p').append(erro);
  campo.setAttribute('aria-describedby', [campo.getAttribute('aria-describedby'), erro.id].filter(Boolean).join(' '));
  campo.addEventListener('blur', () => validar(campo));
  campo.addEventListener('input', () => {
    resultado.textContent = '';
    if (campo.hasAttribute('aria-invalid')) validar(campo);
  });
  campo.addEventListener('change', () => validar(campo));
}
// O script mostra todos os erros; os atributos HTML continuam sendo consultados.
form.noValidate = true;
form.addEventListener('submit', event => {
  event.preventDefault();
  const invalidos = campos.filter(campo => !validar(campo));
  if (invalidos.length) {
    resultado.textContent = 'Revise os campos indicados antes de continuar.';
    invalidos[0].focus();
    return;
  }
  resultado.textContent = 'Cadastro de exemplo validado! Nenhum dado foi enviado ou armazenado.';
});
document.querySelector('#campos').disabled = false;
