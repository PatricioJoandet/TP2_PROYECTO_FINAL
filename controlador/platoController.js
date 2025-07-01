import Servicio from "../servicio/platos.js";

class Controlador {
  #servicio;

  constructor() {
    this.#servicio = new Servicio();
  }

  obtenerPlatos = async (req, res) => {
    try {
      const { id } = req.params;
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
    const plato = req.body;
    const platoActualizado = await this.#servicio.updatePlato(id, plato);
    res
      .status(platoActualizado ? 200 : 404)
      .json(platoActualizado ? platoActualizado : {});
  };

  borrarPlato = async (req, res) => {
    const { id } = req.params;
    const platoEliminado = await this.#servicio.borrarPlato(id);
    res
      .status(platoEliminado ? 200 : 404)
      .json(platoEliminado ? platoEliminado : {});
  };

  obtenerEstadisticas = async (req, res) => {
    const { opcion } = req.params;
    const estadisticas = await this.#servicio.obtenerEstadisticas(opcion);
    res.json({ estadisticas });
  };
}

export default Controlador;
