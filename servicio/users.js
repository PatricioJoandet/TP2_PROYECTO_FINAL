import UserMongo from "../model/DAO/userMongoDB.js";
import { validar } from "./validaciones/users.js";

class Servicio {
  #model;

  constructor() {
    this.#model = new UserMongo();
  }

  obtenerUsuarios = async (id) => {
    if (id) {
      const usuario = await this.#model.obtenerUsuario(id);
      return usuario;
    } else {
      const usuarios = await this.#model.obtenerUsuarios();
      return usuarios;
    }
  };

  guardarUsuario = async (usuario) => {
    const res = validar(usuario);
    if (res.result) {
      const usuarioGuardado = await this.#model.guardarUsuario(usuario);
      return usuarioGuardado;
    } else {
      throw new Error(res.error.details[0].message);
    }
  };

  actualizarUsuario = async (id, usuario) => {
    const usuarioActualizado = await this.#model.actualizarUsuario(id, usuario);
    return usuarioActualizado;
  };

  borrarUsuario = async (id) => {
    const usuarioEliminado = await this.#model.borrarUsuario(id);
    return usuarioEliminado;
  };
}

export default Servicio;
