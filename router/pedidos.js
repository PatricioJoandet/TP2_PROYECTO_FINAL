import express from 'express'
import Controlador from '../controlador/pedidoController.js'


class Router {
    #controlador

    constructor(persistencia) {
        this.#controlador = new Controlador(persistencia)
    }

    start() {    
        const router = express.Router()

        router.get('/:id?', this.#controlador.obtenerProductos)
        router.post('/', this.#controlador.guardarProducto)
        router.put('/:id', this.#controlador.actualizarProducto)
        router.delete('/:id', this.#controlador.borrarProducto)

        router.get('/estadisticas/:opcion', this.#controlador.obtenerEstadisticas)

        return router
    }
}

export default Router