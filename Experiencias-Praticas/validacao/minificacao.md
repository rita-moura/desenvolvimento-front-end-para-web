# Verificação da minificação

Comandos executados em `Experiencias-Praticas`:

```bash
npm run test:build
node validacao/verificar-contraste.cjs --build
```

A suíte Playwright passou com **50 testes**, em Chromium desktop e celular, servindo exclusivamente `dist/`. As **48 medições de contraste** da build também passaram: 42 pares textuais com limite de 4,5:1 e seis pares não textuais com limite de 3:1.

## Tamanhos medidos

Valores em bytes UTF-8, sem gzip/Brotli. Percentuais calculados sobre os totais em bytes, não pela média dos percentuais individuais. As imagens foram copiadas sem alteração e não participam do cálculo.

| Arquivo | Original (bytes) | Minificado (bytes) | Redução |
| --- | ---: | ---: | ---: |
| css/estilos.css | 13999 | 11069 | 20,93% |
| html/cadastro.html | 6383 | 5758 | 9,79% |
| html/index.html | 4448 | 3633 | 18,32% |
| html/participe.html | 3511 | 3063 | 12,76% |
| html/projetos.html | 5482 | 4896 | 10,69% |
| js/cadastro.js | 6198 | 3851 | 37,87% |
| js/navegacao.js | 1790 | 988 | 44,80% |
| js/projetos.js | 1698 | 1305 | 23,14% |
| js/tema.js | 1734 | 892 | 48,56% |
| **Total** | **45243** | **35455** | **21,63%** |

## Preservação do comportamento

- As entradas JavaScript são isoladas em IIFEs; o script de tema permanece síncrono antes do CSS e os demais preservam `defer`.
- A minificação HTML preserva tags, atributos ARIA, IDs, templates e espaços entre conteúdos inline, além dos caminhos relativos.
- Os testes cobrem formulário, máscaras, validação nativa, persistência, navegação, teclado, responsividade, temas e funcionamento sem JavaScript.
- A medição de contraste usa os arquivos de `dist/` e registra cores computadas nos três temas, inclusive feedback de sucesso e erro.
- `dist/` é reconstruída sem modificar os fontes e não contém dependências, testes ou respostas da atividade.

O relatório [minificacao.json](minificacao.json) registra versões das ferramentas, tamanhos completos e hashes SHA-256. Os resultados de contraste estão em [contraste-producao.json](contraste-producao.json). Estas verificações não são uma auditoria integral de acessibilidade, uma medição de tempo de carregamento ou uma confirmação de deploy público.
