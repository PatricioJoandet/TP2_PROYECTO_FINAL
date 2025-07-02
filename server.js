import express from "express";
import RouterPedidos from "./router/pedidos.js";
import RouterUsers from "./router/users.js";
import RouterPlatos from "./router/platos.js";

class Server {
  #port;

  constructor(port) {
    this.#port = port;
  }

  start() {
    // -----------------------------------------------
    //             APLICACIÓN EXPRESS
    // -----------------------------------------------
    const app = express();

    // -----------------------------------------------
    //            MIDDLEWARES EXPRESS
    // -----------------------------------------------
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // -----------------------------------------------
    //           API RESTful: pedidos
    // -----------------------------------------------
    app.use("/api/pedidos", new RouterPedidos().start());

    // -----------------------------------------------
    //           API RESTful: users
    // -----------------------------------------------
    app.use("/api/users", new RouterUsers().start());

    // -----------------------------------------------
    //           API RESTful: platos
    // -----------------------------------------------
    app.use("/api/platos", new RouterPlatos().start());

    // -----------------------------------------------
    //        LISTEN DEL SERVIDOR EXPRESS
    // -----------------------------------------------
    const PORT = this.#port;
    const server = app.listen(PORT, () =>
      console.log(`Servidor express escuchando en http://localhost:${PORT}`)
    );
    server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );
  }
}

export default Server;
