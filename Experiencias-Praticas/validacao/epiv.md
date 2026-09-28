# Validação da entrega v1.0.1

Data: 28/09/2026. Revisão individual, sem aprovação de outro colaborador.

## Problemas e correções

- Dois novos testes reproduziram a perda de foco antes da correção: mudança entre desktop/celular e fechamento do submenu durante redimensionamento. Após a correção, o foco permanece em um controle visível; foco externo ao menu é preservado.
- A seta do submenu foi aproximada de Projetos sociais, com alvo de 44 × 44px. Capturas em desktop e celular foram inspecionadas durante o desenvolvimento; a abertura sem JavaScript foi verificada.
- O nome da ONG passou a levar ao início. Um link duplicado criado durante essa alteração foi detectado pelos testes e corrigido antes da integração final.
- A ordem final é Participe, Cadastro e Projetos sociais. Os testes das quatro páginas verificam essa ordem e o retorno ao início pelo nome da ONG.

## Execução

```bash
cd Experiencias-Praticas
npm ci
npx playwright install chromium
npm test
```

Resultado final: **32 passed**, com projetos desktop (1280 × 900) e celular (375 × 812), usando Chromium. A suíte verifica recursos, navegação, responsividade, formulários, persistência, templates e foco. As mudanças posteriores na branch de release são de documentação e número de versão.

## Limites

Não foi realizada auditoria completa de WCAG 2.1 AA, avaliação com leitor de tela nem teste em todos os navegadores. O resultado não certifica conformidade integral. Os relatórios W3C anteriores pertencem a versões anteriores da marcação. A aplicação continua multipágina, sem roteamento SPA.
