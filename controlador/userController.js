import Servicio from "../servicio/users.js";
import mongoose from "mongoose";

class Controlador {
  #servicio;

  constructor() {
    this.#servicio = new Servicio();
  }

  obtenerUsuarios = async (req, res) => {
    try {
      const { id } = req.params;

      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID de usuario inválido");
      }

      const usuario = await this.#servicio.obtenerUsuarios(id);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  guardarUsuario = async (req, res) => {
    try {
      const usuario = req.body;
      if (!Object.keys(usuario).length)
        throw new Error("El usuario está vacío");

      const usuarioGuardado = await this.#servicio.guardarUsuario(usuario);
      res.json(usuarioGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  actualizarUsuario = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    try {
      const usuario = req.body;

      if (!usuario || Object.keys(usuario).length === 0) {
        return res.status(400).json({ error: "El usuario está vacío" });
      }

      const usuarioActualizado = await this.#servicio.actualizarUsuario(
        id,
        usuario
      );

      res
        .status(usuarioActualizado ? 200 : 404)
        .json(
          usuarioActualizado
            ? usuarioActualizado
            : { error: "Usuario no encontrado" }
        );
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  borrarUsuario = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const usuarioEliminado = await this.#servicio.borrarUsuario(id);
    res
      .status(usuarioEliminado ? 200 : 404)
      .json(usuarioEliminado ? usuarioEliminado : {});
  };
}

export default Controlador;
