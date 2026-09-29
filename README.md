# Laços da Comunidade — Experiências Práticas de Front-end

🌐 **[Abrir o site da ONG no GitHub Pages](https://rita-moura.github.io/desenvolvimento-front-end-para-web/Experiencias-Praticas/html/index.html)**

Site de uma ONG fictícia para praticar estrutura semântica, navegação e hierarquia de títulos.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica das quatro páginas e validação nativa do formulário.
- **CSS3:** estilos compartilhados, Grid, Flexbox e adaptação para desktop e celular.
- **JavaScript puro:** menu, máscaras, validação, templates de projetos e rascunho em `localStorage` com JSON.
- **Python 3:** servidor HTTP para execução local e para os testes.
- **Node.js, npm e Playwright:** instalação das dependências de desenvolvimento e testes automatizados em Chromium.
- **Git e GitHub:** versionamento, issues, pull requests e releases; GitHub Pages para publicação estática.

## Pré-requisitos

Para clonar o repositório, instale Git. Para executar pelo servidor local documentado, tenha Python 3 e um navegador atualizado. A aplicação não exige dependências npm para funcionar.

Para executar os testes, também são necessários Node.js **20 ou superior**, npm e o Chromium instalado pelo Playwright. A versão mínima do Node.js corresponde ao requisito das dependências registradas em `Experiencias-Praticas/package-lock.json`.

## Organização

```text
Experiencias-Praticas/
├── html/                 # quatro páginas da aplicação
├── css/estilos.css       # estilos compartilhados
├── js/                  # navegação, temas, cadastro e projetos
├── imagens/             # ilustrações locais
├── validacao/           # evidências de validação
├── package.json
├── playwright.config.js
├── site.spec.js
└── respostas.md
```

Abra `html/index.html` no navegador e use o menu para visitar as quatro páginas. Não é necessário instalar dependências.

As quatro páginas são Início, Projetos sociais, Participe e Cadastro. O nome da ONG e os conteúdos são exemplos fictícios.

## Como ler o HTML

- `<!DOCTYPE html>`: declara o documento como HTML moderno.
- `html lang="pt-BR"`: informa o idioma do conteúdo.
- `head`: reúne metadados e o título da aba; não é o cabeçalho visível.
- `header`: apresenta o site.
- `nav`: agrupa os links de navegação principal.
- `main`: delimita o conteúdo principal de cada página.
- `section`: reúne um assunto identificado por um título.
- `article`: apresenta conteúdo independente, como a descrição de um projeto.
- `aside`: apresenta informação complementar.
- `footer`: contém informações de encerramento.
- `address`: identifica os dados de contato da ONG.
- `img`: incorpora a ilustração local com uma descrição alternativa em `alt`.

Usamos um `h1` por página para seu tema principal, `h2` para assuntos e `h3` para subdivisões. Escolha o nível pelo significado, não pelo tamanho visual desejado. Nem todo agrupamento precisa ser uma `section`: ela deve representar um assunto.

O menu usa uma lista porque reúne opções relacionadas. `aria-current="page"` identifica a opção atual para tecnologias assistivas. O link “Pular para o conteúdo” permite chegar ao `main` sem percorrer todo o menu. `aria-labelledby` associa as regiões aos títulos existentes.

## Pratique

1. Localize o `h1` e o `main` de cada página.
2. Compare as `section` da página inicial com os `article` de projetos.
3. Adicione um terceiro projeto com `h2` e subdivisões em `h3`.
4. Navegue usando Tab e Enter e experimente “Pular para o conteúdo”.
5. Altere a missão da ONG preservando a hierarquia dos títulos.

A estrutura HTML recebe os estilos compartilhados de `css/estilos.css`. A pasta `imagens` contém uma ilustração SVG de um livro aberto, criada para este exercício. A página inicial apresenta contato fictício em `address` e um link de e-mail com `mailto:`. O domínio `.example` indica um endereço de demonstração. Ao adicionar uma imagem, use um texto `alt` que comunique sua finalidade, ou `alt=""` se ela for apenas decorativa.

## Etapa de cadastro

A página `html/cadastro.html` usa `fieldset` e `legend` para agrupar dados pessoais, endereço e participação. Cada campo tem um rótulo; campos obrigatórios usam `required`. Os tipos `email`, `date` e `tel`, os limites de comprimento e os padrões `pattern` ajudam a prevenir erros.

O arquivo `js/cadastro.js` aplica máscaras de CPF, telefone e CEP, confere os dígitos verificadores do CPF e impede datas futuras de nascimento. A máscara não confirma a existência de um CPF, telefone ou CEP. O formulário é demonstrativo: não transmite dados ao servidor, mas salva um rascunho em localStorage; use exemplos fictícios. Sem JavaScript, os campos ficam desabilitados para impedir envio acidental.

O HTML de cadastro foi enviado ao Nu HTML Checker do W3C em 23/09/2026, com zero mensagens após a correção do atributo autocomplete do telefone. Resultado em `validacao/cadastro-w3c.json`. Essa validação verifica a marcação; as máscaras e os dígitos verificadores também foram conferidos separadamente com Node.js.

As validações mostram mensagens junto aos campos ao perderem foco e ao concluir; campos já verificados são reavaliados durante a edição. Os testes no navegador cobriram campos vazios, nome e e-mail inválidos, máscaras e conclusão com dados de exemplo. A validação interativa nativa permanece habilitada: o navegador bloqueia a submissão inválida e apresenta suas mensagens. As mensagens acessíveis junto aos campos são complementares.

## Entrega final

A pasta `entrega` reúne os pacotes ZIP e uma cópia consolidada do HTML. As quatro páginas foram validadas no W3C sem mensagens. A imagem usa `picture` com SVG e WebP e fallback PNG, com texto alternativo na tag `img`. Os relatórios individuais estão em `validacao`.

## Estilo e testes automatizados

As quatro páginas compartilham `css/estilos.css`. O layout adapta menus e formulários a telas menores e mantém foco visível e mensagens de erro. A organização das páginas e as regras do formulário foram preservadas.

Para testar, instale Node.js e Python 3. Dentro de `Experiencias-Praticas`, execute:

```bash
npm ci
npx playwright install chromium
npm test
```

`site.spec.js` verifica navegação, carregamento de recursos, ausência de transbordamento horizontal, acesso por teclado, campos inválidos, máscaras, correção do cadastro e funcionamento sem JavaScript. A configuração em `playwright.config.js` executa os cenários com larguras de desktop e celular, iniciando um servidor local na porta 8765. As dependências e os resultados gerados são ignorados pelo Git.


## Temas claro, escuro e alto contraste

O seletor **Tema**, no cabeçalho das quatro páginas, oferece **Sistema**, **Claro**, **Escuro** e **Alto contraste**. É um `select` nativo com rótulo, disponível por teclado e também com o menu móvel fechado.

A opção Sistema acompanha `prefers-color-scheme` e `prefers-contrast`, dando prioridade ao contraste aumentado. A escolha manual prevalece e fica em `localStorage`, na chave `lacos-tema`; voltar a Sistema remove essa preferência. Se o armazenamento estiver bloqueado, a troca continua funcionando na página atual. Sem JavaScript, o seletor fica oculto e as media queries CSS acompanham o sistema.

`js/tema.js` define `data-tema` no elemento `html` antes do carregamento do CSS. As paletas usam variáveis compartilhadas em `css/estilos.css`, incluindo textos, fundos, controles, foco e mensagens de sucesso/erro. O alto contraste usa fundo preto, textos brancos, links amarelos sublinhados e foco ciano. O CSS preserva as cores forçadas do sistema (`forced-colors`).

Após esta implementação, **50 testes Playwright passaram**, nos perfis desktop e celular, incluindo persistência nas quatro páginas, teclado, preferência do sistema, armazenamento bloqueado, ausência de JavaScript e cores forçadas. A [verificação de contraste](Experiencias-Praticas/validacao/contraste.json) passou em **48 medições**: 42 pares de texto/fundo acima de 4,5:1 e seis medições da borda e do foco do seletor acima de 3:1. Os menores contrastes de texto da amostra foram 6,02:1 (claro), 8,72:1 (escuro) e 12,44:1 (alto contraste). Esses resultados não constituem auditoria integral de acessibilidade nem teste manual com leitores de tela.

Para repetir a medição após instalar as dependências e o Chromium, execute na raiz:

```bash
node Experiencias-Praticas/validacao/verificar-contraste.cjs
```

## Estado atual do projeto

A implementação atual está organizada na pasta `Experiencias-Praticas` e mantém uma arquitetura multipágina: `html/index.html`, `html/projetos.html`, `html/participe.html` e `html/cadastro.html` são documentos independentes. A apresentação está em `css/estilos.css`; os comportamentos estão em `js/cadastro.js`, `js/navegacao.js`, `js/projetos.js` e `js/tema.js`; os recursos gráficos ficam em `imagens/`.

O projeto já possui navegação responsiva, submenu, menu hambúrguer, máscaras e validação nativa do cadastro, feedback visual, Grid de 12 colunas, Flexbox, testes Playwright e relatórios W3C. Os arquivos de teste ficam em `site.spec.js` e podem ser executados com `npm ci` e `npm test` dentro de `Experiencias-Praticas`.

A etapa de JavaScript III propõe evoluir essa base para uma SPA. No estado documentado acima, a navegação ainda recarrega documentos HTML; a migração para `history.pushState`, roteamento e renderização em um contêiner principal será uma próxima implementação. Essa distinção mantém a documentação fiel ao código atual.


### Templates e componentes dinâmicos

A página `Experiencias-Praticas/html/projetos.html` usa o elemento HTML `template` como molde para os cards de projetos. `js/projetos.js` percorre dados estruturados, clona o conteúdo com `cloneNode`, preenche os campos com `textContent` e insere um `DocumentFragment` no DOM. A abordagem evita repetir a marcação e não interpreta dados dinâmicos como HTML.


### Eventos e interações

`js/navegacao.js` trata cliques, Escape e mudanças de breakpoint para o menu e o dropdown. `js/cadastro.js` trata input, blur, change, invalid e submit para máscaras, validação nativa, foco e feedback. A navegação entre documentos continua multipágina; a etapa SPA ainda será implementada.


### Consistência e feedback do formulário

O cadastro combina `Validity API`, `required`, `pattern`, tipos HTML, RegExp e verificação dos dígitos do CPF. Mensagens, `aria-invalid`, `aria-describedby` e classes de sucesso/erro orientam o preenchimento sem enviar dados.


### Persistência local

O cadastro salva um rascunho demonstrativo em `localStorage` com `JSON.stringify` durante `input` e `change`. No carregamento, `JSON.parse` restaura os valores; dados corrompidos são removidos. Nenhum dado é enviado ao servidor.


### Dependências externas

A aplicação usa Vanilla JavaScript e não importa frameworks ou bibliotecas por CDN. `@playwright/test` é uma dependência de desenvolvimento usada somente nos testes automatizados; não é carregada pelo site.


### Modularização JavaScript

Os comportamentos são separados por responsabilidade: `navegacao.js` controla menu e dropdown, `cadastro.js` controla formulário, validação e persistência, e `projetos.js` renderiza os cards a partir do template. Os scripts de navegação, cadastro e projetos usam `defer`. O script compartilhado `tema.js` é carregado antes do CSS para aplicar a preferência de cores antes da primeira pintura; registra o controle após `DOMContentLoaded`.


### Diagnóstico e correções

Durante os testes foram corrigidos o feedback bloqueado pela validação nativa, a restauração de rascunho com JSON inválido, referências para o CSS separado e a repetição manual dos cards. As correções usam Constraint Validation API, `try/catch`, caminhos relativos verificados e elemento `template`.


## Acessar o site publicado

O site está publicado como uma página estática no GitHub Pages:

<https://rita-moura.github.io/desenvolvimento-front-end-para-web/Experiencias-Praticas/html/index.html>

As páginas são independentes e podem ser acessadas pelo menu: `index.html`, `projetos.html`, `participe.html` e `cadastro.html`. O formulário usa dados fictícios, salva apenas um rascunho local no navegador e não envia informações para um servidor.

## Rodar localmente

1. Clone o repositório e entre na pasta criada:

```bash
git clone https://github.com/rita-moura/desenvolvimento-front-end-para-web.git
cd desenvolvimento-front-end-para-web
```

2. Na raiz do repositório, inicie o servidor com Python 3:

```bash
python3 -m http.server 8001 --bind 127.0.0.1 --directory Experiencias-Praticas
```

3. Abra <http://127.0.0.1:8001/html/index.html>. Mantenha o terminal do servidor aberto enquanto navega. Para encerrar, pressione `Ctrl+C`.

## Build e publicação

Não há etapa de compilação nem comando `npm run build`: o projeto usa HTML, CSS, JavaScript e imagens servidos diretamente. O GitHub Pages publica a versão da branch `main`, acessível pelo link no início deste README. Para executar localmente, basta seguir os passos da seção anterior.

## Executar os testes

Os testes Playwright ficam na pasta `Experiencias-Praticas` e cobrem navegação, menu móvel, dropdown, responsividade, template de projetos, formulário, validação nativa, persistência e feedback visual. Em outro terminal, a partir da raiz do repositório, instale as dependências registradas no lockfile, instale o navegador de teste e execute a suíte:

```bash
cd Experiencias-Praticas
npm ci
npx playwright install chromium
npm test
```

Para abrir a interface interativa do Playwright, use `npm run test:ui`. Os testes iniciam automaticamente um servidor local na porta 8765. O site publicado não precisa de Node.js; Node.js e Playwright são necessários apenas para os testes.


## Estratégia de branches

O GitFlow foi iniciado na Experiência Prática IV, preservando os commits anteriores em `main`:

- `main`: versão publicada pelo GitHub Pages.
- `develop`: integração das alterações antes da entrega.
- `feature/acessibilidade-menu`: preservação do foco ao mudar o breakpoint, integrada pelo PR #3.
- `feature/submenu-projetos`: melhoria visual e ordem do menu, integrada pelo PR #6.
- `release/1.0.1`: preparação de versão e documentação, integrada em `main` pelo PR #4 e depois devolvida a `develop`.

Não foi necessário criar um `hotfix/*`. Futuras correções urgentes podem partir de `main` e retornar a `main` e `develop`. As branches desta entrega foram preservadas para consulta. A revisão foi individual por inspeção e testes; não houve aprovação de outro colaborador.

## Commits e releases

Os commits desta entrega usam `type(scope): descrição`, incluindo `fix(a11y)`, `fix(nav)`, `docs(epiv)` e `chore(release)`. As mensagens antigas foram preservadas.

A tag anotada **v1.0.1** identifica a primeira release publicada. O projeto já declarava `1.0.0` no package.json; `1.0.1` incrementa PATCH por corrigir navegação sem alterar a estrutura da aplicação. A política é MAJOR para mudanças incompatíveis, MINOR para novas funcionalidades compatíveis e PATCH para correções.

## Registros da Experiência Prática IV

- [Correção de foco — issue #1](https://github.com/rita-moura/desenvolvimento-front-end-para-web/issues/1)
- [Documentação — issue #2](https://github.com/rita-moura/desenvolvimento-front-end-para-web/issues/2)
- [Organização do menu — issue #5](https://github.com/rita-moura/desenvolvimento-front-end-para-web/issues/5)
- [Milestone da entrega](https://github.com/rita-moura/desenvolvimento-front-end-para-web/milestone/1)
- [PR de foco #3](https://github.com/rita-moura/desenvolvimento-front-end-para-web/pull/3)
- [PR de navegação #6](https://github.com/rita-moura/desenvolvimento-front-end-para-web/pull/6)
- [PR de release #4](https://github.com/rita-moura/desenvolvimento-front-end-para-web/pull/4)
- [Release v1.0.1](https://github.com/rita-moura/desenvolvimento-front-end-para-web/releases/tag/v1.0.1)

O nome **Laços da Comunidade** leva à página inicial. A ordem do menu é **Participe → Cadastro → Projetos sociais ▾**. A seta abre o submenu; o link Projetos sociais abre a página completa. O acionador tem nome acessível, foco visível e área de toque de 44 × 44px. O elemento `details` mantém o submenu funcional sem JavaScript.

Os **32 testes Playwright** passaram em Chromium, com perfis desktop e celular. As evidências estão em [validacao/epiv.md](Experiencias-Praticas/validacao/epiv.md). Isso não substitui uma auditoria completa WCAG 2.1 AA. A aplicação permanece multipágina e não exige etapa de build: o GitHub Pages serve HTML, CSS, JavaScript e imagens diretamente da branch `main`.
