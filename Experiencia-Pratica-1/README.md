# Experiência prática 1 — HTML5 semântico

Site de uma ONG fictícia para praticar estrutura semântica, navegação e hierarquia de títulos.

## Organização

```text
Experiencia-Pratica-1/
├── html/
│   ├── index.html
│   ├── projetos.html
│   ├── participe.html
│   └── cadastro.html
├── imagens/
│   ├── .gitkeep
│   └── leitura-comunitaria.svg
└── README.md
```

Abra `html/index.html` no navegador e use o menu para visitar as três páginas. Não é necessário instalar dependências.

A imagem do enunciado identifica a página inicial e a página de projetos sociais, mas não define a terceira. `participe.html` é uma escolha provisória, a ajustar quando os demais requisitos estiverem disponíveis. O nome da ONG e os conteúdos são exemplos fictícios.

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

A estrutura HTML recebe os estilos compartilhados de estilos.css. A pasta `imagens` contém uma ilustração SVG de um livro aberto, criada para este exercício. A página inicial apresenta contato fictício em `address` e um link de e-mail com `mailto:`. O domínio `.example` indica um endereço de demonstração. Ao adicionar uma imagem, use um texto `alt` que comunique sua finalidade, ou `alt=""` se ela for apenas decorativa.

## Etapa de cadastro

A página `html/cadastro.html` usa `fieldset` e `legend` para agrupar dados pessoais, endereço e participação. Cada campo tem um rótulo; campos obrigatórios usam `required`. Os tipos `email`, `date` e `tel`, os limites de comprimento e os padrões `pattern` ajudam a prevenir erros.

O arquivo `js/cadastro.js` aplica máscaras de CPF, telefone e CEP, confere os dígitos verificadores do CPF e impede datas futuras de nascimento. A máscara não confirma a existência de um CPF, telefone ou CEP. O formulário é demonstrativo: não transmite nem armazena dados e deve ser preenchido com exemplos fictícios. Sem JavaScript, os campos ficam desabilitados para impedir envio acidental.

O HTML de cadastro foi enviado ao Nu HTML Checker do W3C em 23/09/2026, com zero mensagens após a correção do atributo autocomplete do telefone. Resultado em `validacao/cadastro-w3c.json`. Essa validação verifica a marcação; as máscaras e os dígitos verificadores também foram conferidos separadamente com Node.js.

As validações mostram mensagens junto aos campos ao perderem foco e ao concluir; campos já verificados são reavaliados durante a edição. Os testes no navegador cobriram campos vazios, nome e e-mail inválidos, máscaras e conclusão com dados de exemplo. A validação consulta os atributos nativos pela API de validade e usa mensagens acessíveis próprias.

## Entrega final

A pasta `entrega` reúne os pacotes ZIP e uma cópia consolidada do HTML. As quatro páginas foram validadas no W3C sem mensagens. A imagem usa `picture` com SVG e WebP e fallback PNG, com texto alternativo na tag `img`. Os relatórios individuais estão em `validacao`.

## Estilo e testes automatizados

As quatro páginas compartilham `estilos.css`, na raiz desta pasta. O layout adapta menus e formulários a telas menores e mantém foco visível e mensagens de erro. A organização das páginas e as regras do formulário foram preservadas.

Para testar, instale Node.js e Python 3. Dentro de `Experiencia-Pratica-1`, execute:

```bash
npm ci
npx playwright install chromium
npm test
```

`site.spec.js` verifica navegação, carregamento de recursos, ausência de transbordamento horizontal, acesso por teclado, campos inválidos, máscaras, correção do cadastro e funcionamento sem JavaScript. A configuração em `playwright.config.js` executa os cenários com larguras de desktop e celular, iniciando um servidor local na porta 8765. As dependências e os resultados gerados são ignorados pelo Git.
