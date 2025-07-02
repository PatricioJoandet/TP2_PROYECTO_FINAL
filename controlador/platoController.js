import Servicio from "../servicio/platos.js";
import moongoose from "mongoose";

class Controlador {
  #servicio;

  constructor() {
    this.#servicio = new Servicio();
  }

  obtenerPlatos = async (req, res) => {
    try {
      const { id } = req.params;

      if (!moongoose.Types.ObjectId.isValid(id) && id) {
        return res.status(400).json({ error: "ID de plato inválido" });
      }
      const platos = await this.#servicio.obtenerPlatos(id);
      res.json(platos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerPlatosPorTemperatura = async (req, res) => {
    try {
      const platos = await this.#servicio.obtenerPlatosPorTemperatura();
      res.json(platos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  guardarPlato = async (req, res) => {
    try {
      const plato = req.body;
      if (!Object.keys(plato).length) throw new Error("El plato está vacío");

      const platoGuardado = await this.#servicio.guardarPlato(plato);
      res.json(platoGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updatePlato = async (req, res) => {
    const { id } = req.params;

    if (!moongoose.Types.ObjectId.isValid(id) && id) {
      return res.status(400).json({ error: "ID de plato inválido" });
    }

    try {
      const plato = req.body;
      if (!plato || Object.keys(plato).length === 0) {
        return res.status(400).json({ error: "El body no puede estar vacío" });
      }

      const platoActualizado = await this.#servicio.updatePlato(id, plato);

      res
        .status(platoActualizado ? 200 : 404)
        .json(
          platoActualizado ? platoActualizado : { error: "Plato no encontrado" }
        );
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  borrarPlato = async (req, res) => {
    const { id } = req.params;

    if (!moongoose.Types.ObjectId.isValid(id) && id) {
      return res.status(400).json({ error: "ID de plato inválido" });
    }

    const platoEliminado = await this.#servicio.borrarPlato(id);
    res
      .status(platoEliminado ? 200 : 404)
      .json(platoEliminado ? platoEliminado : {});
  };
}

export default Controlador;
