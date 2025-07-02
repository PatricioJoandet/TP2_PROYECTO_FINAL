import PlatosMongo from "../model/DAO/platosMongoDB.js";
import obtenerClima from "./helpers/climaHelper.js";
import { validarPlatoPost, validarPlatoPut } from "./validaciones/platos.js";

class Servicio {
  #model;

  constructor() {
    this.#model = new PlatosMongo();
  }

  obtenerPlatos = async (id) => {
    if (id) {
      const plato = await this.#model.obtenerPlato(id);
      return plato;
    } else {
      const platos = await this.#model.obtenerPlatos();
      return platos;
    }
  };

  obtenerPlatosPorUsuario = async (usuarioId) => {
    return await this.#model.obtenerPlatosPorUsuario(usuarioId);
  };

  obtenerPlatosPorTemperatura = async () => {
    const temperatura = await obtenerClima();
    let platos = [];
    if (temperatura < 10) {
      platos = await this.#model.obtenerPlatoPorCalorias({ $gt: 600 });
    } else if (temperatura < 20) {
      platos = await this.#model.obtenerPlatoPorCalorias({
        $gte: 300,
        $lt: 600,
      });
    } else {
      platos = await this.#model.obtenerPlatoPorCalorias({ $lt: 300 });
    }
    return platos;
  };

  guardarPlato = async (plato) => {
    const res = validarPlatoPost(plato);
    if (res.result) {
      const platoGuardado = await this.#model.guardarPlato(plato);
      return platoGuardado;
    } else {
      throw new Error(res.error.details[0].message);
    }
  };

  updatePlato = async (id, plato) => {
    const res = validarPlatoPut(plato);
    if (res.result) {
      const platoActualizado = await this.#model.updatePlato(id, plato);
      return platoActualizado;
    } else {
      throw new Error(res.error.details[0].message);
    }
  };

  borrarPlato = async (id) => {
    const platoEliminado = await this.#model.borrarPlato(id);
    return platoEliminado;
  };
}

export default Servicio;
