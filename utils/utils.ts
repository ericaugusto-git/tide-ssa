export function padding(a: number, b?: number, c?: number, d?: number) {
    return {
      paddingTop: a,
      paddingRight: b !== undefined ? b : a,
      paddingBottom: c !== undefined ? c : a,
      paddingLeft: d !== undefined ? d : (b !== undefined ? b : a)
    }
  }

export function converterCorrentezaParaKmh(speed: number): string {
  return `${(speed * 3.6).toFixed(1)} km/h`;
}

export function classificarCorrenteza(speed: number): string {
  if (speed < 0.3) {
    return "fraca";
  } else if (speed < 0.7) {
    return "moderada";
  } else if (speed < 1.2) {
    return "forte";
  } else {
    return "muito forte";
  }
}

export function calcularFaseDaLua(date = new Date()) {
  const ano = date.getFullYear();
  const mes = date.getMonth() + 1; // JS começa em 0
  const dia = date.getDate();

  // Algoritmo baseado em John Conway (simplificado e bom o suficiente)
  let r = ano % 100;
  r %= 19;

  if (r > 9) {
    r -= 19;
  }

  r = ((r * 11) % 30) + mes + dia;

  if (mes < 3) {
    r += 2;
  }

  const fase = r < 0 ? r + 30 : r;
  const index = Math.floor((fase * 8) / 30) % 8;

  const fases = [
    "Lua Nova",
    "Crescente",
    "Quarto Crescente",
    "Crescente Gibosa",
    "Lua Cheia",
    "Minguante Gibosa",
    "Quarto Minguante",
    "Minguante"
  ];

  return fases[index];
}
