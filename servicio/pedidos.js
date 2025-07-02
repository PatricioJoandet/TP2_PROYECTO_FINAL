import PedidosMongo from "../model/DAO/pedidosMongoDB.js";
import platos from "./platos.js";
import users from "./users.js";
import { validarPedidoPost, validarPedidoPut } from "./validaciones/pedidos.js";
import enviarMail from "./helpers/emailHelper.js";
import generarPDFPedido from "./helpers/pdfHelper.js";
import calcularDiaPedidos from "./helpers/diasHelper.js";

class Servicio {
  #model;
  #userService;
  #platosService;

  constructor() {
    this.#model = new PedidosMongo();
    this.#platosService = new platos();
    this.#userService = new users();
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

  #calcularTotal = (platos) => {
    return platos.reduce(
      (total, plato) => total + plato.precio * plato.cantidad,
      0
    );
  };

  #validarUsuario = async (usuarioId) => {
    const usuario = await this.#userService.obtenerUsuarios(usuarioId);
    if (!usuario) {
      throw new Error(`Usuario con id ${usuarioId} no encontrado`);
    }
    return usuario;
  };

  #procesarPlatos = async (platos) => {
    const platosFinal = [];
    for (const p of platos) {
      const plato = await this.#platosService.obtenerPlatos(p.plato);
      if (!plato) {
        throw new Error(`Plato con id ${p.id} no encontrado`);
      }
      platosFinal.push({
        _id: plato._id,
        nombre: plato.nombre,
        precio: plato.precio,
        cantidad: p.cantidad,
      });
    }
    return platosFinal;
  };

  guardarPedido = async (pedido) => {
    const res = validarPedidoPost(pedido);
    if (res.result) {
      const usuario = await this.#validarUsuario(pedido.usuario);
      const platosFinal = await this.#procesarPlatos(pedido.platos);

      pedido.platos = platosFinal;
      pedido.email = usuario.email;
      pedido.total = this.#calcularTotal(pedido.platos);

      return await this.#model.guardarPedido(pedido);
    } else {
      throw new Error(res.error.details[0].message);
    }
  };

  actualizarPedido = async (id, pedido) => {
    const pedidoExistente = await this.#model.obtenerPedido(id);
    if (!pedidoExistente) {
      throw new Error(`Pedido con id ${id} no encontrado`);
    }

    if (pedido.usuario) {
      const usuario = await this.#validarUsuario(pedido.usuario);
      pedido.email = usuario.email;
    }

    const res = validarPedidoPut(pedido);
    if (!res.result) {
      throw new Error(res.error.details[0].message);
    }

    if (pedido.platos) {
      const platosFinal = await this.#procesarPlatos(pedido.platos);
      pedido.platos = platosFinal;

      pedido.total = this.#calcularTotal(pedido.platos);
    }

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
    const pdf = await generarPDFPedido(pedidoEnviado);
    enviarMail(pedidoEnviado, pdf);
    return pedidoEnviado;
  };

  borrarPedido = async (id) => {
    const pedidoEliminado = await this.#model.borrarPedido(id);
    return pedidoEliminado;
  };

  estadisticas = async () => {
    const pedidos = await this.#model.obtenerPedidos();

    let total = 0;
    let totalPlatos = 0;
    let minPrecio = Infinity;
    let maxPrecio = -Infinity;

    for (const p of pedidos) {
      if (p.total < minPrecio) {
        minPrecio = p.total;
      }

      if (p.total > maxPrecio) {
        maxPrecio = p.total;
      }

      const platosEnPedido = p.platos.reduce(
        (sum, plato) => sum + plato.cantidad,
        0
      );

      total += p.total;
      totalPlatos += platosEnPedido;
    }
    let promedioPlatos = totalPlatos / pedidos.length;
    let promedioPrecio = total / pedidos.length;
    let dia = calcularDiaPedidos(pedidos);
    return {
      "cantidad pedidos": pedidos.length,
      "precio promedio": +promedioPrecio.toFixed(2),
      "precio mínimo": +minPrecio.toFixed(2),
      "precio máximo": +maxPrecio.toFixed(2),
      "platos promedio por pedido": +promedioPlatos.toFixed(2),
      "dia mayor pedidos": dia,
    };
  };
}

export default Servicio;
