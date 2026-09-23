# Respostas — Experiência prática 1

## 1. Principais tags semânticas utilizadas

Cada linha corresponde a uma entrada no formulário. Informe o nome da tag sem os sinais `<` e `>`.

| Nome da tag | Propósito ou conteúdo abrigado |
|---|---|
| `header` | Apresenta o nome da ONG e reúne o menu de navegação no topo das páginas. |
| `nav` | Organiza os links de navegação entre as páginas Início, Projetos sociais e Participe. |
| `main` | Abriga o conteúdo principal de cada página, como a apresentação da ONG e os projetos sociais. |
| `section` | Agrupa conteúdos do mesmo assunto, como Quem somos, Nossas iniciativas e Voluntariado. |
| `article` | Apresenta cada projeto social de forma independente, com descrição, objetivo e atividades. |
| `aside` | Apresenta uma observação complementar sobre o caráter acadêmico e fictício do site. |
| `footer` | Exibe informações de encerramento, identificando a ONG e o caráter fictício do projeto acadêmico. |
| `address` | Reúne o e-mail e o endereço de contato da ONG, identificados como fictícios. |
| `img` | Apresenta uma ilustração de um livro aberto com texto alternativo no atributo alt. |
| `h1` | Identifica o tema principal de cada página. |
| `h2` | Identifica as seções principais e os títulos dos projetos sociais. |
| `h3` | Identifica subdivisões, como missão, valores, objetivos e atividades. |

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

| Bloco de informação | Estrutura HTML utilizada |
|---|---|
| Apresentação da página | main abriga o conteúdo principal, com h1 para o título e p para a introdução. |
| Navegação pelos assuntos | nav com ul, li e links a para acessar os projetos, o voluntariado e as doações. |
| Projeto Aprender juntos | article com h2 para o nome, h3 para objetivo e atividades, p para descrições e ul para a lista de atividades. |
| Projeto Leitura para todos | article com h2 para o nome, h3 para objetivo e atividades, p para descrições e ul para a lista de atividades. |
| Trabalho voluntário | section com h2, subtítulos h3, lista ul de atuações, lista ol de passos e link a para a página de participação. |
| Campanhas de doação | section com h2, subtítulos h3 para materiais, contribuição financeira e transparência, parágrafos p, lista ol e link a de contato. |

## 7. Como a organização orienta quem deseja contribuir ou atuar como voluntário

```text
Organizei a página para apresentar primeiro os projetos, seus objetivos e suas atividades. Em seguida, separei as orientações de trabalho voluntário e as campanhas de doação em seções com títulos claros. O menu interno permite acessar diretamente cada assunto. As listas de atividades ajudam o visitante a identificar como pode colaborar, enquanto as listas numeradas apresentam os passos para participar ou buscar orientações sobre contribuições financeiras. A seção de doações explica a destinação dos recursos e o modelo proposto de prestação de contas. Os links conduzem à página de participação e à seção de contato. A hierarquia de títulos h1, h2 e h3 facilita a leitura e a navegação por leitores de tela. Como se trata de um projeto acadêmico, a página informa que os contatos são fictícios e que não há doações ou inscrições reais.
```

## 8. Etapa de cadastro — implementação realizada

```text
Criei cadastro.html com agrupamentos fieldset e legend para dados pessoais, endereço e interesse em participar. Associei os rótulos aos campos e utilizei os tipos text, email, date e tel, além de select e checkbox. Apliquei required, minlength, maxlength e pattern conforme a finalidade dos campos. O JavaScript formata CPF, telefone e CEP, verifica os dígitos verificadores do CPF e limita a data de nascimento ao dia atual. Ao sair de um campo ou tentar concluir, o formulário mostra mensagens de erro associadas aos campos por aria-describedby e marca os inválidos com aria-invalid. O primeiro campo inválido recebe foco ao concluir. O formulário também verifica nome e sobrenome, formato de e-mail e número do endereço, informa o resultado em uma região de status e não envia nem armazena dados. O HTML foi verificado no Nu HTML Checker do W3C, sem erros ou avisos no resultado final.
```

## 9. Agrupamento lógico dos campos em cadastro.html

```text
Organizei o formulário dentro de um fieldset principal com a legend “Cadastro demonstrativo”. Esse agrupamento permanece desabilitado até o carregamento do JavaScript, evitando envio acidental sem as funções da demonstração. Dentro dele, criei três fieldsets, cada um identificado por uma legend. “Dados pessoais” reúne nome completo, e-mail, data de nascimento, CPF e telefone. “Endereço” reúne CEP, logradouro, número, complemento, bairro, cidade e estado. “Interesse em participar” contém a seleção da forma de participação e a confirmação de uso de dados fictícios. Essa divisão aproxima campos relacionados e torna o preenchimento mais fácil de compreender. As legends identificam semanticamente os grupos, oferecendo contexto também aos usuários de leitores de tela. Cada campo possui um label associado: nos campos individuais, por for e id; na confirmação, o checkbox está dentro do label. As instruções de formato e as mensagens de erro são associadas aos campos por aria-describedby. O complemento é opcional, e os demais campos são obrigatórios.
```

## 10. Campos do formulário: atributo type e justificativa

Adicione uma entrada por linha. A primeira coluna corresponde a “Nome do campo” e a segunda a “Atributo type e justificativa”. Os textos respeitam os limites de 50 e 150 caracteres.

| Nome do campo | Atributo type e justificativa |
|---|---|
| Nome completo | type="text": recebe nome e sobrenome, com espaços e letras; o JavaScript verifica o preenchimento. |
| E-mail | type="email": permite verificar o formato de e-mail e oferece teclado adequado em dispositivos móveis. |
| Data de nascimento | type="date": permite escolher uma data; o atributo max impede datas futuras. |
| CPF | type="text": preserva zeros iniciais e aceita a máscara. inputmode="numeric" sugere teclado numérico; o JS verifica os dígitos. |
| Telefone com DDD | type="tel": representa um telefone, aceita pontuação e favorece o teclado telefônico. pattern e JavaScript validam o formato. |
| CEP | type="text": preserva zeros iniciais e o hífen da máscara. inputmode="numeric" facilita a digitação dos oito dígitos. |
| Logradouro | type="text": aceita nomes de ruas e avenidas, incluindo letras, números e espaços. |
| Número (ou s/n) | type="text": aceita número, sufixo de letra ou s/n, formatos que type="number" não comporta. |
| Complemento | type="text": permite informações livres, como apartamento ou bloco. O preenchimento é opcional. |
| Bairro | type="text": aceita o nome do bairro, com letras e espaços. |
| Cidade | type="text": aceita o nome da cidade, incluindo espaços e acentos. |
| Estado (UF) | Utilizei select, sem atributo type, com as 27 UFs como opções para padronizar a escolha e evitar erros de digitação. |
| Forma de participação | Utilizei select, sem atributo type, para escolher trabalho voluntário, campanhas de doação ou ambas as opções. |
| Confirmação de uso de dados fictícios | type="checkbox": registra uma confirmação explícita; required exige sua marcação antes de concluir a demonstração. |

## 11. Dados validados e atributos nativos utilizados

Adicione uma entrada por linha. As três primeiras correspondem aos campos destacados no enunciado.

| Dado validado | Atributos HTML e padrão adotado |
|---|---|
| CPF | pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}" e required: exigem o formato 000.000.000-00 e o preenchimento. |
| Telefone | pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}" e required: exigem DDD e telefone no formato (00) 0000-0000 ou (00) 00000-0000. |
| CEP | pattern="[0-9]{5}-[0-9]{3}" e required: exigem oito dígitos no formato 00000-000 e o preenchimento. |
| Nome completo | required, minlength="3" e maxlength="100": exigem preenchimento e limitam o tamanho do nome. |
| E-mail | type="email", required e maxlength="150": verificam o formato de e-mail, exigem preenchimento e limitam o tamanho. |
| Data de nascimento | type="date", required e max atualizado pelo JavaScript para a data atual: exigem uma data e impedem datas futuras. |
| Logradouro, número, bairro e cidade | required: exige o preenchimento de cada campo. O complemento é opcional. |
| Estado e forma de participação | required nos elementos select: exige escolher uma opção com valor, em vez de manter “Selecione”. |
| Confirmação de uso de dados fictícios | type="checkbox" e required: exigem marcar a confirmação antes de concluir. |

Os padrões estão transcritos do HTML. inputmode sugere o teclado, mas não valida o conteúdo. A formatação durante a digitação e a verificação dos dígitos do CPF são feitas pelo JavaScript.

## 12. Contribuição das validações para a integridade dos dados

```text
O atributo pattern verifica se o valor completo corresponde ao formato esperado para CPF, telefone e CEP. Ele não insere pontuação: essa máscara é aplicada pelo JavaScript. O atributo required exige o preenchimento dos campos obrigatórios e a marcação da confirmação. Os atributos minlength e maxlength limitam o tamanho dos textos, type="email" verifica o formato do e-mail e type="date", combinado com max, restringe a data de nascimento. No projeto, o JavaScript consulta a validade nativa dos campos e acrescenta regras, como a conferência dos dígitos verificadores do CPF. A apresentação automática dos erros do navegador é desativada com noValidate, mas as restrições continuam disponíveis pela API de validação. O script apresenta mensagens junto aos campos, destaca os inválidos e impede concluir enquanto houver erros. Isso reduz omissões e inconsistências, mas não comprova a existência dos dados informados. Em uma aplicação real, o servidor também deve validar os dados, pois as verificações no navegador podem ser contornadas. Neste exercício, nenhum dado é enviado ou armazenado.
```

## 13. Imagens para anexar individualmente

O formulário “Adicionar imagem” pede um título e um arquivo de imagem por envio. Não selecione os arquivos ZIP nesse campo.

| Título | Arquivo a selecionar na pasta imagens |
|---|---|
| Livro aberto — PNG | leitura-comunitaria.png |
| Livro aberto — WebP | leitura-comunitaria.webp |
| Livro aberto — SVG | leitura-comunitaria.svg |

Clique em “Selecionar arquivo”, escolha o arquivo e clique no ícone de salvar. Repita para cada formato aceito pela plataforma. Comece pelo PNG; se o seletor recusar WebP ou SVG, não altere apenas a extensão dos arquivos. As três versões representam a mesma ilustração e são utilizadas pelo elemento picture na página inicial. Todos os arquivos estão abaixo do limite de 50 MB.

Os pacotes da pasta entrega permanecem disponíveis para entrega do projeto por outro canal. Este campo de imagens não serve para anexar o código-fonte.

## 14. Estrutura de diretórios

Adicione uma pasta por vez. Copie a primeira coluna para “Nome da pasta ou diretório raiz” e a segunda para “Arquivos contidos”. Todas as entradas respeitam os limites de 60 e 500 caracteres.

| Nome da pasta ou diretório raiz | Arquivos contidos |
|---|---|
| Experiencia-Pratica-1 | README.md e respostas.md. Contém as subpastas html, imagens, js, validacao e entrega. |
| html | index.html, projetos.html, participe.html e cadastro.html. |
| imagens | leitura-comunitaria.svg, leitura-comunitaria.webp, leitura-comunitaria.png e .gitkeep (arquivo auxiliar do versionamento). |
| js | cadastro.js. |
| validacao | index-w3c.json, projetos-w3c.json, participe-w3c.json e cadastro-w3c.json. |
| entrega | imagens-otimizadas.zip, projeto-completo.zip e codigo-fonte-completo.txt. |

## 15. Código-fonte completo para entrega

O código integral está em entrega/codigo-fonte-completo.txt e os arquivos executáveis estão em entrega/projeto-completo.zip. As quatro páginas juntas ultrapassam os 10.000 caracteres do campo. Não cole uma versão cortada. Se a plataforma permitir anexar o projeto completo, anexe o ZIP e use o texto abaixo somente após anexá-lo. Se aceitar apenas imagens no upload, será necessário hospedar o código em um repositório acessível e colar seu link nesse campo; ainda não foi publicado um link.

```text
O código-fonte completo está no arquivo projeto-completo.zip anexado à entrega, com as páginas index.html, projetos.html, participe.html e cadastro.html na pasta html. O pacote também contém o JavaScript, as imagens e os relatórios de validação do W3C. As quatro páginas foram verificadas no Nu HTML Checker, sem erros ou avisos no resultado final. Para executar, extraia o ZIP e abra html/index.html no navegador.
```
