# Desenvolvimento Front-end para Web

Repositório de estudos e atividades práticas da disciplina Desenvolvimento Front-end para Web. Reúne exemplos de HTML5, recursos multimídia e gráficos, além de um projeto de site para uma ONG fictícia.

## Conteúdos de estudo

Os exemplos estão na pasta [Fundamentos da Web e Estruturação de Interfaces](Fundamentos-da-Web-e-Estruturacao-de-Interfaces/):

| Pasta | Conteúdo |
|---|---|
| [HTML5-elementos-semanticos-formularios](Fundamentos-da-Web-e-Estruturacao-de-Interfaces/HTML5-elementos-semanticos-formularios/) | Elementos semânticos, hierarquia de títulos, tipos de campos, máscaras e validação. |
| [HMTL5-recursos-multimidea](Fundamentos-da-Web-e-Estruturacao-de-Interfaces/HMTL5-recursos-multimidea/) | Áudio, vídeo e incorporação de conteúdo com iframe, object e embed. |
| [HTML5-recursos-graficos](Fundamentos-da-Web-e-Estruturacao-de-Interfaces/HTML5-recursos-graficos/) | Desenhos e animações com Canvas e exemplos de SVG. |

## Experiência Prática 1 — Laços da Comunidade

Site acadêmico de uma ONG fictícia, desenvolvido para exercitar HTML5 semântico, acessibilidade e formulários.

| Página | Finalidade |
|---|---|
| [Início](Experiencia-Pratica-1/html/index.html) | Apresentação da ONG, missão, valores, imagem e contato demonstrativo. |
| [Projetos sociais](Experiencia-Pratica-1/html/projetos.html) | Projetos educativos, orientações de voluntariado e campanhas de doação. |
| [Participe](Experiencia-Pratica-1/html/participe.html) | Formas de participação e acesso ao cadastro. |
| [Cadastro](Experiencia-Pratica-1/html/cadastro.html) | Formulário com grupos de campos, máscaras e mensagens de validação. |

O formulário utiliza atributos de validação do HTML5 e JavaScript para formatar CPF, telefone e CEP, conferir os dígitos verificadores do CPF e orientar a correção de campos inválidos. A imagem da página inicial está disponível em SVG, WebP e PNG, com texto alternativo.

**O projeto é demonstrativo:** a organização e os contatos são fictícios. O formulário não envia nem armazena dados, e não há processamento de doações. Utilize dados fictícios ao experimentar o cadastro.

### Organização do projeto

```text
Experiencia-Pratica-1/
├── html/          # Páginas do site
├── imagens/       # Ilustração em SVG, WebP e PNG
├── js/            # Máscaras e validações do cadastro
├── validacao/     # Relatórios do validador W3C
├── entrega/       # Pacotes ZIP e código HTML consolidado
├── README.md      # Guia da atividade
└── respostas.md   # Respostas e reflexões sobre o desenvolvimento
```

## Como executar

Não é necessário instalar dependências para abrir as páginas. Baixe ou clone este repositório e abra `Experiencia-Pratica-1/html/index.html` no navegador. Navegue pelo menu para acessar as demais páginas.

Para executar com um servidor local, caso tenha Python 3 instalado, rode este comando na raiz do repositório:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Depois, acesse <http://127.0.0.1:8000/Experiencia-Pratica-1/html/index.html>. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

Os exemplos da pasta de fundamentos também podem ser abertos individualmente no navegador. Exemplos que incorporam conteúdo externo podem precisar de acesso à internet.

## Tecnologias e validação

- HTML5 para estrutura semântica, navegação e formulários.
- CSS para estilos dos exemplos e indicações visuais de erro.
- JavaScript para interações, máscaras e validação dos campos.
- SVG e Canvas para os exercícios gráficos.

As quatro páginas da Experiência Prática 1 foram verificadas no Nu HTML Checker do W3C, com relatórios finais sem erros ou avisos. Os resultados estão em [validacao](Experiencia-Pratica-1/validacao/). Essa conferência da marcação não substitui testes de funcionamento ou uma avaliação completa de acessibilidade.

Consulte o [guia da experiência prática](Experiencia-Pratica-1/README.md) para detalhes e o [arquivo de respostas](Experiencia-Pratica-1/respostas.md) para acompanhar os conceitos trabalhados.
