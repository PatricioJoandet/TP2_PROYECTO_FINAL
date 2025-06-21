import express from "express";
import Controlador from "../controlador/pedidoController.js";

class Router {
  #controlador;

  constructor(persistencia) {
    this.#controlador = new Controlador(persistencia);
  }

  start() {
    const router = express.Router();

    router.get("/test", this.#controlador.enviarPedidoTest);
    // router.get("/:id?", this.#controlador.obtenerPedidos);
    // router.post("/", this.#controlador.guardarPedido);
    // router.put("/:id", this.#controlador.enviarPedido);
    // router.put("/id", this.#controlador.actualizarPedido);
    router.delete("/:id", this.#controlador.borrarPedido);

    // router.get("/estadisticas/:opcion", this.#controlador.obtenerEstadisticas);

    return router;
  }
}

export default Router;
