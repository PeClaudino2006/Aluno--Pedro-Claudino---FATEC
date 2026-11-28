const test = require('node:test');
const assert = require('node:assert/strict');
const feature = require('../src/features/feature30');

test('caso de referência: data-alvo futura', () => {
  assert.equal(
    feature.execute({ dataAlvo: '2026-12-31', referencia: '2026-11-26' })
      .diasRestantes,
    35,
  );
});

test('mesma data retorna zero e data passada retorna negativo', () => {
  assert.equal(
    feature.execute({ dataAlvo: '2026-11-26', referencia: '2026-11-26' })
      .diasRestantes,
    0,
  );
  assert.equal(
    feature.execute({ dataAlvo: '2026-11-25', referencia: '2026-11-26' })
      .diasRestantes,
    -1,
  );
});

test('virada de ano e ano bissexto', () => {
  assert.equal(
    feature.execute({ dataAlvo: '2027-01-01', referencia: '2026-12-31' })
      .diasRestantes,
    1,
  );
  assert.equal(
    feature.execute({ dataAlvo: '2024-03-01', referencia: '2024-02-28' })
      .diasRestantes,
    2,
  );
  assert.equal(
    feature.execute({ dataAlvo: '2025-03-01', referencia: '2025-02-28' })
      .diasRestantes,
    1,
  );
});

test('rejeita data inválida, formato incorreto e tipos errados', () => {
  const invalidos = [
    { dataAlvo: '2026-02-30', referencia: '2026-02-01' },
    { dataAlvo: '2026-12-31', referencia: '2026-13-01' },
    { dataAlvo: '31/12/2026', referencia: '2026-11-26' },
    { dataAlvo: '2026-12-31' },
    { referencia: '2026-11-26' },
    { dataAlvo: 20261231, referencia: '2026-11-26' },
    { dataAlvo: '', referencia: '2026-11-26' },
  ];
  for (const input of invalidos) {
    assert.throws(() => feature.execute(input), { name: 'Error' });
  }
  assert.throws(() => feature.execute(null), { name: 'Error' });
  assert.throws(() => feature.execute(undefined), { name: 'Error' });
});

test('não modifica o objeto de entrada', () => {
  const entrada = { dataAlvo: '2026-12-31', referencia: '2026-11-26' };
  feature.execute(entrada);
  assert.deepEqual(entrada, {
    dataAlvo: '2026-12-31',
    referencia: '2026-11-26',
  });
});

test('contrato do módulo preservado', () => {
  assert.equal(feature.id, 30);
  assert.equal(feature.implemented, true);
  assert.equal(typeof feature.name, 'string');
  assert.equal(typeof feature.description, 'string');
});
