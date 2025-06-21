import Servicio from "../servicio/pedidos.js";

class Controlador {
  #servicio;

  constructor(persistencia) {
    this.#servicio = new Servicio(persistencia);
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
      const pedidos = await this.#servicio.ob(userId);
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
      //res.status(500).json({ error: error.details[0].message })
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

  enviarPedidoTest = async (req, res) => {
    try {
      await this.#servicio.enviarPedidoTest();
      res.status(200).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  enviarPedido = async (req, res) => {
    const { id } = req.params;
    const pedidoEnviado = await this.#servicio.enviarPedido(id);
    res
      .status(pedidoEnviado ? 200 : 404)
      .json(pedidoEnviado ? pedidoEnviado : {});
  };

  borrarPedido = async (req, res) => {
    const { id } = req.params;
    const pedidoEliminado = await this.#servicio.borrarPedido(id);
    res
      .status(pedidoEliminado ? 200 : 404)
      .json(pedidoEliminado ? pedidoEliminado : {});
  };

  obtenerEstadisticas = async (req, res) => {
    const { opcion } = req.params;
    const estadisticas = await this.#servicio.obtenerEstadisticas(opcion);
    res.json({ estadisticas });
  };
}

export default Controlador;
