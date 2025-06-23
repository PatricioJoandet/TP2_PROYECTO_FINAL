import express from "express";
import Controlador from "../controlador/pedidoController.js";

class Router {
  #controlador;

  constructor(persistencia) {
    this.#controlador = new Controlador(persistencia);
  }

  start() {
    const router = express.Router();

    router.get("/estadisticas", this.#controlador.estadisticas);
    router.get("/:id?", this.#controlador.obtenerPedidos);
    router.post("/", this.#controlador.guardarPedido);
    router.patch("/enviar/:id", this.#controlador.enviarPedido);
    router.put("/:id", this.#controlador.actualizarPedido);
    router.delete("/:id", this.#controlador.borrarPedido);

    return router;
  }
}

export default Router;
