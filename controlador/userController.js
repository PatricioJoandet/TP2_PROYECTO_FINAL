import Servicio from "../servicio/users.js";

class Controlador {
  #servicio;

  constructor(persistencia) {
    this.#servicio = new Servicio(persistencia);
  }

  obtenerUsuarios = async (req, res) => {
    try {
      const { id } = req.params;
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
    const usuario = req.body;
    const usuarioActualizado = await this.#servicio.actualizarUsuario(
      id,
      usuario
    );
    res
      .status(usuarioActualizado ? 200 : 404)
      .json(usuarioActualizado ? usuarioActualizado : {});
  };

  borrarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioEliminado = await this.#servicio.borrarUsuario(id);
    res
      .status(usuarioEliminado ? 200 : 404)
      .json(usuarioEliminado ? usuarioEliminado : {});
  };
}

export default Controlador;
