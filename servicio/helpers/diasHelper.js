const diasSemana = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const calcularDiaPedidos = (pedidos) => {
  const pedidosPorDia = {};

  for (const p of pedidos) {
    const diaSemana = diasSemana[p.fechaPedido.getDay()];

    pedidosPorDia[diaSemana] = (pedidosPorDia[diaSemana] || 0) + 1;
  }

  let diaMax;
  let cantMax = 0;
  for (const [dia, cantidad] of Object.entries(pedidosPorDia)) {
    if (cantidad > cantMax) {
      cantMax = cantidad;
      diaMax = dia;
    }
  }

  return {
    dia: diaMax,
    cantidad: cantMax,
  };
};

export default calcularDiaPedidos;
