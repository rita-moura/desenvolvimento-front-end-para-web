# Laços da Comunidade — Experiências Práticas de Front-end

🌐 **[Abrir o site da ONG no GitHub Pages](https://rita-moura.github.io/desenvolvimento-front-end-para-web/Experiencias-Praticas/html/index.html)**

Site de uma ONG fictícia para praticar estrutura semântica, navegação e hierarquia de títulos.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica da SPA e suas quatro vistas e validação nativa do formulário.
- **CSS3:** estilos compartilhados, Grid, Flexbox e adaptação para desktop e celular.
- **JavaScript puro:** menu, máscaras, validação, templates de projetos e rascunho em `localStorage` com JSON.
- **Python 3:** servidor HTTP para execução local e para os testes.
- **Node.js, npm e Playwright:** instalação das dependências de desenvolvimento e testes automatizados em Chromium.
- **esbuild e html-minifier-terser:** build de produção com minificação de JavaScript, CSS e HTML.
- **Git e GitHub:** versionamento, issues, pull requests e releases; GitHub Pages para publicação estática.

## Pré-requisitos

Para clonar o repositório, instale Git. Para executar pelo servidor local documentado, tenha Python 3 e um navegador atualizado. A aplicação não exige dependências npm para funcionar.

Para gerar a build, são necessários Node.js **20 ou superior** e npm. Para os testes, também é necessário o Chromium instalado pelo Playwright. A versão mínima do Node.js corresponde ao requisito das dependências registradas em `Experiencias-Praticas/package-lock.json`.

## Organização

```text
Experiencias-Praticas/
├── html/                 # entrada da SPA e redirecionamentos antigos
├── css/estilos.css       # estilos compartilhados
├── js/                  # navegação, temas, cadastro e projetos
├── imagens/             # ilustrações locais
├── validacao/           # evidências de validação
├── scripts/build.mjs    # build de produção e relatório de redução
├── dist/                # saída gerada; ignorada pelo Git
├── package.json
├── playwright.config.js
├── site.spec.js
├── playwright.producao.config.js
└── respostas.md
```

Sirva a pasta por HTTP com `python3 -m http.server 8000 --directory Experiencias-Praticas` a partir da raiz e abra `http://localhost:8000/html/index.html`. Os módulos ES exigem um servidor HTTP. Não é necessário instalar dependências para consultar os fontes.

As quatro vistas são Início, Projetos sociais, Participe e Cadastro. O nome da ONG e os conteúdos são exemplos fictícios.

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

O arquivo `js/cadastro.js` aplica máscaras de CPF, telefone e CEP, confere os dígitos verificadores do CPF e impede datas futuras de nascimento. A máscara não confirma a existência de um CPF, telefone ou CEP. O formulário é demonstrativo: não transmite dados ao servidor, mas salva um rascunho em localStorage; use exemplos fictícios. Sem JavaScript, somente a Home é apresentada, com um aviso; a vista de cadastro depende da renderização da SPA.

O HTML de cadastro foi enviado ao Nu HTML Checker do W3C em 23/09/2026, com zero mensagens após a correção do atributo autocomplete do telefone. Resultado em `validacao/cadastro-w3c.json`. Essa validação verifica a marcação; as máscaras e os dígitos verificadores também foram conferidos separadamente com Node.js.

As validações mostram mensagens junto aos campos ao perderem foco e ao concluir; campos já verificados são reavaliados durante a edição. Os testes no navegador cobriram campos vazios, nome e e-mail inválidos, máscaras e conclusão com dados de exemplo. A validação interativa nativa permanece habilitada: o navegador bloqueia a submissão inválida e apresenta suas mensagens. As mensagens acessíveis junto aos campos são complementares.

## Entrega final

A pasta `entrega` reúne os pacotes ZIP e uma cópia consolidada do HTML. Os quatro HTML da etapa anterior foram validados no W3C sem mensagens; esses relatórios históricos não validam o novo index da SPA. A imagem usa `picture` com SVG e WebP e fallback PNG, com texto alternativo na tag `img`. Os relatórios individuais estão em `validacao`.

## Estilo e testes automatizados

As quatro vistas compartilham `css/estilos.css`. O layout adapta menus e formulários a telas menores e mantém foco visível e mensagens de erro. A organização das páginas e as regras do formulário foram preservadas.

Para testar, instale Node.js e Python 3. Dentro de `Experiencias-Praticas`, execute:

```bash
npm ci
npx playwright install chromium
npm test
```

`site.spec.js` verifica navegação, carregamento de recursos, ausência de transbordamento horizontal, acesso por teclado, campos inválidos, máscaras, correção do cadastro e funcionamento sem JavaScript. A configuração em `playwright.config.js` executa os cenários com larguras de desktop e celular, iniciando um servidor local na porta 8765. As dependências e os resultados gerados são ignorados pelo Git.


## Temas claro, escuro e alto contraste

O seletor **Tema**, no cabeçalho persistente, oferece **Sistema**, **Claro**, **Escuro** e **Alto contraste**. É um `select` nativo com rótulo, disponível por teclado e também com o menu móvel fechado.

A opção Sistema acompanha `prefers-color-scheme` e `prefers-contrast`, dando prioridade ao contraste aumentado. A escolha manual prevalece e fica em `localStorage`, na chave `lacos-tema`; voltar a Sistema remove essa preferência. Se o armazenamento estiver bloqueado, a troca continua funcionando na página atual. Sem JavaScript, o seletor fica oculto e as media queries CSS acompanham o sistema.

`js/tema.js` define `data-tema` no elemento `html` antes do carregamento do CSS. As paletas usam variáveis compartilhadas em `css/estilos.css`, incluindo textos, fundos, controles, foco e mensagens de sucesso/erro. O alto contraste usa fundo preto, textos brancos, links amarelos sublinhados e foco ciano. O CSS preserva as cores forçadas do sistema (`forced-colors`).

Após esta implementação, **64 testes Playwright passaram**, nos perfis desktop e celular, incluindo persistência entre as quatro vistas, teclado, preferência do sistema, armazenamento bloqueado, ausência de JavaScript e cores forçadas. A [verificação de contraste](Experiencias-Praticas/validacao/contraste.json) passou em **48 medições**: 42 pares de texto/fundo acima de 4,5:1 e seis medições da borda e do foco do seletor acima de 3:1. Os menores contrastes de texto da amostra foram 6,02:1 (claro), 8,72:1 (escuro) e 12,44:1 (alto contraste). Esses resultados não constituem auditoria integral de acessibilidade nem teste manual com leitores de tela.

Para repetir a medição após instalar as dependências e o Chromium, execute na raiz:

```bash
node Experiencias-Praticas/validacao/verificar-contraste.cjs
```

## Estado atual do projeto

A aplicação é uma SPA com entrada em `html/index.html` e `<main id="app">`. `app.js` mantém um objeto de rotas e intercepta links internos; `history.pushState`, `replaceState` e `popstate` permitem navegar sem recarregar o documento e usar Voltar/Avançar. As rotas usam `?pagina=projetos`, `?pagina=participe` e `?pagina=cadastro`, compatíveis com recargas diretas no GitHub Pages. Os três HTML antigos apenas redirecionam links existentes.

`vistas.js` exporta `renderHome`, `renderProjetos`, `renderParticipe` e `renderCadastro`. A troca atualiza título, `aria-current` e foco; rotas desconhecidas apresentam um retorno ao início. O cabeçalho permanece e o formulário é inicializado a cada montagem, restaurando o rascunho quando disponível. Sem JavaScript, a página inicial permanece legível e um aviso explica a limitação das outras vistas.

A suíte contém 64 testes em desktop e celular. As evidências da correção estão em [validacao/spa.md](Experiencias-Praticas/validacao/spa.md).


### Templates e componentes dinâmicos

A vista Projetos definida em `Experiencias-Praticas/html/index.html` usa o elemento HTML `template` como molde para os cards de projetos. `js/projetos.js` percorre dados estruturados, clona o conteúdo com `cloneNode`, preenche os campos com `textContent` e insere um `DocumentFragment` no DOM. A abordagem evita repetir a marcação e não interpreta dados dinâmicos como HTML.


### Eventos e interações

`js/navegacao.js` trata cliques, Escape e mudanças de breakpoint para o menu e o dropdown. `js/cadastro.js` trata input, blur, change, invalid e submit para máscaras, validação nativa, foco e feedback. `app.js` trata a navegação interna e o evento `popstate` para restaurar a vista pelo histórico.


### Consistência e feedback do formulário

O cadastro combina `Validity API`, `required`, `pattern`, tipos HTML, RegExp e verificação dos dígitos do CPF. Mensagens, `aria-invalid`, `aria-describedby` e classes de sucesso/erro orientam o preenchimento sem enviar dados.


### Persistência local

O cadastro salva um rascunho demonstrativo em `localStorage` com `JSON.stringify` durante `input` e `change`. No carregamento, `JSON.parse` restaura os valores; dados corrompidos são removidos. Nenhum dado é enviado ao servidor.


### Dependências externas

A aplicação usa Vanilla JavaScript e não importa frameworks ou bibliotecas por CDN. `@playwright/test`, `esbuild` e `html-minifier-terser` são dependências de desenvolvimento para testes e build; não são carregadas pelo site.


### Modularização JavaScript

Os comportamentos são separados por responsabilidade: `navegacao.js` controla menu e dropdown, `cadastro.js` controla formulário, validação e persistência, e `projetos.js` renderiza os cards a partir do template. `app.js` usa `type="module"` e importa as funções locais com `import/export`; `vistas.js` inicializa os comportamentos após montar o conteúdo. O script compartilhado `tema.js` é carregado antes do CSS para aplicar a preferência de cores antes da primeira pintura; registra o controle após `DOMContentLoaded`.


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

A aplicação é uma SPA estática. A build de produção usa [esbuild](https://esbuild.github.io/api/#minify) para JavaScript/CSS e [html-minifier-terser](https://github.com/terser/html-minifier-terser) para HTML. Na raiz do repositório, execute:

```bash
cd Experiencias-Praticas
npm ci
npm run build
npm run preview
```

Abra <http://127.0.0.1:8002/html/index.html>. `Ctrl+C` encerra a prévia. O comando `build` recria somente `Experiencias-Praticas/dist/`; os fontes permanecem intactos. A saída contém `html/`, `css/`, `js/` e `imagens/`, com os mesmos caminhos relativos. As imagens são copiadas sem alteração. Testes, dependências, respostas e relatórios ficam fora da saída.

A configuração está em `scripts/build.mjs`: entradas CSS, app e tema, `bundle: true`, `minify: true`, formato IIFE para scripts clássicos e alvos Chrome 109, Firefox 115 e Safari 15.4. O HTML tem comentários removidos e espaços reduzidos de forma conservadora, preservando atributos, tags, templates e a ordem de carregamento. `tema.js` continua antes do CSS; `app.js` agrupa os módulos e mantém o carregamento após a análise do HTML.

A última medição reduziu **45.461 para 33.724 bytes (25,82%)** em onze fontes agrupados em sete saídas: HTML **12,54%**, CSS **20,86%** e JavaScript **42,46%**. A comparação usa bytes UTF-8, sem gzip/Brotli e sem imagens. O relatório [minificacao.json](Experiencias-Praticas/validacao/minificacao.json) é regenerado na build e contém valores por arquivo, totais e hashes SHA-256.

Para validar a saída de produção, com o Chromium instalado:

```bash
npm run test:build
node validacao/verificar-contraste.cjs --build
```

`test:build` gera a build e executa a mesma suíte, servindo exclusivamente `dist/` na porta 8765. Foram aprovados **64 testes** nos perfis desktop/celular e **48 medições de contraste** na saída minificada. As evidências estão em [validacao/minificacao.md](Experiencias-Praticas/validacao/minificacao.md) e [contraste-producao.json](Experiencias-Praticas/validacao/contraste-producao.json).

A publicação de produção usa **GitHub Pages com GitHub Actions**, configurado em [.github/workflows/pages.yml](.github/workflows/pages.yml). O workflow valida pushes e pull requests destinados a `main` ou `develop`; somente um push em `main` ou uma execução manual nessa branch pode publicar. O job de deploy depende do sucesso da build e usa o ambiente `github-pages`, com permissões `pages: write` e `id-token: write`.

O runner Ubuntu configura Node.js 22 e Python 3, instala dependências com `npm ci` e Chromium com `npx playwright install --with-deps chromium`. Em seguida, executa os testes dos fontes, a build minificada, os testes da produção e as verificações de contraste e imagens. Também confere se o código consolidado está atualizado e guarda os relatórios como artefatos da execução.

`npm run pages:prepare` copia a build validada para `.pages/Experiencias-Praticas/` e cria uma entrada na raiz que encaminha ao site. Assim, o endereço continua sendo <https://rita-moura.github.io/desenvolvimento-front-end-para-web/Experiencias-Praticas/html/index.html>. As ações oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages` publicam o artefato. Em Settings → Pages, a origem é **GitHub Actions**.

`dist/` e `.pages/` são ignoradas pelo Git. Uma build local não publica sozinha: o deploy ocorre no workflow de `main` após as verificações. O [histórico de execuções](https://github.com/rita-moura/desenvolvimento-front-end-para-web/actions/workflows/pages.yml) identifica a versão e o resultado de cada execução.

### Código final para a atividade

O arquivo [entrega/codigo-fonte-completo.txt](Experiencias-Praticas/entrega/codigo-fonte-completo.txt) consolida o código da aplicação, SVG, configuração de build e workflow em um texto abaixo do limite de 100.000 caracteres. Os separadores identificam arquivos independentes; esse texto não deve ser executado como um único HTML. Testes, verificadores, PNG, WebP e o lockfile completo estão no repositório. Para atualizar a entrega após mudanças no código, execute `npm run export:source` dentro de `Experiencias-Praticas` e versione também o arquivo gerado.

## Imagens e adaptação às telas

A ilustração usa `picture` com SVG (703 bytes), WebP (9.438 bytes) e PNG (24.588 bytes). O SVG é a primeira fonte e representa uma economia de 97,14% frente ao PNG; o WebP economiza 61,62%. A build copia esses arquivos sem recompressão.

O vetor tem `viewBox="0 0 800 400"`; os formatos raster têm 800 × 400 pixels. O CSS adapta a largura, limita a altura a 350px e usa `object-fit: contain`. Não há variantes raster por resolução com `sizes` ou descritores de largura. Em cinco cenários de viewport/densidade, o Chromium selecionou somente o SVG, sem transbordamento horizontal.

O [relatório das imagens](Experiencias-Praticas/validacao/imagens.json) registra seleção, dimensões e tamanhos dos recursos da página inicial. A economia de 23.885 bytes frente a uma versão hipotética com PNG corresponderia a cerca de 191ms de transferência a 1 Mbit/s, ignorando cache, latência, compressão HTTP e processamento. Essa estimativa não é uma medição do tempo global ou do LCP.

Para reproduzir, após `npm run build`, dentro de `Experiencias-Praticas`:

```bash
node validacao/verificar-imagens.cjs
```

## Executar os testes

Os testes Playwright ficam na pasta `Experiencias-Praticas` e cobrem navegação, menu móvel, dropdown, responsividade, template de projetos, formulário, validação nativa, persistência e feedback visual. Em outro terminal, a partir da raiz do repositório, instale as dependências registradas no lockfile, instale o navegador de teste e execute a suíte:

```bash
cd Experiencias-Praticas
npm ci
npx playwright install chromium
npm test
```

Para abrir a interface interativa do Playwright, use `npm run test:ui`. Os testes iniciam automaticamente um servidor local na porta 8765. O site publicado não precisa de Node.js; Node.js é usado para build e testes, e Playwright para os testes.


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

Os **32 testes Playwright** passaram em Chromium, com perfis desktop e celular. As evidências estão em [validacao/epiv.md](Experiencias-Praticas/validacao/epiv.md). Isso não substitui uma auditoria completa WCAG 2.1 AA. Essa entrega usava os fontes diretamente no GitHub Pages. A etapa posterior de otimização acrescentou a build de produção descrita acima, e a correção da Experiência III migrou a navegação para SPA.
