import PedidosMongo from "../model/DAO/pedidosMongoDB.js";
import { validar } from "./validaciones/pedidos.js";
import enviarMail from "./helpers/emailHelper.js";

class Servicio {
  #model;

  constructor() {
    this.#model = PedidosMongo;
  }

  obtenerPedidos = async (id) => {
    if (id) {
      const pedido = await this.#model.obtenerPedido(id);
      return pedido;
    } else {
      const pedidos = await this.#model.obtenerPedidos();
      return pedidos;
    }
  };

  obtenerPedidosPorUsuario = async (usuarioId) => {
    return await this.#model.obtenerPedidosPorUsuario(usuarioId);
  };

  guardarPedido = async (pedido) => {
    const res = validar(pedido);
    if (res.result) {
      const pedidoGuardado = await this.#model.guardarPedido(pedido);
      return pedidoGuardado;
    } else {
      //console.log(res.error)
      throw new Error(res.error.details[0].message);
    }
  };

  actualizarPedido = async (id, pedido) => {
    const pedidoActualizado = await this.#model.actualizarPedido(id, pedido);
    return pedidoActualizado;
  };

  enviarPedido = async (id) => {
    const pedido = await this.#model.obtenerPedido(id);
    if (!pedido) {
      throw new Error(`Pedido con id ${id} no encontrado`);
    } else if (pedido.estado === "enviado") {
      throw new Error(`Pedido con id ${id} ya ha sido enviado`);
    }
    pedido.estado = "enviado";
    const pedidoEnviado = await this.#model.actualizarPedido(id, pedido);
    enviarMail(pedidoEnviado.usuario, pedidoEnviado);
    return pedidoEnviado;
  };

  enviarPedidoTest = async () => {
    await enviarMail();
  };

  borrarPedido = async (id) => {
    const pedidoEliminado = await this.#model.borrarPedido(id);
    return pedidoEliminado;
  };

  obtenerEstadisticas = async (opcion) => {
    const pedidos = await this.#model.obtenerPedidos();
    switch (opcion) {
      case "cantidad":
        return { cantidad: pedidos.length };

      case "avg-precio":
        return {
          "precio promedio": +(
            pedidos.reduce((acc, p) => acc + p.precio, 0) / pedidos.length
          ).toFixed(2),
        };

      case "min-precio":
        return {
          "precio mínimo": +Math.min(...pedidos.map((p) => p.precio)).toFixed(
            2
          ),
        };

      case "max-precio":
        return {
          "precio máximo": +Math.max(...pedidos.map((p) => p.precio)).toFixed(
            2
          ),
        };

      default:
        return { error: `opción estadistica '${opcion}' no soportada` };
    }
  };
}

export default Servicio;
