import CnxMongoDB from "../DBMongo.js";
import { PedidoModel } from "./models/pedido.js";

class ModelMongoDB {
  constructor() {}

  obtenerPedidos = async () => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");
    const pedidos = await PedidoModel.find();
    return pedidos;
  };

  obtenerPedido = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");
    const pedido = await PedidoModel.findOne({ _id: id });
    return pedido;
  };

  obtenerPedidosPorUsuario = async (usuarioId) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");
    const pedidos = await PedidoModel.find({ usuario: usuarioId });
    return pedidos;
  };

  guardarPedido = async (pedido) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");

    const pedidoModel = new PedidoModel(pedido);
    const pedidoGuardado = await pedidoModel.save();
    return pedidoGuardado;
  };

  actualizarPedido = async (id, pedido) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");

    await PedidoModel.updateOne({ _id: id }, { $set: pedido });
    const pedidoActualizado = await this.obtenerPedido(id);
    return pedidoActualizado;
  };

  borrarPedido = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a la base de datos");

    const pedidoBorrado = await this.obtenerPedido(id);
    await PedidoModel.deleteOne({ _id: id });
    return pedidoBorrado;
  };
}

export default ModelMongoDB;
