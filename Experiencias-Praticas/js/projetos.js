const projetos = [
  {
    id: 'aprender',
    titulo: 'Aprender juntos',
    descricao: 'Apoio aos estudos para crianças e adolescentes, com atividades de leitura e matemática.',
    objetivo: 'Incentivar a autonomia e a confiança dos estudantes durante a aprendizagem.',
    atividades: ['Acompanhamento de tarefas escolares.', 'Jogos educativos em grupo.']
  },
  {
    id: 'leitura',
    titulo: 'Leitura para todos',
    descricao: 'Encontros de leitura e troca de livros para pessoas de todas as idades.',
    objetivo: 'Ampliar o acesso aos livros e criar espaços para compartilhar histórias.',
    atividades: ['Rodas de leitura.', 'Organização de um acervo comunitário.']
  }
];

const lista = document.querySelector('#lista-projetos');
const modelo = document.querySelector('#projeto-template');
const fragmento = document.createDocumentFragment();

projetos.forEach(projeto => {
  const artigo = modelo.content.cloneNode(true);
  const elemento = artigo.querySelector('article');
  elemento.id = projeto.id;
  elemento.setAttribute('aria-labelledby', `titulo-${projeto.id}`);
  artigo.querySelector('[data-campo="titulo"]').id = `titulo-${projeto.id}`;
  artigo.querySelector('[data-campo="titulo"]').textContent = projeto.titulo;
  artigo.querySelector('[data-campo="descricao"]').textContent = projeto.descricao;
  artigo.querySelector('[data-campo="objetivo"]').textContent = projeto.objetivo;
  const atividades = artigo.querySelector('[data-campo="atividades"]');
  projeto.atividades.forEach(texto => {
    const item = document.createElement('li');
    item.textContent = texto;
    atividades.append(item);
  });
  fragmento.append(artigo);
});

lista.append(fragmento);
