const implemented = true;

const MS_POR_DIA = 86400000;

function paraDiaUTC(valor, campo) {
  if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    throw new Error(`${campo} deve ser uma data no formato YYYY-MM-DD.`);
  }
  const [ano, mes, dia] = valor.split('-').map(Number);
  const t = Date.UTC(ano, mes - 1, dia);
  const dt = new Date(t);
  if (
    dt.getUTCFullYear() !== ano ||
    dt.getUTCMonth() !== mes - 1 ||
    dt.getUTCDate() !== dia
  ) {
    throw new Error(`${campo} não é uma data válida.`);
  }
  return t;
}

/**
 * Feature 30 - Calculadora de dias até uma data.
 * diasRestantes = dataAlvo - referencia (em dias), preservando o sinal:
 * positivo se a data-alvo é futura, 0 se igual, negativo se passada.
 * Não usa o relógio do sistema: a referência é sempre informada.
 */
function execute(input) {
  if (input === null || typeof input !== 'object') {
    throw new Error('Informe um objeto com dataAlvo e referencia.');
  }
  const alvo = paraDiaUTC(input.dataAlvo, 'dataAlvo');
  const ref = paraDiaUTC(input.referencia, 'referencia');
  return { diasRestantes: Math.round((alvo - ref) / MS_POR_DIA) };
}

module.exports = {
  id: 30,
  name: 'Calculadora de dias até uma data',
  description:
    'Calcula quantos dias faltam entre uma data de referência e uma data-alvo.',
  implemented,
  execute,
};
