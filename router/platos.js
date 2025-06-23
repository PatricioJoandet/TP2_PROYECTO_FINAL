import express from "express";
import Controlador from "../controlador/platoController.js";

class Router {
  #controlador;

  constructor() {
    this.#controlador = new Controlador();
  }

  start() {
    const router = express.Router();

    router.post("/", this.#controlador.guardarPlato);
    router.get("/recomendacion", this.#controlador.obtenerPlatosPorTemperatura);
    router.get("/:id?", this.#controlador.obtenerPlatos);
    router.put("/:id", this.#controlador.updatePlato);
    router.delete("/:id", this.#controlador.borrarPlato);

    return router;
  }
}

export default Router;
