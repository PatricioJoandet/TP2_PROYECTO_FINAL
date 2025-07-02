import UserMongo from "../model/DAO/userMongoDB.js";
import { validarUsuarioPost, validarUsuarioPut } from "./validaciones/users.js";

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
    const res = validarUsuarioPost(usuario);
    if (res.result) {
      const usuarioGuardado = await this.#model.guardarUsuario(usuario);
      return usuarioGuardado;
    } else {
      throw new Error(res.error.details[0].message);
    }
  };

  actualizarUsuario = async (id, usuario) => {
    let usuarioActualizado = {};

    if ("_id" in usuario) {
      delete usuario._id;
    }
    const res = validarUsuarioPut(usuario);

    if (res.result) {
      usuarioActualizado = await this.#model.actualizarUsuario(id, usuario);
    }

    return usuarioActualizado;
  };

  borrarUsuario = async (id) => {
    const usuarioEliminado = await this.#model.borrarUsuario(id);
    return usuarioEliminado;
  };
}

export default Servicio;
