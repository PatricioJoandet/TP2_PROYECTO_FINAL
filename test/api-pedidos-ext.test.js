import { expect } from "chai"
import supertest from "supertest"
import generadorUsuario from "./generador/users.js"
import generadorPlato from "./generador/plato.js"
import GeneradorPedido from "./generador/pedidos.js"

const request = supertest("http://localhost:8080")

describe("*** TEST API PEDIDOS (externo) ***", () => {
  let usuario, plato, generadorPedido

  before(async () => {
    const usuarioResponse = await request.post("/api/users").send(generadorUsuario.get())
    usuario = usuarioResponse.body

    const platoResponse = await request.post("/api/platos").send(generadorPlato.get())
    plato = platoResponse.body

    generadorPedido = new GeneradorPedido([plato])
  })

  describe("GET", () => {
    it("debería retornar status 200", async () => {
      const response = await request.get("/api/pedidos")
      expect(response.status).to.eql(200)
    })

    it("debería retornar un array de pedidos", async () => {
      const response = await request.get("/api/pedidos")
      expect(response.status).to.eql(200)
      expect(response.body).to.be.an("array")
    })

    it("debería obtener estadísticas", async () => {
      const response = await request.get("/api/pedidos/estadisticas")
      expect(response.status).to.eql(200)
      expect(response.body).to.have.property("estadisticas")
      expect(response.body.estadisticas).to.include.keys(
        "cantidad pedidos",
        "precio promedio",
        "precio mínimo",
        "precio máximo",
      )
    })
  })

  describe("POST", () => {
    it("debería crear un pedido válido", async () => {
      const pedido = generadorPedido.get(usuario._id)

      const response = await request.post("/api/pedidos").send(pedido)
      expect(response.status).to.eql(200)

      const pedidoGuardado = response.body
      expect(pedidoGuardado).to.include.keys("usuario", "email", "platos", "total", "estado", "_id")
      expect(pedidoGuardado.usuario).to.eql(usuario._id)
      expect(pedidoGuardado.email).to.eql(usuario.email)
      expect(pedidoGuardado.estado).to.eql("preparando")
      expect(pedidoGuardado.total).to.be.a("number")
      expect(pedidoGuardado.total).to.be.greaterThan(0)
    })

    it("debería fallar con pedido vacío", async () => {
      const response = await request.post("/api/pedidos").send({})
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })

    it("debería fallar con usuario inexistente", async () => {
      const pedido = {
        usuario: "507f1f77bcf86cd799439011",
        platos: [{ plato: plato._id, cantidad: 1 }],
      }

      const response = await request.post("/api/pedidos").send(pedido)
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })
  })

  describe("PATCH", () => {
    it("debería enviar un pedido", async () => {
      // Crear pedido
      const pedido = generadorPedido.get(usuario._id)
      const createResponse = await request.post("/api/pedidos").send(pedido)
      const pedidoCreado = createResponse.body

      // Enviar pedido
      const enviarResponse = await request.patch(`/api/pedidos/enviar/${pedidoCreado._id}`)
      expect(enviarResponse.status).to.eql(200)
      expect(enviarResponse.body.estado).to.eql("enviado")
    })

    it("debería fallar al enviar pedido ya enviado", async () => {
      // Crear y enviar pedido
      const pedido = generadorPedido.get(usuario._id)
      const createResponse = await request.post("/api/pedidos").send(pedido)
      const pedidoCreado = createResponse.body

      await request.patch(`/api/pedidos/enviar/${pedidoCreado._id}`)

      // Intentar enviar nuevamente
      const response = await request.patch(`/api/pedidos/enviar/${pedidoCreado._id}`)
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })
  })

  describe("PUT", () => {
    it("debería actualizar un pedido existente", async () => {
      // Crear pedido
      const pedido = generadorPedido.get(usuario._id)
      const createResponse = await request.post("/api/pedidos").send(pedido)
      const pedidoCreado = createResponse.body

      // Actualizar pedido
      const pedidoActualizado = {
        platos: [{ plato: plato._id, cantidad: 5 }],
      }
      const updateResponse = await request.put(`/api/pedidos/${pedidoCreado._id}`).send(pedidoActualizado)

      expect(updateResponse.status).to.eql(200)
      expect(updateResponse.body.platos[0].cantidad).to.eql(5)
    })
  })

  describe("DELETE", () => {
    it("debería eliminar un pedido existente", async () => {
      // Crear pedido
      const pedido = generadorPedido.get(usuario._id)
      const createResponse = await request.post("/api/pedidos").send(pedido)
      const pedidoCreado = createResponse.body

      // Eliminar pedido
      const deleteResponse = await request.delete(`/api/pedidos/${pedidoCreado._id}`)
      expect(deleteResponse.status).to.eql(200)
      expect(deleteResponse.body._id).to.eql(pedidoCreado._id)
    })
  })
})
