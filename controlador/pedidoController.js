import Servicio from "../servicio/pedidos.js";

class Controlador {
  #servicio;

  constructor() {
    this.#servicio = new Servicio();
  }

  obtenerPedidos = async (req, res) => {
    try {
      const { id } = req.params;
      const pedidos = await this.#servicio.obtenerPedidos(id);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerPedidoUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const pedidos = await this.#servicio.obtenerPedidosPorUsuario(userId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  guardarPedido = async (req, res) => {
    try {
      const pedido = req.body;
      if (!Object.keys(pedido).length) throw new Error("El pedido está vacío");
      const pedidoGuardado = await this.#servicio.guardarPedido(pedido);
      res.json(pedidoGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const pedido = req.body;
    const pedidoActualizado = await this.#servicio.actualizarPedido(id, pedido);
    res
      .status(pedidoActualizado ? 200 : 404)
      .json(pedidoActualizado ? pedidoActualizado : {});
  };

  enviarPedido = async (req, res) => {
    try {
      const { id } = req.params;
      const pedidoEnviado = await this.#servicio.enviarPedido(id);
      res
        .status(pedidoEnviado ? 200 : 404)
        .json(pedidoEnviado ? pedidoEnviado : {});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  borrarPedido = async (req, res) => {
    const { id } = req.params;
    const pedidoEliminado = await this.#servicio.borrarPedido(id);
    res
      .status(pedidoEliminado ? 200 : 404)
      .json(pedidoEliminado ? pedidoEliminado : {});
  };

  estadisticas = async (req, res) => {
    const estadisticas = await this.#servicio.estadisticas();
    res.json({ estadisticas });
  };
}

export default Controlador;
