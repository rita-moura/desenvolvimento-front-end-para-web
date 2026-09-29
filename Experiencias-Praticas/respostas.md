# Respostas — Experiência prática I

## 1. Principais tags semânticas utilizadas

Cada linha corresponde a uma entrada no formulário. Informe o nome da tag sem os sinais `<` e `>`.


| Nome da tag | Propósito ou conteúdo abrigado                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `header`    | Apresenta o nome da ONG e reúne o menu de navegação no topo das páginas.                          |
| `nav`       | Organiza os links de navegação entre as páginas Início, Projetos sociais e Participe.             |
| `main`      | Abriga o conteúdo principal de cada página, como a apresentação da ONG e os projetos sociais.     |
| `section`   | Agrupa conteúdos do mesmo assunto, como Quem somos, Nossas iniciativas e Voluntariado.            |
| `article`   | Apresenta cada projeto social de forma independente, com descrição, objetivo e atividades.        |
| `aside`     | Apresenta uma observação complementar sobre o caráter acadêmico e fictício do site.               |
| `footer`    | Exibe informações de encerramento, identificando a ONG e o caráter fictício do projeto acadêmico. |
| `address`   | Reúne o e-mail e o endereço de contato da ONG, identificados como fictícios.                      |
| `img`       | Apresenta uma ilustração de um livro aberto com texto alternativo no atributo alt.                |
| `h1`        | Identifica o tema principal de cada página.                                                       |
| `h2`        | Identifica as seções principais e os títulos dos projetos sociais.                                |
| `h3`        | Identifica subdivisões, como missão, valores, objetivos e atividades.                             |


## 2. Justificativa da hierarquia de títulos e sua contribuição para a acessibilidade

```text
Utilizei um título h1 por página para identificar seu tema principal. Os títulos h2 organizam os assuntos principais, como “Quem somos” e os projetos sociais. Os títulos h3 identificam subdivisões, como “Nossa missão”, “Objetivo” e “Atividades”. Não foi necessário utilizar h4, h5 e h6, pois o conteúdo não apresenta subdivisões mais profundas. Os níveis foram escolhidos conforme a organização dos assuntos, sem saltos na hierarquia. Essa estrutura facilita a leitura e a compreensão do conteúdo. Também favorece a acessibilidade, permitindo que usuários de leitores de tela naveguem pelos títulos e compreendam a relação entre as seções da página.
```

## 3. A tag h1 é semântica?

Sim. A tag `<h1>` tem significado semântico: identifica um título de nível 1.
Neste projeto, ela representa o tema principal de cada página.
As tags `<h2>` a `<h6>` também possuem significado semântico e representam
os demais níveis de títulos. Elas podem ser incluídas na lista de tags
utilizadas, mas só devemos listar os níveis presentes no desenvolvimento:
`<h1>`, `<h2>` e `<h3>`.

## 4. Trecho principal do index.html: apresentação institucional e contato

Copie apenas o conteúdo do bloco para o campo de código HTML. Os dados de contato são fictícios e estão identificados dessa forma na página.

```html
  <main id="conteudo">
    <h1>Juntos por uma comunidade mais acolhedora</h1>
    <p>A Laços da Comunidade é uma ONG fictícia dedicada à educação, à convivência e ao apoio a famílias.</p>

    <picture>
      <source srcset="../imagens/leitura-comunitaria.svg" type="image/svg+xml">
      <source srcset="../imagens/leitura-comunitaria.webp" type="image/webp">
    <img src="../imagens/leitura-comunitaria.png"
         alt="Livro aberto, símbolo das iniciativas de educação e leitura da ONG."
         width="800" height="400" style="max-width: 100%; height: auto;">
    </picture>

    <!-- Cada section reúne um assunto e recebe um título descritivo. -->
    <section aria-labelledby="sobre">
      <h2 id="sobre">Quem somos</h2>
      <p>Reunimos pessoas que desejam compartilhar conhecimentos e construir oportunidades na comunidade.</p>
      <h3>Nossa missão</h3>
      <p>Promover o acesso à educação e fortalecer os vínculos entre os moradores.</p>
      <h3>Nossos valores</h3>
      <ul>
        <li>Respeito à diversidade.</li>
        <li>Solidariedade nas ações cotidianas.</li>
        <li>Transparência e responsabilidade.</li>
      </ul>
    </section>

    <section aria-labelledby="iniciativas">
      <h2 id="iniciativas">Nossas iniciativas</h2>
      <p>Os projetos oferecem apoio aos estudos e oportunidades de leitura para crianças, jovens e adultos.</p>
      <a href="projetos.html">Conheça os projetos sociais</a>
    </section>
    <section aria-labelledby="contato">
      <h2 id="contato">Entre em contato</h2>
      <p>Dados fictícios para fins acadêmicos; não são canais reais de atendimento.</p>
      <!-- address identifica as informações de contato da organização. -->
      <address>
        <p>Laços da Comunidade</p>
        <p>E-mail: <a href="mailto:contato@lacos.example">contato@lacos.example</a></p>
        <p>Endereço: Rua Exemplo, 100 — Bairro Comunidade, Cidade Exemplo.</p>
      </address>
    </section>
  </main>
```

## 5. Integração da imagem e acessibilidade pelo atributo alt

```text
Integrei a ilustração local de um livro aberto usando picture, com versões SVG e WebP em elementos source e PNG como alternativa na tag img. O navegador escolhe um formato compatível. O atributo alt da img contém “Livro aberto, símbolo das iniciativas de educação e leitura da ONG.”, comunicando o significado da imagem aos usuários de leitores de tela. O texto alternativo vale para qualquer formato escolhido. Os atributos width e height definem as dimensões, enquanto max-width: 100% e height: auto ajustam a imagem ao espaço disponível sem distorção. As versões PNG e WebP foram otimizadas sem perda de qualidade.
```

## 6. Blocos informativos do arquivo projetos.html e suas estruturas HTML

Adicione uma entrada por linha no formulário.


| Bloco de informação        | Estrutura HTML utilizada                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Apresentação da página     | main abriga o conteúdo principal, com h1 para o título e p para a introdução.                                                      |
| Navegação pelos assuntos   | nav com ul, li e links a para acessar os projetos, o voluntariado e as doações.                                                    |
| Projeto Aprender juntos    | article com h2 para o nome, h3 para objetivo e atividades, p para descrições e ul para a lista de atividades.                      |
| Projeto Leitura para todos | article com h2 para o nome, h3 para objetivo e atividades, p para descrições e ul para a lista de atividades.                      |
| Trabalho voluntário        | section com h2, subtítulos h3, lista ul de atuações, lista ol de passos e link a para a página de participação.                    |
| Campanhas de doação        | section com h2, subtítulos h3 para materiais, contribuição financeira e transparência, parágrafos p, lista ol e link a de contato. |


## 7. Como a organização orienta quem deseja contribuir ou atuar como voluntário

```text
Organizei a página para apresentar primeiro os projetos, seus objetivos e suas atividades. Em seguida, separei as orientações de trabalho voluntário e as campanhas de doação em seções com títulos claros. O menu interno permite acessar diretamente cada assunto. As listas de atividades ajudam o visitante a identificar como pode colaborar, enquanto as listas numeradas apresentam os passos para participar ou buscar orientações sobre contribuições financeiras. A seção de doações explica a destinação dos recursos e o modelo proposto de prestação de contas. Os links conduzem à página de participação e à seção de contato. A hierarquia de títulos h1, h2 e h3 facilita a leitura e a navegação por leitores de tela. Como se trata de um projeto acadêmico, a página informa que os contatos são fictícios e que não há doações ou inscrições reais.
```

## 8. Etapa de cadastro — implementação realizada

```text
Criei cadastro.html com agrupamentos fieldset e legend para dados pessoais, endereço e interesse em participar. Associei os rótulos aos campos e utilizei os tipos text, email, date e tel, além de select e checkbox. Apliquei required, minlength, maxlength e pattern conforme a finalidade dos campos. O JavaScript formata CPF, telefone e CEP, verifica os dígitos verificadores do CPF e limita a data de nascimento ao dia atual. A validação nativa permanece habilitada: ao tentar concluir, o navegador apresenta automaticamente os erros de required, type, pattern e limites. Mensagens complementares são associadas aos campos por aria-describedby, com aria-invalid. O primeiro campo inválido recebe foco ao concluir. O formulário também verifica nome e sobrenome, formato de e-mail e número do endereço, informa o resultado em uma região de status e não envia nem armazena dados. O HTML foi verificado no Nu HTML Checker do W3C, sem erros ou avisos no resultado final.
```

## 9. Agrupamento lógico dos campos em cadastro.html

```text
Organizei o formulário dentro de um fieldset principal com a legend “Cadastro demonstrativo”. Esse agrupamento permanece desabilitado até o carregamento do JavaScript, evitando envio acidental sem as funções da demonstração. Dentro dele, criei três fieldsets, cada um identificado por uma legend. “Dados pessoais” reúne nome completo, e-mail, data de nascimento, CPF e telefone. “Endereço” reúne CEP, logradouro, número, complemento, bairro, cidade e estado. “Interesse em participar” contém a seleção da forma de participação e a confirmação de uso de dados fictícios. Essa divisão aproxima campos relacionados e torna o preenchimento mais fácil de compreender. As legends identificam semanticamente os grupos, oferecendo contexto também aos usuários de leitores de tela. Cada campo possui um label associado: nos campos individuais, por for e id; na confirmação, o checkbox está dentro do label. As instruções de formato e as mensagens de erro são associadas aos campos por aria-describedby. O complemento é opcional, e os demais campos são obrigatórios.
```

## 10. Campos do formulário: atributo type e justificativa

Adicione uma entrada por linha. A primeira coluna corresponde a “Nome do campo” e a segunda a “Atributo type e justificativa”. Os textos respeitam os limites de 50 e 150 caracteres.


| Nome do campo                         | Atributo type e justificativa                                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Nome completo                         | type="text": recebe nome e sobrenome, com espaços e letras; o JavaScript verifica o preenchimento.                              |
| E-mail                                | type="email": permite verificar o formato de e-mail e oferece teclado adequado em dispositivos móveis.                          |
| Data de nascimento                    | type="date": permite escolher uma data; o atributo max impede datas futuras.                                                    |
| CPF                                   | type="text": preserva zeros iniciais e aceita a máscara. inputmode="numeric" sugere teclado numérico; o JS verifica os dígitos. |
| Telefone com DDD                      | type="tel": representa um telefone, aceita pontuação e favorece o teclado telefônico. pattern e JavaScript validam o formato.   |
| CEP                                   | type="text": preserva zeros iniciais e o hífen da máscara. inputmode="numeric" facilita a digitação dos oito dígitos.           |
| Logradouro                            | type="text": aceita nomes de ruas e avenidas, incluindo letras, números e espaços.                                              |
| Número (ou s/n)                       | type="text": aceita número, sufixo de letra ou s/n, formatos que type="number" não comporta.                                    |
| Complemento                           | type="text": permite informações livres, como apartamento ou bloco. O preenchimento é opcional.                                 |
| Bairro                                | type="text": aceita o nome do bairro, com letras e espaços.                                                                     |
| Cidade                                | type="text": aceita o nome da cidade, incluindo espaços e acentos.                                                              |
| Estado (UF)                           | Utilizei select, sem atributo type, com as 27 UFs como opções para padronizar a escolha e evitar erros de digitação.            |
| Forma de participação                 | Utilizei select, sem atributo type, para escolher trabalho voluntário, campanhas de doação ou ambas as opções.                  |
| Confirmação de uso de dados fictícios | type="checkbox": registra uma confirmação explícita; required exige sua marcação antes de concluir a demonstração.              |


## 11. Dados validados e atributos nativos utilizados

Adicione uma entrada por linha. As três primeiras correspondem aos campos destacados no enunciado.


| Dado validado                         | Atributos HTML e padrão adotado                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| CPF                                   | pattern="\[0-9\]{3}.\[0-9\]{3}.\[0-9\]{3}-\[0-9\]{2}" e required: exigem o formato 000.000.000-00 e o preenchimento.           |
| Telefone                              | pattern="(\[0-9\]{2}) \[0-9\]{4,5}-\[0-9\]{4}" e required: exigem DDD e telefone no formato (00) 0000-0000 ou (00) 00000-0000. |
| CEP                                   | pattern="\[0-9\]{5}-\[0-9\]{3}" e required: exigem oito dígitos no formato 00000-000 e o preenchimento.                        |
| Nome completo                         | required, minlength="3" e maxlength="100": exigem preenchimento e limitam o tamanho do nome.                                   |
| E-mail                                | type="email", required e maxlength="150": verificam o formato de e-mail, exigem preenchimento e limitam o tamanho.             |
| Data de nascimento                    | type="date", required e max atualizado pelo JavaScript para a data atual: exigem uma data e impedem datas futuras.             |
| Logradouro, número, bairro e cidade   | required: exige o preenchimento de cada campo. O complemento é opcional.                                                       |
| Estado e forma de participação        | required nos elementos select: exige escolher uma opção com valor, em vez de manter “Selecione”.                               |
| Confirmação de uso de dados fictícios | type="checkbox" e required: exigem marcar a confirmação antes de concluir.                                                     |


Os padrões estão transcritos do HTML. inputmode sugere o teclado, mas não valida o conteúdo. A formatação durante a digitação e a verificação dos dígitos do CPF são feitas pelo JavaScript.

## 12. Contribuição das validações para a integridade dos dados

```text
O atributo pattern verifica se o valor completo corresponde ao formato esperado para CPF, telefone e CEP. Ele não insere pontuação: essa máscara é aplicada pelo JavaScript. O atributo required exige o preenchimento dos campos obrigatórios e a marcação da confirmação. Os atributos minlength e maxlength limitam o tamanho dos textos, type="email" verifica o formato do e-mail e type="date", combinado com max, restringe a data de nascimento. No projeto, o JavaScript consulta a validade nativa dos campos e acrescenta regras, como a conferência dos dígitos verificadores do CPF. O formulário mantém a validação interativa nativa habilitada, sem novalidate e sem formnovalidate. Ao tentar concluir com campos vazios ou formatos inválidos, o próprio navegador bloqueia a submissão, focaliza o primeiro campo inválido e apresenta sua mensagem automaticamente. As mensagens junto aos campos são complementares e não substituem essa experiência nativa. Isso reduz omissões e inconsistências, mas não comprova a existência dos dados informados. Em uma aplicação real, o servidor também deve validar os dados, pois as verificações no navegador podem ser contornadas. Neste exercício, nenhum dado é enviado ou armazenado.
```

## 13. Imagens para anexar individualmente

O formulário “Adicionar imagem” pede um título e um arquivo de imagem por envio. Não selecione os arquivos ZIP nesse campo.


| Título              | Arquivo a selecionar na pasta imagens |
| ------------------- | ------------------------------------- |
| Livro aberto — PNG  | leitura-comunitaria.png               |
| Livro aberto — WebP | leitura-comunitaria.webp              |
| Livro aberto — SVG  | leitura-comunitaria.svg               |


Clique em “Selecionar arquivo”, escolha o arquivo e clique no ícone de salvar. Repita para cada formato aceito pela plataforma. Comece pelo PNG; se o seletor recusar WebP ou SVG, não altere apenas a extensão dos arquivos. As três versões representam a mesma ilustração e são utilizadas pelo elemento picture na página inicial. Todos os arquivos estão abaixo do limite de 50 MB.

Os pacotes da pasta entrega permanecem disponíveis para entrega do projeto por outro canal. Este campo de imagens não serve para anexar o código-fonte.

## 14. Estrutura de diretórios

Adicione uma pasta por vez. Copie a primeira coluna para “Nome da pasta ou diretório raiz” e a segunda para “Arquivos contidos”. Todas as entradas respeitam os limites de 60 e 500 caracteres.


| Nome da pasta ou diretório raiz | Arquivos contidos                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Experiencia-Pratica-1           | README.md e respostas.md. Contém as subpastas html, imagens, js, validacao e entrega.                                      |
| html                            | index.html, projetos.html, participe.html e cadastro.html.                                                                 |
| imagens                         | leitura-comunitaria.svg, leitura-comunitaria.webp, leitura-comunitaria.png e .gitkeep (arquivo auxiliar do versionamento). |
| js                              | cadastro.js.                                                                                                               |
| validacao                       | index-w3c.json, projetos-w3c.json, participe-w3c.json e cadastro-w3c.json.                                                 |
| entrega                         | imagens-otimizadas.zip, projeto-completo.zip e codigo-fonte-completo.txt.                                                  |


## 15. Código-fonte completo — link do GitHub

Atenção: na conferência, o projeto estava no commit local e022fb9, ainda não publicado na branch main do GitHub. Publique esse commit antes de entregar o link abaixo. Depois, confira se a pasta abre para o avaliador; se o repositório for privado, ele precisará de acesso.

Copie o texto abaixo para o campo de código-fonte somente após publicar e conferir o acesso:

```text
O código-fonte completo está disponível no GitHub: https://github.com/rita-moura/desenvolvimento-front-end-para-web/tree/main/Experiencia-Pratica-1

A pasta html contém index.html, projetos.html, participe.html e cadastro.html. A pasta js contém as máscaras e validações do formulário; imagens reúne os recursos visuais; validacao contém os relatórios do W3C. Para executar o projeto, baixe o repositório e abra Experiencia-Pratica-1/html/index.html no navegador. Não é necessário instalar dependências.
```

## 16. Resultado da validação W3C e correções efetuadas

```text
Submeti os arquivos index.html, projetos.html, participe.html e cadastro.html ao Nu HTML Checker do W3C. Na primeira validação do cadastro, a ferramenta apontou um erro no valor tel-national do atributo autocomplete do campo de telefone. Substituí esse valor por tel e submeti novamente o arquivo. Após a correção e a inclusão das versões de imagem no elemento picture, repeti a validação das quatro páginas. Os resultados finais não apresentaram erros nem avisos, retornando a lista messages vazia. Os relatórios foram salvos na pasta validacao, em arquivos JSON individuais para cada página. Além da conferência da marcação HTML, os testes automatizados no navegador verificaram campos obrigatórios vazios, formatos inválidos, máscaras e conclusão com dados de exemplo. Após remover a desativação da validação interativa, os 18 testes passaram em desktop e celular, incluindo as mensagens nativas e o bloqueio da submissão pelas restrições HTML. A validação do W3C verifica a conformidade do HTML; ela não substitui os testes de funcionamento do JavaScript nem uma avaliação completa de acessibilidade.
```

## 17. Reflexão sobre a aprendizagem

Sugestão baseada nas atividades realizadas. Revise para que o texto represente sua percepção pessoal sobre a aprendizagem.

```text
Nesta experiência prática, avancei na compreensão de que desenvolver uma página web envolve mais do que apresentar textos e imagens. A escolha das tags semânticas, a hierarquia dos títulos e a organização dos arquivos ajudam a tornar o conteúdo compreensível, acessível e mais fácil de manter. Entre meus pontos fortes, destaco a atenção aos requisitos e a disposição para revisar o resultado. Ao experimentar o formulário, percebi que as validações precisavam ficar mais claras para quem preenche os campos, o que levou à revisão das máscaras e à inclusão de mensagens de erro. Também compreendi melhor a diferença entre formatar um dado e verificar sua validade: a máscara organiza a digitação, mas não garante que a informação esteja correta ou exista. Como oportunidades de melhoria, reconheço a necessidade de praticar mais JavaScript e expressões regulares para compreender e implementar essas regras com maior autonomia. Preciso também ampliar os testes de acessibilidade e de navegação por teclado, além de planejar a entrega com antecedência, considerando os formatos aceitos pela plataforma e a publicação do código no GitHub. A validação pelo W3C mostrou a importância de conferir a marcação e corrigir os problemas encontrados, sem substituir os testes de funcionamento. Esses aprendizados contribuem para meu desenvolvimento profissional ao incentivar uma postura de organização, revisão e atenção à experiência do usuário. Ainda estou consolidando esses conhecimentos, mas a atividade me ajudou a relacionar a teoria do HTML5 com decisões práticas de desenvolvimento.
```



# Respostas — Experiência prática II

---

## Etapa 2 — Design system e estruturação responsiva

Esta seção reúne as respostas da nova etapa, dedicada à evolução visual do mesmo projeto da ONG. As respostas anteriores correspondem à etapa de HTML5.

### Objetivos apresentados no enunciado

- Criar um sistema de design com variáveis customizadas em CSS.
- Definir regras globais de cores, tipografia escalável e espaçamentos modulares.
- Implementar o layout principal com CSS Grid de 12 colunas e breakpoints definidos.
- Usar Flexbox para alinhamentos e componentes internos da interface.

As próximas respostas serão identificadas pelo prefixo **CSS**, seguido do número e do assunto da pergunta. Elas serão registradas conforme os requisitos forem implementados e verificados.

### CSS 1 — Variáveis do Design System: cores, tipografia e espaçamentos

```text
Organizei o Design System no seletor :root de estilos.css, compartilhado pelas quatro páginas. As propriedades customizadas são utilizadas com var(), centralizando as decisões visuais e facilitando a manutenção. CORES: --verde: #205c4a é a cor primária de links, botões e navegação ativa; --escuro: #193b32 atende aos textos e ao hover; --secundaria: #e8f0e9 compõe superfícies de apoio; --ilustracao: #e8f2ef identifica o fundo da imagem. Os neutros são --fundo: #f4f6f0, --superficie: #ffffff, --borda: #d4dfd6, --borda-campo: #718779 e --texto-suave: #486358. Completam a paleta --erro: #a31515 e --foco: #956100. São 11 cores distintas, com funções definidas. TIPOGRAFIA: --fonte-familia usa system-ui, sans-serif. Os cinco níveis são --fonte-1: 0.875rem para textos auxiliares e erros; --fonte-2: 1rem para o corpo e os campos; --fonte-3: 1.25rem para subtítulos, legendas e apresentação; --fonte-4: 1.75rem para h2; --fonte-5: clamp(2rem, 5vw, 3.5rem) para h1, ajustando o título à tela dentro desses limites. As entrelinhas são --linha-texto: 1.65 e --linha-titulo: 1.2. ESPAÇAMENTOS: adotei uma escala modular baseada em 0.25rem, equivalente a 4px quando a fonte raiz é 16px. As variáveis --espaco-1 a --espaco-8 correspondem a 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem e 4rem. Todos os valores são múltiplos da unidade base e são aplicados a margens, preenchimentos e gaps, mantendo consistência entre navegação, blocos e formulário. JUSTIFICATIVA: o verde e as superfícies claras estabelecem uma identidade acolhedora para a ONG. A fonte do sistema, os tamanhos relativos em rem e as entrelinhas favorecem a leitura. Os textos escuros contrastam com os fundos claros; o contorno dos campos é mais escuro que as bordas decorativas. O foco de teclado é visível, e os erros têm mensagens textuais além da cor. Essas escolhas apoiam públicos com diferentes necessidades de leitura e navegação, sem depender apenas de sinais visuais coloridos.
```

### CSS 2 — Estrutura do Grid de 12 colunas

```text
Implementei o layout principal no elemento main com display: grid e grid-template-columns: repeat(12, minmax(0, 1fr)). As 12 trilhas têm larguras iguais e podem encolher sem impor a largura mínima do conteúdo. A regra main > * usa grid-column: 1 / -1 e min-width: 0, de modo que os blocos ocupam inicialmente todas as colunas. O contêiner tem width: 100%, margens laterais automáticas e largura máxima limitada. O gap utiliza variáveis da escala de espaçamentos. A estratégia mobile-first começa com blocos empilhados e campos em uma coluna. Cinco media queries com min-width, em 480, 768, 1024, 1280 e 1536 pixels, acrescentam adaptações progressivas. A partir de 1024px, os artigos dos projetos usam grid-column: span 6 e ficam lado a lado. A partir de 1280px, o formulário e sua mensagem de resultado ocupam as linhas 2 / 12, equivalentes a dez colunas; em 1536px, passam para 3 / 11, equivalentes a oito colunas centrais. Os demais blocos continuam com a largura das 12 colunas. Dentro do formulário, um Grid independente organiza os campos em duas colunas a partir de 768px. O cabeçalho e as listas de navegação continuam usando Flexbox. Assim, o Grid controla a distribuição principal e o Flexbox os alinhamentos internos, preservando a ordem semântica do HTML e sem alterar as pastas do projeto.
```

### CSS 3 — Cinco breakpoints e estratégia responsiva

```text
Adotei cinco breakpoints mobile-first com @media (min-width: ...): 480px aumenta o espaçamento entre blocos e o preenchimento lateral; 768px organiza os campos em duas colunas, amplia o espaço vertical e libera a largura do botão; 1024px distribui cada artigo de projeto em seis colunas e coloca o cabeçalho em linha; 1280px amplia o contêiner para 1200px e centraliza o formulário em dez colunas (2 / 12); 1536px limita o contêiner a 1440px e centraliza o formulário em oito colunas (3 / 11), evitando campos excessivamente largos. Abaixo de 480px, os blocos ficam empilhados e o botão ocupa a largura disponível. O Grid principal mantém 12 colunas em todos os cenários; muda a quantidade ocupada pelos componentes. As regras são cumulativas e preservam a ordem de leitura.
```

### CSS 4 — Módulos estruturais com Flexbox

Adicione um módulo por vez. Copie a primeira coluna para “Nome do componente ou contentor” e a segunda para “Propriedades Flexbox aplicadas”. Os textos respeitam os limites de 150 e 500 caracteres.


| Nome do componente ou contentor                                                     | Propriedades Flexbox aplicadas                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cabeçalho principal (header)                                                        | display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--espaco-4). Abaixo de 1024px, flex-direction: column e align-items: flex-start empilham a identificação da ONG e o menu. A partir de 1024px, flex-direction: row e align-items: center colocam os elementos lado a lado, centralizados no eixo vertical. O espaço livre separa a marca da navegação. |
| Lista de links da navegação principal (nav ul)                                      | display: flex; flex-wrap: wrap; gap: var(--espaco-2). Os links seguem a direção horizontal padrão, mantendo a ordem Início, Projetos sociais, Participe e Cadastro. Quando falta espaço, os itens passam para outra linha. O gap padroniza a distância entre eles sem exigir larguras fixas.                                                                                   |
| Navegação interna da página de projetos (nav com aria-label="Nesta página" &gt; ul) | A lista utiliza a regra compartilhada nav ul: display: flex; flex-wrap: wrap; gap: var(--espaco-2). Os atalhos para projetos, voluntariado e doações ficam lado a lado enquanto houver espaço e quebram em novas linhas em telas menores, preservando a ordem do HTML e a navegação por teclado.                                                                               |


Os dois menus são componentes distintos que reutilizam a mesma regra CSS. O layout principal de 12 colunas e o agrupamento dos campos do formulário utilizam Grid, por isso não foram listados como exemplos de Flexbox.

---

## Etapa 3 — Componentes visuais e navegação

Esta seção reúne as próximas respostas sobre navegação interativa, cartões, formulários, botões e componentes de feedback.

### Componentes 1 — Menu dropdown e navegação móvel

```text
Implementei a navegação nas quatro páginas com #menu-principal, .menu-toggle, .submenu e .submenu-lista. A lista principal utiliza Flexbox. A abordagem é mobile-first: abaixo de 1024px, #menu-principal > ul usa flex-direction: column. Com JavaScript ativo, o botão “☰ Menu” fica visível e alterna o atributo hidden da navegação; aria-controls identifica o menu controlado e aria-expanded informa seu estado. A regra [hidden] aplica display: none, retirando os links fechados da navegação por teclado. A media query @media (min-width: 1024px) muda a lista para flex-direction: row. O JavaScript acompanha o mesmo breakpoint com matchMedia, oculta o botão e mantém a navegação aberta em telas maiores. Para o dropdown, utilizei details e summary nativos, preservando o link direto “Projetos sociais”. .submenu-lista fica com display: none enquanto o details está fechado; .submenu[open] > .submenu-lista aplica display: flex e flex-direction: column. No desktop, o item pai usa position: relative e a lista suspensa recebe position: absolute, top: 100%, left: 0 e z-index: 10. No celular, ela permanece no fluxo normal, evitando sobreposição. O usuário abre o submenu por clique, Enter ou Espaço; a interação não depende apenas de hover. As pseudo-classes :hover e :focus-visible fornecem destaque e foco de teclado. Escape fecha o submenu e devolve o foco ao summary; outro Escape fecha o menu móvel e devolve o foco ao botão. Clicar fora do cabeçalho ou escolher um link também fecha os componentes. As transições de background-color e color duram 0.18s; @media (prefers-reduced-motion: reduce) remove esses efeitos. Sem JavaScript, os links permanecem disponíveis e o dropdown continua funcionando por meio de details/summary. A ordem Início, Projetos sociais, Participe e Cadastro é preservada.
```

### Componentes 2 — Estados interativos, feedback e validação visual

```text
Apliquei estados visuais aos botões e campos sem depender apenas de cor. Os botões têm transições curtas de background-color, box-shadow e transform. Em :hover, o fundo passa da cor primária para --escuro e surge uma sombra; em :focus-visible, aparece um anel contrastante para navegação por teclado; em :active, há pequeno deslocamento vertical; em :disabled, a opacidade diminui, o cursor muda e a sombra é removida. Inputs e selects mudam a borda no hover e recebem sombra de foco. As pseudo-classes :valid e :invalid sinalizam campos preenchidos corretamente ou com erro, enquanto [aria-invalid="true"] reforça o erro após a validação do JavaScript. O elemento #resultado recebe feedback-erro quando a tentativa é bloqueada e feedback-sucesso quando todos os campos válidos são conferidos. O erro usa fundo rosado, borda vermelha, texto escuro e mensagem textual; o sucesso usa fundo verde-claro, borda verde e mensagem de confirmação. Assim, a informação não depende somente de vermelho ou verde. O formulário mantém required, type, pattern e os limites nativos, e o navegador continua apresentando suas mensagens. As transições duram 0.18s; a regra prefers-reduced-motion: reduce remove-as para pessoas que solicitam menos movimento. Os testes cobrem submissão vazia, classe visual de erro, correção dos dados e classe de sucesso.
```

### Componentes 3 — Capturas para anexar

O formulário de upload aceita imagens individuais. Use estes títulos:


| Título                          | Arquivo                               |
| ------------------------------- | ------------------------------------- |
| Menu dropdown no desktop        | `entrega/captura-menu-dropdown.png`   |
| Menu hambúrguer no mobile       | `entrega/captura-menu-mobile.png`     |
| Formulário com feedback de erro | `entrega/captura-formulario-erro.png` |


As capturas mostram o dropdown aberto em tela ampla, o menu hambúrguer aberto em uma largura móvel e a indicação visual de erro ao tentar validar o formulário vazio. Todas estão abaixo de 50 MB.

### Reflexão da Etapa 3 — Componentes visuais e navegação

```text
Nesta etapa, aprimorei a interface da ONG para que ela respondesse melhor às ações do usuário. O menu passou a oferecer uma navegação completa em telas amplas e uma versão hambúrguer em telas menores, sem perder a ordem semântica dos links. Também criei um submenu de projetos usando details e summary, o que permitiu aproveitar um comportamento nativo do HTML e manter a funcionalidade mesmo sem JavaScript. O uso de aria-expanded, aria-controls, hidden, foco visível e Escape ajudou a tornar a navegação mais previsível para teclado e tecnologias assistivas. Um ponto forte foi perceber que a interface precisa informar o que aconteceu depois de cada ação. Por isso, diferenciei os estados de hover, focus, active e disabled dos botões e acrescentei feedback visual de erro e sucesso no formulário. Os campos também passaram a comunicar validade por borda, mensagem textual e aria-invalid, evitando depender apenas das cores. O uso de prefers-reduced-motion mostrou que transições devem respeitar preferências de movimento reduzido. Os testes automatizados em desktop e celular ajudaram a verificar os breakpoints, a abertura do dropdown, o foco devolvido ao componente e o comportamento dos estados do formulário. Como oportunidade de melhoria, ainda posso ampliar os testes com leitores de tela reais e revisar os contrastes em diferentes monitores. Também pretendo estudar padrões mais completos para menus e diálogos, pois cada componente pode exigir decisões específicas de acessibilidade. A geração de capturas tornou visível o resultado e facilitou a conferência da entrega. Profissionalmente, esta etapa reforçou que CSS e JavaScript não servem apenas para deixar uma página bonita: eles devem comunicar estado, orientar decisões e reduzir incertezas. Aprendi a relacionar uma regra visual com uma interação concreta e a validar essa relação em diferentes larguras. Esse processo de testar, observar e corrigir é uma prática que pretendo levar para projetos futuros.
```

---

# Experiência Prática III

### Organização da estrutura de diretórios

### Organização 1 — Estrutura de diretórios do projeto

```text
Organizei o projeto por responsabilidade: html contém index.html, projetos.html, participe.html e cadastro.html, que definem a estrutura semântica e o conteúdo das páginas; css contém estilos.css, com tokens do Design System, Grid, Flexbox, breakpoints, navegação e estados visuais; imagens contém leitura-comunitaria.svg, leitura-comunitaria.webp e leitura-comunitaria.png, usados pelo elemento picture e pela tag img com alt; js contém cadastro.js, responsável por máscaras, validação e feedback do formulário, e navegacao.js, responsável pelo menu móvel, dropdown, Escape e fechamento por clique externo. A pasta entrega reúne capturas, pacotes ZIP e o código consolidado; validacao guarda os relatórios JSON do W3C. Cada HTML referencia ../css/estilos.css e os scripts por caminhos relativos. Essa divisão separa marcação, apresentação, recursos e comportamento, facilita a localização dos arquivos e permite evoluir uma camada sem misturá-la às demais.
```

Esta seção reúne as respostas sobre separação de responsabilidades entre HTML, CSS, imagens e JavaScript.

Esta seção reúne as respostas da etapa de JavaScript, com foco em SPA, DOM, templates, eventos, validação, localStorage e modularização.

### JavaScript 1 — Situação atual da arquitetura SPA

```text
A análise do código atual mostra que a aplicação ainda usa uma arquitetura multipágina. Os links do menu apontam para index.html, projetos.html, participe.html e cadastro.html, e cada documento possui seu próprio main, título e conteúdo. Os scripts atuais navegação.js e cadastro.js tratam o menu responsivo, o dropdown, máscaras e validações, mas não registram rotas com history.pushState nem usam hash para trocar conteúdo dentro de um contêiner único. Portanto, ainda não há uma implementação de SPA concluída para descrever. Em uma próxima evolução, eu criaria um contêiner principal de conteúdo, um mapa de rotas para os caminhos e funções de renderização, interceptaria os links internos com preventDefault, atualizaria a URL por history.pushState e trataria popstate para os botões Voltar e Avançar. Cada mudança limparia o contêiner e injetaria o fragmento correspondente, atualizando também o título e o estado aria-current do menu. O código atual deve ser descrito como a base multipágina que será migrada; afirmar que a API History já é utilizada seria incorreto.
```

### JavaScript 2 — Templates e geração de componentes

```text
O componente repetitivo dos projetos foi implementado com um elemento HTML template id="projeto-template", que funciona como molde sem aparecer diretamente na tela. O arquivo projetos.js mantém um array de objetos com id, título, descrição, objetivo e atividades. Ao carregar a página, o script seleciona o template e cria um DocumentFragment. Para cada objeto, usa map/forEach, clona template.content com cloneNode(true), preenche os elementos marcados por data-campo e cria cada item de atividade com document.createElement("li") e textContent. O artigo recebe id e aria-labelledby gerados a partir do identificador do projeto. Depois de completar o clone, o fragmento é inserido uma única vez em #lista-projetos com append, reduzindo alterações repetidas no DOM. A criação usa textContent para tratar os dados como texto e evitar interpretar valores de origem como HTML. Não usei innerHTML para os dados dinâmicos. O template separa a estrutura visual dos dados, permite acrescentar novos projetos apenas incluindo objetos no array e mantém a marcação semântica com article, h2, h3, p e ul. O CSS aplica o layout responsivo: os cards ocupam todas as colunas em telas pequenas e seis das doze colunas a partir de 1024px. Assim, o script transforma dados estruturados em elementos visíveis, enquanto o HTML fornece o molde e o CSS controla a apresentação.
```

### JavaScript 3 — Eventos monitorados e lógica acionada

```text
A aplicação monitora eventos em dois módulos. Em navegacao.js, o click no botão .menu-toggle alterna aria-expanded e hidden para abrir ou fechar o menu móvel; o click em links fecha o menu depois da navegação; o click no document fecha os componentes quando ocorre fora do header; o keydown observa Escape para fechar o submenu details e devolver o foco ao summary ou fechar o menu móvel e devolver o foco ao botão; change do MediaQueryList acompanha a passagem entre mobile e desktop e chama adaptarMenu. O elemento details/summary também responde nativamente a click, Enter e Espaço para abrir o dropdown. Em cadastro.js, input nos campos aplica as máscaras de CPF, telefone e CEP, reposiciona o cursor, limpa o status e revalida o valor; blur chama validar quando o usuário sai do campo; change revalida selects e checkbox; invalid mostra a mensagem nativa complementarmente quando o navegador bloqueia um campo; click no botão de submit verifica checkValidity e exibe feedback-erro antes do evento submit; submit impede o envio real, valida os campos, chama reportValidity quando há problemas e exibe feedback-sucesso quando os dados de exemplo são válidos. As rotinas manipulam classes, atributos aria-invalid, aria-expanded, hidden, mensagens e foco, alterando tanto o DOM quanto os estilos sem recarregar a página. Os links ainda navegam entre documentos HTML; a migração completa para uma SPA com preventDefault e history.pushState permanece como próxima etapa.
```

### JavaScript 4 — Rotinas de consistência e feedback do formulário

```text
A rotina validar(campo) começa limpando uma eventual mensagem personalizada com setCustomValidity e consulta campo.validity.valid, mantendo a validação nativa como primeira barreira. Os campos obrigatórios verificam valueMissing; o e-mail usa type=email e uma RegExp complementar; nome exige nome e sobrenome com letras; CPF remove a pontuação e confere onze dígitos, rejeita sequências repetidas e calcula os dois dígitos verificadores; telefone e CEP são formatados pelas máscaras e comparados com RegExp; a data usa type=date e max para impedir datas futuras; o número aceita algarismos, sufixo de letra ou s/n. minlength, maxlength, pattern, required e os tipos HTML continuam aplicados pelo navegador. Quando existe falha, mostrarErro lê validationMessage, define aria-invalid="true" e atualiza o elemento erro-campo com aria-live="polite". O campo também recebe aria-describedby apontando para a instrução e para essa mensagem. A regra [aria-invalid="true"] muda borda e contorno para o estado de erro, enquanto :valid e :invalid fornecem indicação visual complementar. Ao clicar no botão, checkValidity detecta uma tentativa inválida e mostra feedback-erro; a validação nativa apresenta sua mensagem e mantém o foco no primeiro campo inválido. No submit, o script impede o envio real com preventDefault, revalida todos os campos e chama reportValidity se necessário. Quando tudo está consistente, adiciona feedback-sucesso e informa que nenhum dado foi enviado ou armazenado. O feedback usa texto, borda e fundo, não apenas cor, para atender acessibilidade e facilitar a compreensão do problema.
```

### JavaScript 5 — Persistência do rascunho com localStorage

```text
Apliquei localStorage ao cadastro demonstrativo para preservar o rascunho enquanto o usuário navega ou recarrega a página. A função dadosDoFormulario percorre os campos e cria um objeto com seus nomes e valores, tratando checkbox como booleano. salvarRascunho grava esse objeto em localStorage com localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosDoFormulario())). A gravação ocorre nos eventos input e change, depois da formatação das máscaras, mantendo CPF, telefone e CEP no formato apresentado. No carregamento inicial, restaurarRascunho usa getItem para recuperar a string. Se ela existir, JSON.parse converte o conteúdo em objeto e os valores são distribuídos de volta aos campos; checkbox recebe Boolean e os demais elementos recebem value. O bloco try/catch remove a chave se o conteúdo não puder ser convertido, evitando que um rascunho corrompido interrompa a aplicação. A chave utilizada é lacos-cadastro-rascunho. A persistência é apenas local e demonstrativa: não há servidor, envio de dados ou sincronização entre dispositivos. Os dados usados devem ser fictícios. O teste automatizado preenche campos, lê a estrutura JSON salva, recarrega a página e confirma a restauração dos valores.
```

### JavaScript 6 — Bibliotecas e frameworks externos

```text
A aplicação não integrou framework, plugin ou biblioteca externa em tempo de execução. O código da interface usa Vanilla JavaScript em cadastro.js, navegacao.js e projetos.js, carregados por scripts locais com defer. Essa escolha mantém o escopo pequeno, evita dependências de CDN, reduz conflitos de carregamento e deixa explícitos os fundamentos de DOM, eventos, template, validação e localStorage solicitados nesta etapa. O arquivo package.json possui @playwright/test apenas como dependência de desenvolvimento: ele executa testes automatizados em navegador e não é carregado pelas páginas publicadas. Para iniciar o projeto, basta abrir os HTML por um servidor local; não há npm install necessário para a aplicação funcionar. A configuração de testes usa Playwright e um servidor Python local, mas isso pertence ao ambiente de verificação, não ao produto. Portanto, não há linhas de importação de CDN nem inicialização de métodos de biblioteca a descrever. Se uma próxima versão precisar de uma biblioteca, ela deverá ser escolhida para uma finalidade concreta, instalada ou importada de forma explícita e documentada, inicializada depois que o DOM estiver disponível e coberta por testes para evitar impacto no carregamento principal.
```

### Modularização 1 — Separação dos blocos JavaScript

```text
Separei o código por responsabilidade única e por dependências do DOM. navegacao.js concentra somente o menu responsivo e o dropdown: consulta #menu-principal, .menu-toggle e .submenu, registra eventos de click, keydown e mudança de breakpoint e altera aria-expanded, hidden, open e foco. cadastro.js fica exclusivo do formulário: define máscaras, verifica CPF, interpreta a Validity API, mostra mensagens, persiste o rascunho e controla o feedback de sucesso ou erro. projetos.js trata apenas a coleção de projetos e o template: recebe os dados, clona o elemento template e insere os cards no DOM. Cada página carrega navegacao.js porque compartilha o cabeçalho; somente cadastro.html carrega cadastro.js e somente projetos.html carrega projetos.js. Os scripts usam defer, portanto são executados depois da análise do HTML. A comunicação entre módulos ocorre por elementos e atributos semânticos do DOM, como ids, classes, data-campo, aria-expanded e aria-invalid, sem variáveis globais compartilhadas ou dependências de rede. O array projetos é uma fonte local do módulo de projetos, e o formulário acessa localStorage apenas dentro de cadastro.js. Essa separação reduz acoplamento, permite testar cada comportamento isoladamente e evita que uma alteração nas máscaras modifique a navegação. Ainda não converti os arquivos para import/export ES Modules, porque a aplicação é servida diretamente como HTML e mantém scripts independentes com responsabilidades claras; uma evolução possível seria usar type="module" e exportar funções puras de validação, máscaras e renderização. Os testes Playwright cobrem os módulos por seus comportamentos públicos: menu, template, validação, persistência e responsividade.
```

### Modularização 2 — Problemas encontrados, diagnóstico e solução

Adicione uma entrada por problema.


| Problema                                                        | Técnica de diagnóstico                                                                                                                     | Solução aplicada                                                                                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Feedback não aparecia quando campos obrigatórios estavam vazios | Inspeção da Constraint Validation API e teste de submissão com Playwright; o navegador bloqueava a submissão antes de disparar submit.     | Adicionei tratamento no click do botão, mantive a validação nativa e usei checkValidity para exibir feedback-erro antes da mensagem automática. |
| Rascunho inválido podia interromper a restauração               | Teste com valor malformado na chave do localStorage e observação do erro de JSON.parse no console.                                         | Envolvi JSON.parse em try/catch e removo a chave corrompida com removeItem, permitindo que a página continue funcionando.                       |
| Estilos não carregavam após a separação das pastas              | Inspeção da aba Network e das respostas HTTP revelou referências ../estilos.css enquanto o arquivo usado passou para css/estilos.css.      | Atualizei os quatro HTML para ../css/estilos.css e confirmei respostas HTTP 200 e ausência de erros nos testes.                                 |
| Cards repetitivos exigiam manutenção manual                     | Comparação do HTML repetido e teste de carregamento dos projetos mostraram que cada alteração precisava ser copiada em mais de um article. | Criei projeto-template e projetos.js; o script clona o molde, preenche os campos com textContent e insere um DocumentFragment.                  |


### Reflexão final — Experiência Prática III

```text
Nesta experiência prática, evoluí uma interface HTML e CSS para uma aplicação com comportamentos interativos em JavaScript. O uso de templates foi um dos aprendizados mais importantes: em vez de repetir manualmente a marcação dos projetos, organizei os dados em objetos, clonei um elemento template e preenchi seus campos com textContent. Essa abordagem tornou a inclusão de novos projetos mais previsível e reduziu o risco de inconsistências entre cards. Também aprendi a separar responsabilidades em arquivos menores. navegacao.js controla menu, dropdown, foco e breakpoints; cadastro.js concentra máscaras, validação, feedback e persistência; projetos.js renderiza os componentes repetitivos. Essa divisão facilita encontrar a origem de um problema e testar uma parte sem alterar as demais. O trabalho com eventos mostrou que a ordem dos acontecimentos é relevante. A validação nativa pode impedir o evento submit, por isso precisei observar o click do botão e a Constraint Validation API para comunicar o erro sem substituir a proteção do navegador. Eventos input, blur, change, invalid e keydown foram usados com funções específicas, e o uso de preventDefault ficou restrito ao envio demonstrativo do formulário. A persistência com localStorage me ajudou a compreender a conversão entre objeto JavaScript e string JSON. O rascunho é restaurado após o recarregamento, e o try/catch protege a aplicação contra conteúdo corrompido. Os testes automatizados foram importantes para verificar máscaras, feedback, navegação responsiva, template, persistência e ausência de erros em diferentes larguras. Como pontos fortes, destaco a organização progressiva do código, a atenção à acessibilidade e a disposição para investigar falhas observando o comportamento real no navegador. Como oportunidades de melhoria, preciso aprofundar módulos ES, import/export, roteamento com History API e a transformação completa da arquitetura multipágina em SPA, que ainda não foi concluída. Também quero ampliar os testes para leitores de tela, conexão lenta e diferentes navegadores. A experiência mostrou que JavaScript não deve apenas adicionar efeitos: deve preservar a clareza do conteúdo, comunicar estados e tornar as tarefas do usuário mais seguras. Pretendo aplicar esse raciocínio em projetos futuros, começando por uma arquitetura simples, separando responsabilidades e validando cada comportamento antes de ampliar a interface.
```

---

# Experiência Prática IV — Versionamento e acessibilidade

### Versionamento 1 — Estratégia de branches GitFlow

```text
Nesta etapa, passei a usar GitFlow no mesmo repositório. Criei develop a partir de main e as branches feature/acessibilidade-menu e feature/submenu-projetos para corrigir o foco e reorganizar a navegação. As mudanças foram testadas e integradas em develop pelos PRs #3 e #6. A branch release/1.0.1 reuniu a entrega, a documentação e a atualização de versão, seguindo para main pelo PR #4. A entrega foi marcada com a tag v1.0.1 e retornou para develop. Main representa a versão publicada; develop concentra a integração. Não houve hotfix: as correções passaram pelas branches de trabalho e pela release. O histórico anterior foi preservado, pois esse fluxo começou apenas nesta etapa. A revisão foi individual, por inspeção do código e testes, sem aprovação de outro colaborador.
```

### Versionamento 2 — Commits fundamentais e releases

Adicione cada linha como um registro separado. Mensagens até 100 caracteres; descrições até 300. Os commits antigos continuam no histórico; os exemplos abaixo são da entrega realizada nesta etapa.


| Mensagem de commit ou tag da release                        | Descrição e justificativa da alteração                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fix(a11y): preservar foco ao alternar o menu responsivo     | Commit 7e893a3: corrigiu a perda de foco ao cruzar o breakpoint do menu e adicionou dois testes de regressão. A correção mantém o controle ativo visível para quem usa teclado.                                                                                                              |
| fix(nav): alinhar acionador do submenu com Projetos sociais | Commit 7be0d37: substituiu o acionador em uma segunda linha por uma seta junto ao link, com nome acessível e área de toque de 44px. Melhorou a associação visual do submenu.                                                                                                                 |
| fix(nav): usar nome da ONG como link para o inicio          | Commit fa2e8cf: tornou o nome da ONG um link para index.html e removeu a opção Início do menu. Os testes passaram a verificar o retorno à página inicial.                                                                                                                                    |
| fix(nav): posicionar Projetos sociais no fim do menu        | Commit 3d54a34: definiu a ordem Participe, Cadastro e Projetos sociais, com seta no final e dropdown alinhado à direita. Também corrigiu um link de início duplicado detectado durante os testes.                                                                                            |
| chore(release): preparar versao 1.0.1                       | Commit f2bfab5: atualizou package.json e package-lock.json para 1.0.1, mantendo os arquivos de versão consistentes para a entrega.                                                                                                                                                           |
| docs(epiv): documentar fluxo e evidencias da entrega        | Documentou a execução local, os testes, as branches e os registros reais do GitHub. Atualizou as respostas da atividade para refletir o fluxo adotado nesta etapa.                                                                                                                           |
| v1.0.1                                                      | Release com correções compatíveis de navegação, testes e documentação. Incrementa PATCH sobre 1.0.0, já declarado no projeto. A política é MAJOR para incompatibilidades, MINOR para novas funcionalidades compatíveis e PATCH para correções. É a primeira tag publicada deste repositório. |


### Versionamento 3 — Issues, milestones e pull requests

Adicione cada linha como um registro separado. Tipos até 150 caracteres; descrições até 500.


| Tipo de registo                             | Descrição do contexto e alterações realizadas                                                                                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Issue #1 — Preservação de foco              | Registrei a perda de foco ao mudar o breakpoint do menu. Dois testes reproduziram o defeito antes da correção; depois, a suíte passou. A solução foi desenvolvida em feature/acessibilidade-menu e integrada pelo PR #3.       |
| Issue #2 — Documentação da entrega          | Organizei a atualização do README e das respostas com execução local, testes e evidências de GitFlow. O registro diferencia os commits antigos em main das práticas adotadas nesta etapa.                                      |
| Issue #5 — Organização do menu              | Registrei a melhoria visual solicitada: aproximar a seta de Projetos sociais, usar o nome da ONG para voltar ao início e posicionar Projetos sociais depois de Cadastro. A implementação passou pelo PR #6.                    |
| Milestone — Experiência Prática IV — v1.0.1 | Agrupei as issues de acessibilidade, documentação e navegação em uma entrega comum. O milestone também reuniu os PRs das melhorias e da release, permitindo acompanhar o trabalho até sua conclusão.                           |
| Pull request #3 — Correção de foco          | Integrei feature/acessibilidade-menu em develop após reproduzir a falha e validar a correção. O PR descreve o problema e os testes. A revisão foi individual; não houve aprovação de outro colaborador.                        |
| Pull request #6 — Melhoria do menu          | Integrei feature/submenu-projetos em develop. O PR documenta o acionador com seta, o nome da ONG como link inicial e a ordem final do menu. Foram verificados teclado, desktop, celular e funcionamento sem JavaScript.        |
| Pull request #4 — Release v1.0.1            | Reuni as duas melhorias e a documentação em release/1.0.1 e integrei a entrega em main. O PR vincula as issues, registra 32 testes aprovados e prepara a publicação da tag v1.0.1. Após a entrega, main retornou para develop. |


**Links para comprovação**

- [Issue #1](https://github.com/rita-moura/desenvolvimento-front-end-para-web/issues/1)
- [Issue #2](https://github.com/rita-moura/desenvolvimento-front-end-para-web/issues/2)
- [Issue #5](https://github.com/rita-moura/desenvolvimento-front-end-para-web/issues/5)
- [Milestone v1.0.1](https://github.com/rita-moura/desenvolvimento-front-end-para-web/milestone/1)
- [PR #3](https://github.com/rita-moura/desenvolvimento-front-end-para-web/pull/3)
- [PR #6](https://github.com/rita-moura/desenvolvimento-front-end-para-web/pull/6)
- [PR #4](https://github.com/rita-moura/desenvolvimento-front-end-para-web/pull/4)
- [Release v1.0.1](https://github.com/rita-moura/desenvolvimento-front-end-para-web/releases/tag/v1.0.1)

**Limite das evidências:** os testes desta entrega cobrem Chromium em desktop e celular. A correção de foco não comprova, por si só, conformidade integral com WCAG 2.1 AA. A aplicação continua multipágina; esta entrega não implementou SPA.

### Documentação 1 — Seções principais do README.md

Adicione cada linha como uma seção separada. Nomes até 100 caracteres; descrições até 300.

| Nome da seção | Descrição e tecnologias mencionadas |
| --- | --- |
| Laços da Comunidade — Experiências Práticas de Front-end | Apresenta o site de uma ONG fictícia, seu objetivo acadêmico de praticar front-end e o link de acesso à aplicação publicada no GitHub Pages. |
| Tecnologias utilizadas | Lista HTML5 para estrutura, CSS3 com Grid e Flexbox, JavaScript puro para interações e localStorage com JSON. Também identifica Python 3, Node.js, npm, Playwright, Git, GitHub e GitHub Pages. |
| Pré-requisitos | Informa Git para clonagem, Python 3 e navegador para execução local. Para testes, exige Node.js 20 ou superior, npm e Chromium instalado pelo Playwright. O site funciona sem dependências npm. |
| Organização | Mostra a árvore de Experiencias-Praticas, separando HTML, CSS, JavaScript, imagens, validações e testes. Identifica package.json, playwright.config.js, site.spec.js e respostas.md. |
| Como ler o HTML | Explica tags semânticas, hierarquia h1, h2 e h3, texto alternativo e recursos de acessibilidade, como aria-current, aria-labelledby e o link para pular ao conteúdo principal. |
| Estado atual do projeto | Descreve a arquitetura multipágina e os comportamentos JavaScript: templates, eventos, validação e persistência em localStorage. Explica a separação dos scripts e registra que a migração para SPA ainda não foi implementada. |
| Rodar localmente | Documenta git clone, entrada na pasta e execução de python3 -m http.server 8001 --bind 127.0.0.1 --directory Experiencias-Praticas. Informa o endereço local para abrir index.html e Ctrl+C para encerrar o servidor. |
| Build e publicação | Esclarece que não há compilação nem npm run build. HTML, CSS, JavaScript e imagens são servidos diretamente; a publicação estática usa GitHub Pages a partir da branch main. |
| Executar os testes | Apresenta npm ci, npx playwright install chromium, npm test e npm run test:ui. Explica os testes Playwright, o servidor Python na porta 8765 e os cenários de navegação, formulário e responsividade. |
| Estratégia de branches | Documenta o GitFlow adotado nesta etapa: main para publicação, develop para integração, feature/* para melhorias e release/1.0.1 para entrega. Explica o uso futuro de hotfix/* e a revisão individual. |
| Commits e releases | Explica o padrão type(scope): descrição e o versionamento MAJOR, MINOR e PATCH. Registra a tag anotada v1.0.1 e justifica o incremento PATCH pelas correções compatíveis de navegação. |
| Registros da Experiência Prática IV | Reúne links de issues, milestone, pull requests e release no GitHub, além das evidências de 32 testes Playwright em Chromium nos perfis desktop e celular e dos limites da verificação de acessibilidade. |

### Documentação 2 — Instalação local e práticas de versionamento

Copie apenas o conteúdo do bloco para o campo de resposta (até 1.000 caracteres).

```text
Documentei os pré-requisitos: Git, Python 3 e navegador; para testes, Node.js 20 ou superior e npm. Primeiro, executar git clone https://github.com/rita-moura/desenvolvimento-front-end-para-web.git e entrar em desenvolvimento-front-end-para-web. Na raiz, iniciar python3 -m http.server 8001 --bind 127.0.0.1 --directory Experiencias-Praticas e abrir http://127.0.0.1:8001/html/index.html. Ctrl+C encerra o servidor. Para testar, em outro terminal na raiz, executar cd Experiencias-Praticas, npm ci, npx playwright install chromium e npm test, nessa ordem. O site é estático e não exige build. Sobre versionamento, descrevi GitFlow com main, develop, feature/* e release/*; hotfix/* ficou previsto para urgências. Registrei commits no padrão type(scope): descrição, versionamento MAJOR/MINOR/PATCH e a tag v1.0.1. Incluí links de issues, milestone, pull requests e release, informando que a revisão foi individual, com inspeção e testes.
```

### Acessibilidade 1 — Alterações semânticas e WAI-ARIA

Adicione cada linha como um registro separado. Elementos até 100 caracteres; justificativas até 300. As entradas descrevem recursos presentes no código atual.

| Elemento modificado ou tag implementada | Justificação e impacto na acessibilidade |
| --- | --- |
| header, nav, main e footer — landmarks | Organizei as quatro páginas com cabeçalho, navegação, conteúdo principal e rodapé semânticos. Esses marcos identificam as regiões do documento e facilitam a navegação por leitores de tela, sem depender de divs genéricas ou de roles redundantes. |
| nav com aria-label e links com aria-current | Nomeei o menu como Navegação principal e a navegação interna de projetos como Nesta página usando aria-label. Apliquei aria-current="page" ao link da página atual, permitindo distinguir as navegações e identificar a localização no site. |
| main id="conteudo" e link Pular para o conteúdo | Incluí um link no início de cada página que aponta para o conteúdo principal. Ele fica visível ao receber foco e permite a quem usa teclado saltar o menu repetido para acessar diretamente o conteúdo. |
| h1, h2 e h3 — hierarquia de títulos | Usei um h1 por página, h2 para assuntos principais e h3 para subdivisões. A hierarquia expressa a organização do conteúdo e facilita localizar assuntos pela navegação de títulos dos leitores de tela. |
| section, article e aside com aria-labelledby | Associei seções e o aviso complementar aos títulos por aria-labelledby. Nos cards de projetos, o JavaScript atribui IDs aos títulos e os relaciona aos articles, identificando cada conteúdo independente por seu próprio nome. |
| button do menu com aria-expanded e aria-controls | Implementei um botão nativo para abrir o menu móvel. aria-controls aponta para menu-principal e aria-expanded é atualizado pelo JavaScript conforme a abertura. O atributo hidden acompanha a visibilidade do menu, mantendo estado e apresentação coerentes. |
| details e summary — submenu de projetos | Usei details e summary para um submenu operável por teclado e funcional sem JavaScript. O summary contém o texto acessível Explorar projetos; a seta decorativa usa aria-hidden="true". O estado de abertura é fornecido pela semântica nativa. |
| Menu e submenu — gerenciamento de foco | Ao pressionar Escape, o JavaScript fecha o submenu ou menu móvel e devolve o foco ao acionador correspondente. Ao mudar o breakpoint, transfere o foco quando o controle ativo seria ocultado. O CSS mantém indicação de foco visível. |
| label, fieldset e legend — formulário | Associei rótulos aos campos por for/id e envolvi o checkbox em label. Agrupei dados pessoais, endereço e interesse em fieldsets com legends, fornecendo nomes e contexto para compreender os controles durante o preenchimento. |
| form e campos com aria-describedby | Associei o formulário à orientação inicial e os campos de CPF, telefone e CEP às instruções de formato. O JavaScript acrescenta o ID da mensagem de erro a aria-describedby, preservando a ajuda existente para cada campo. |
| Campos com aria-invalid e validação nativa | Atualizo aria-invalid conforme a validade do campo e mantenho required, tipos HTML, pattern e Constraint Validation API. As mensagens explicam o erro em texto, e a validação nativa permanece ativa para bloquear o envio inválido e orientar a correção. |
| Mensagens de erro com aria-live="polite" | Criei mensagens de erro junto aos campos com aria-live="polite". O JavaScript atualiza seu texto durante a validação, permitindo anunciar mudanças aos leitores de tela sem exigir que o usuário procure visualmente cada mensagem. |
| Seletor de tema com label e select nativos | Implementei um select com label Tema e opções Sistema, Claro, Escuro e Alto contraste. O controle nativo expõe seu nome e a opção selecionada às tecnologias assistivas, mantendo o foco durante a troca e dispensando roles redundantes. |
| Resultado do cadastro com role="status" | Defini role="status" no elemento de resultado do cadastro. O JavaScript informa quando é necessário revisar campos ou quando a validação termina com sucesso, permitindo comunicar o feedback sem deslocar o foco para a mensagem. |

### Acessibilidade 2 — Componentes, teclado e leitores de tela

Adicione cada linha como um componente separado. Nomes até 50 caracteres; descrições até 300.

| Nome do componente | Descrição do ajuste ou problema retificado |
| --- | --- |
| Link Pular para o conteúdo | Incluí o link antes do cabeçalho e o tornei visível ao receber foco. Com Tab e Enter, o usuário acessa o conteúdo principal sem percorrer todos os links do menu, reduzindo a repetição na navegação por teclado. |
| Menu principal e link da página inicial | Usei links nativos na ordem do HTML e o nome da ONG como acesso à página inicial. aria-label identifica a navegação e aria-current="page" indica a página ativa. A sequência de Tab acompanha os controles sem tabindex positivo. |
| Botão do menu móvel | Usei button nativo, com aria-controls e aria-expanded atualizado ao abrir ou fechar o menu. O menu fechado recebe hidden, retirando seus links da sequência de Tab. Escape fecha o menu aberto e devolve o foco ao botão. |
| Submenu Projetos sociais | Usei details e summary, acionáveis por teclado. O acionador recebeu o nome acessível Explorar projetos, e a seta decorativa usa aria-hidden. Escape fecha o submenu e devolve o foco ao summary; sem JavaScript, a abertura nativa continua disponível. |
| Menu ao mudar o tamanho da tela | Corrigi a perda de foco quando a mudança de breakpoint ocultava o controle ativo. O script direciona o foco ao botão móvel, ao primeiro link ou ao summary, conforme o caso, preservando o foco externo ao menu. Há testes de regressão para esses cenários. |
| Indicadores visuais de foco | Defini :focus-visible com outline de 3px e afastamento de 4px para destacar o elemento ativo. Campos e botões também possuem estilos de foco, permitindo acompanhar visualmente o percurso do teclado sem depender do estado hover. |
| Campos e grupos do formulário de cadastro | Associei labels aos campos e organizei grupos com fieldset e legend. Mantive controles HTML nativos na ordem do documento. aria-describedby vincula instruções e erros aos campos, oferecendo contexto para o preenchimento com teclado e leitores de tela. |
| Seletor de tema | Incluí um select nativo com label Tema, disponível fora do menu móvel recolhível. Permite escolher Sistema, Claro, Escuro ou Alto contraste por teclado, mantém o foco após a mudança e recebe um contorno visível adaptado à paleta. |
| Validação e mensagens do cadastro | Mantive a validação nativa para bloquear o envio inválido e focar o primeiro campo com erro. aria-invalid indica inconsistências, aria-live="polite" sinaliza atualizações das mensagens e role="status" identifica o resultado da validação sem deslocar o foco. |

**Verificação:** os ajustes foram conferidos no HTML, CSS e JavaScript. A suíte Playwright contém cenários de teclado e foco; não há registro de teste manual com NVDA ou VoiceOver que confirme a verbalização nesses leitores.

### Acessibilidade 3 — Modos de cor e estratégia de contraste

Copie apenas o conteúdo do bloco para o campo de resposta (até 1.500 caracteres).

```text
Implementei os temas Claro, Escuro e Alto contraste nas quatro páginas, selecionados pelo controle Tema no cabeçalho. O select nativo tem label, funciona por teclado e mantém o foco ao trocar a aparência. A opção Sistema acompanha prefers-color-scheme e prefers-contrast, priorizando contraste aumentado. Uma escolha manual prevalece e é salva em localStorage na chave lacos-tema, sendo restaurada ao recarregar ou navegar. Voltar a Sistema remove a preferência salva. Se o armazenamento estiver bloqueado, a troca continua funcionando na página atual. O arquivo tema.js aplica data-tema ao html antes do CSS; variáveis compartilhadas definem textos, fundos, links, campos, botões, foco e feedback. No tema escuro, usei superfícies verde-escuras e textos claros. No alto contraste, adotei fundo preto, texto branco, links amarelos sublinhados e foco ciano. As mensagens de erro e sucesso também têm paletas próprias e texto explicativo. Sem JavaScript, media queries acompanham o sistema; forced-colors preserva as cores forçadas do dispositivo. Validei 48 medições com Playwright/Chromium e a fórmula WCAG: 42 pares de texto/fundo acima de 4,5:1 e seis medições de borda/foco do seletor acima de 3:1. Os menores contrastes de texto foram 6,02:1, 8,72:1 e 12,44:1 nos temas claro, escuro e alto contraste. Os 50 testes passaram em desktop e celular.
```

### Acessibilidade 4 — Elementos visuais e contraste verificado

Adicione cada linha como um registro separado. Elementos até 100 caracteres; cores e rácio até 150; ferramenta até 100. Todos os registros abaixo medem texto sobre seu fundo.

| Elemento | Cores utilizadas e rácio obtido | Ferramenta de validação utilizada |
| --- | --- | --- |
| Claro — Texto principal | Texto #193b32; fundo #f4f6f0; contraste 11,26:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Texto de apresentação | Texto #486358; fundo #f4f6f0; contraste 6,02:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Links do menu | Texto #205c4a; fundo #ffffff; contraste 7,80:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Seletor de tema | Texto #193b32; fundo #ffffff; contraste 12,26:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Botão de cadastro | Texto #ffffff; fundo #205c4a; contraste 7,80:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Botão de cadastro em hover | Texto #ffffff; fundo #193b32; contraste 12,26:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Erro junto ao campo | Texto #a31515; fundo #ffffff; contraste 7,85:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Resultado com erro | Texto #7d1515; fundo #fbe8e8; contraste 8,95:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Claro — Resultado com sucesso | Texto #155c3c; fundo #e4f4ea; contraste 7,01:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Texto principal | Texto #edf5ef; fundo #101c17; contraste 15,75:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Texto de apresentação | Texto #bed2c5; fundo #101c17; contraste 11,01:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Links do menu | Texto #8be0b5; fundo #192c24; contraste 9,41:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Seletor de tema | Texto #edf5ef; fundo #192c24; contraste 13,25:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Botão de cadastro | Texto #10231c; fundo #8be0b5; contraste 10,50:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Botão de cadastro em hover | Texto #10231c; fundo #edf5ef; contraste 14,78:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Erro junto ao campo | Texto #ffb4b4; fundo #192c24; contraste 8,72:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Resultado com erro | Texto #ffd3d3; fundo #482323; contraste 10,07:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Escuro — Resultado com sucesso | Texto #b6f2cc; fundo #163d2b; contraste 9,54:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Texto principal | Texto #ffffff; fundo #000000; contraste 21,00:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Texto de apresentação | Texto #ffffff; fundo #000000; contraste 21,00:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Links do menu | Texto #ffff00; fundo #000000; contraste 19,56:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Seletor de tema | Texto #ffffff; fundo #000000; contraste 21,00:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Botão de cadastro | Texto #000000; fundo #ffff00; contraste 19,56:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Botão de cadastro em hover | Texto #000000; fundo #ffffff; contraste 21,00:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Erro junto ao campo | Texto #ffb4b4; fundo #000000; contraste 12,44:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Resultado com erro | Texto #ffffff; fundo #000000; contraste 21,00:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |
| Alto contraste — Resultado com sucesso | Texto #ffffff; fundo #000000; contraste 21,00:1. | Playwright/Chromium + script JavaScript (fórmula WCAG) |

**Evidências:** [48 medições com precisão completa](validacao/contraste.json) e [script de verificação](validacao/verificar-contraste.cjs). O relatório também inclui campos, instruções, rodapé, link ativo e contraste não textual do seletor. Para reproduzir, com as dependências e o Chromium instalados, execute na raiz:

```bash
node Experiencias-Praticas/validacao/verificar-contraste.cjs
```

O script lê estilos computados em Chromium e calcula (Lmaior + 0,05) / (Lmenor + 0,05), seguindo a [referência de contraste da WCAG](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html). A comparação usa valores completos; a tabela exibe duas casas decimais. A borda do seletor obteve 3,86:1, 6,60:1 e 21:1; o foco obteve 5,27:1, 10,21:1 e 16,75:1, respectivamente nos temas claro, escuro e alto contraste. Essas seis medições não textuais foram comparadas com 3:1.

**Verificação funcional:** 50 testes Playwright aprovados em Chromium, nos perfis desktop e celular. As medições cobrem a amostra documentada; não equivalem a uma auditoria completa WCAG ou a testes manuais com NVDA/VoiceOver. As imagens mantêm suas cores originais.
