# Correção da Experiência Prática III — SPA

| Solicitação da avaliação | Implementação |
| --- | --- |
| Entrada única com main | html/index.html contém main#app e os templates das vistas; os três HTML antigos redirecionam. |
| Funções de renderização | js/vistas.js exporta renderHome, renderProjetos, renderParticipe e renderCadastro. |
| Roteador e histórico | js/app.js mantém o mapa de rotas, intercepta links e utiliza pushState, replaceState e popstate. |
| Reutilizar projeto-template | renderProjetos monta a vista e chama renderizarProjetos, que clona o template e preenche dados com textContent. |

As rotas usam query string para permitir recarga direta em hospedagem estática. Título, aria-current e foco acompanham a navegação. Links externos, downloads e abertura em nova aba preservam o comportamento nativo. Os controles do cadastro são inicializados após cada montagem, sem duplicar listeners globais.

## Validação

`npm test`: 64 testes aprovados nos fontes. `npm run test:build`: 64 testes aprovados na produção minificada. Ambos executam Chromium desktop e celular. A suíte verifica ausência de nova requisição de documento na navegação interna, Voltar/Avançar, recarga direta, âncoras, rotas desconhecidas, redirecionamentos antigos, montagem repetida, rascunho e localStorage indisponível ou corrompido.

A verificação de produção aprovou 48 pares de contraste e cinco cenários de imagem. Não foram executados testes manuais com NVDA/VoiceOver nem uma auditoria integral WCAG. Os relatórios W3C das etapas anteriores são históricos.
