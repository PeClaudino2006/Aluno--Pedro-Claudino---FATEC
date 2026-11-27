const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');

const PORT = process.env.PORT || '3000';
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(tentativas = 30) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const res = await fetch(`${BASE}/health`);
      if (res.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error('Servidor não respondeu em /health');
}

async function main() {
  const server = spawn('node', ['src/server.js'], {
    stdio: 'inherit',
    env: { ...process.env, PORT },
  });
  try {
    await waitForServer();

    const health = await (await fetch(`${BASE}/health`)).json();
    assert.equal(health.status, 'ok');

    const lista = await fetch(`${BASE}/api/features`);
    assert.equal(lista.status, 200);

    const res = await fetch(`${BASE}/api/features/30`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataAlvo: '2026-12-31',
        referencia: '2026-11-26',
      }),
    });
    assert.equal(res.status, 200);
    const corpo = await res.json();
    assert.equal(corpo.result.diasRestantes, 35);

    const invalido = await fetch(`${BASE}/api/features/30`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataAlvo: 'invalida', referencia: '2026-11-26' }),
    });
    assert.equal(invalido.status, 400);

    console.log('Smoke test OK');
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
