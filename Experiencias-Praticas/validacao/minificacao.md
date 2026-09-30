# Verificação da minificação

A suíte Playwright passou com **64 testes nos fontes e 64 na build**, em Chromium desktop e celular. As **48 medições de contraste** da produção também passaram.

Comandos: `npm test`, `npm run test:build` e `node validacao/verificar-contraste.cjs --build`, em `Experiencias-Praticas`.

## Tamanhos medidos

Bytes UTF-8, sem imagens ou gzip/Brotli. Os módulos agrupados em app.js são contados uma vez, conforme o metafile do esbuild.

| Saída | Fontes (bytes) | Minificado (bytes) | Redução |
| --- | ---: | ---: | ---: |
| css/estilos.css | 14097 | 11156 | 20.86% |
| html/cadastro.html | 518 | 503 | 2.90% |
| html/index.html | 13553 | 11703 | 13.65% |
| html/participe.html | 521 | 506 | 2.88% |
| html/projetos.html | 518 | 503 | 2.90% |
| js/app.js | 14520 | 8461 | 41.73% |
| js/tema.js | 1734 | 892 | 48.56% |
| **Total** | **45461** | **33724** | **25,82%** |

## Preservação do comportamento

- app.js agrupa os módulos da SPA; tema.js permanece separado antes do CSS.
- O HTML preserva templates, atributos ARIA, caminhos e espaços significativos.
- Os testes cobrem histórico, links diretos, âncoras, teclado, formulário, persistência, temas e montagem repetida das vistas.
- Sem JavaScript, a Home é legível e informa a limitação de navegação.
- A build não contém testes, respostas ou dependências.

O [relatório JSON](minificacao.json) registra fontes, versões, tamanhos e hashes SHA-256. Os resultados de contraste estão em [contraste-producao.json](contraste-producao.json). Essas verificações não representam auditoria integral de acessibilidade nem medição de tempo global de carregamento.
