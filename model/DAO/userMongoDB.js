import CnxMongoDB from "../DBMongo.js";
import { UserModel } from "./models/user.js";

class ModelMongoDB {
  constructor() {}

  obtenerProductos = async () => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");
    const productos = await ProductoModel.find();
    return productos;
  };

  obtenerProducto = async (id) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");
    const producto = await ProductoModel.findOne({ _id: id });
    return producto;
  };

  guardarProducto = async (producto) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");

    const productoModel = new ProductoModel(producto);
    const productoGuardado = await productoModel.save();
    return productoGuardado;
  };

  actualizarProducto = async (id, producto) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");

    await ProductoModel.updateOne({ _id: id }, { $set: producto });
    const productoActualizado = await this.obtenerProducto(id);
    return productoActualizado;
  };

  borrarProducto = async (id) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");

    const productoBorrado = await this.obtenerProducto(id);
    await ProductoModel.deleteOne({ _id: id });
    return productoBorrado;
  };
}

export default ModelMongoDB;
