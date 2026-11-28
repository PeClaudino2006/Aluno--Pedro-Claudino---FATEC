## Feature 30 – Calculadora de dias até uma data

Entrada: `{ "dataAlvo": "2026-12-31", "referencia": "2026-11-26" }` → Saída: `{ "diasRestantes": 35 }`

### Decisões técnicas
- Datas no formato ISO `YYYY-MM-DD`, validadas contra o calendário (ex.: `2026-02-30` é rejeitada).
- Cálculo em UTC (`Date.UTC`), sem fuso horário nem horário de verão.
- Sinal preservado: positivo (alvo futura), zero (mesma data), negativo (alvo passada).
- Não usa a data atual do sistema: a referência é sempre informada.

### Como executar
    npm install
    npm start          # http://localhost:3000
    npm test           # node --test
    npm run test:spec  # relatório detalhado
    npm run lint
    npm run test:smoke
    npm audit --audit-level=high

### Roteiro de testes manuais
1. `npm start` e abrir http://localhost:3000.
2. Abrir http://localhost:3000/health e confirmar `status: ok`.
3. Na interface, selecionar o cartão 30, carregar o exemplo e executar: esperar `diasRestantes = 35`.
4. API: `Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/features/30 -ContentType "application/json" -Body '{"dataAlvo":"2026-12-31","referencia":"2026-11-26"}'`.
5. Enviar `{"dataAlvo":"2026-02-30","referencia":"2026-02-01"}` e confirmar HTTP 400 com mensagem de erro.
6. Enviar alvo anterior à referência e confirmar valor negativo.