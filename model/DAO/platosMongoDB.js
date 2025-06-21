import CnxMongoDB from "../DBMongo.js";
import { PlatoModel } from "./models/plato.js";

class ModelMongoDB {
  constructor() {}

  obtenerPlatos = async () => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");
    const platos = await PlatoModel.find();
    return platos;
  };

  obtenerPlato = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");
    const plato = await PlatoModel.findOne({ _id: id });
    return plato;
  };

  obtenerPlatoPorCalorias = async (cal) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");
    const platos = await PlatoModel.find({ calorias: cal }); // esto es exactamente la cantidad.
    return platos;
  };

  guardarPlato = async (plato) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");

    const platoModel = new PlatoModel(plato);
    const platoGuardado = await platoModel.save();
    return platoGuardado;
  };

  updatePlato = async (id, plato) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");

    await PlatoModel.updateOne({ _id: id }, { $set: plato });
    const platoNuevo = await this.obtenerPlato(id);
    return platoNuevo;
  };

  borrarPlato = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");

    const platoEliminado = await this.obtenerPlato(id);
    await PlatoModel.deleteOne({ _id: id });
    return platoEliminado;
  };
}

export default ModelMongoDB;
