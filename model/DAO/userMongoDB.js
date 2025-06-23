import CnxMongoDB from "../DBMongo.js";
import { UserModel } from "./models/user.js";

class ModelMongoDB {
  constructor() {}

  obtenerUsuarios = async () => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");
    const usuarios = await UserModel.find();
    return usuarios;
  };

  obtenerUsuario = async (id) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");
    const usuario = await UserModel.findOne({ _id: id });
    return usuario;
  };

  guardarUsuario = async (usuario) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");

    const usuarioModel = new UserModel(usuario);
    const usuarioGuardado = await usuarioModel.save();
    return usuarioGuardado;
  };

  actualizarUsuario = async (id, usuario) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");

    await UserModel.updateOne({ _id: id }, { $set: usuario });
    const usuarioActualizado = await this.obtenerUsuario(id);
    return usuarioActualizado;
  };

  borrarUsuario = async (id) => {
    if (!CnxMongoDB.connectionOK) throw new Error("ERROR CNX BASE DE DATOS!!!");

    const usuarioBorrado = await this.obtenerUsuario(id);
    await UserModel.deleteOne({ _id: id });
    return usuarioBorrado;
  };
}

export default ModelMongoDB;
