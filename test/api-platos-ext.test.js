import { expect } from "chai"
import supertest from "supertest"
import generador from "./generador/plato.js"

const request = supertest("http://localhost:8080")

describe("*** TEST API PLATOS (externo) ***", () => {
  describe("GET", () => {
    it("debería retornar status 200", async () => {
      const response = await request.get("/api/platos")
      expect(response.status).to.eql(200)
    })

    it("debería retornar un array de platos", async () => {
      const response = await request.get("/api/platos")
      expect(response.status).to.eql(200)
      expect(response.body).to.be.an("array")
    })

    it("debería obtener recomendaciones por temperatura", async () => {
      const response = await request.get("/api/platos/recomendacion")
      expect(response.status).to.eql(200)
      expect(response.body).to.be.an("array")
    })
  })

  describe("POST", () => {
    it("debería crear un plato válido", async () => {
      const plato = generador.get()

      const response = await request.post("/api/platos").send(plato)
      expect(response.status).to.eql(200)

      const platoGuardado = response.body
      expect(platoGuardado).to.include.keys("nombre", "precio", "calorias", "ingredientes", "_id")
      expect(platoGuardado.nombre).to.eql(plato.nombre)
      expect(platoGuardado.precio).to.eql(plato.precio)
      expect(platoGuardado.calorias).to.eql(plato.calorias)
      expect(platoGuardado.ingredientes).to.deep.eql(plato.ingredientes)
    })

    it("debería fallar con plato vacío", async () => {
      const response = await request.post("/api/platos").send({})
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })

    it("debería fallar con precio negativo", async () => {
      const plato = { ...generador.get(), precio: -100 }

      const response = await request.post("/api/platos").send(plato)
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })
  })

  describe("PUT", () => {
    it("debería actualizar un plato existente", async () => {
      // Primero crear un plato
      const platoOriginal = generador.get()
      const createResponse = await request.post("/api/platos").send(platoOriginal)
      const platoCreado = createResponse.body

      // Luego actualizarlo
      const platoActualizado = { nombre: "Plato Actualizado", precio: 999 }
      const updateResponse = await request.put(`/api/platos/${platoCreado._id}`).send(platoActualizado)

      expect(updateResponse.status).to.eql(200)
      expect(updateResponse.body.nombre).to.eql("Plato Actualizado")
      expect(updateResponse.body.precio).to.eql(999)
    })

    it("debería fallar con ID inválido", async () => {
      const response = await request.put("/api/platos/invalid-id").send({ nombre: "Test" })
      expect(response.status).to.eql(400)
      expect(response.body).to.have.property("error")
    })
  })

  describe("DELETE", () => {
    it("debería eliminar un plato existente", async () => {
      // Crear un plato
      const plato = generador.get()
      const createResponse = await request.post("/api/platos").send(plato)
      const platoCreado = createResponse.body

      // Eliminarlo
      const deleteResponse = await request.delete(`/api/platos/${platoCreado._id}`)
      expect(deleteResponse.status).to.eql(200)
      expect(deleteResponse.body._id).to.eql(platoCreado._id)
    })

    it("debería retornar 404 para plato inexistente", async () => {
      const response = await request.delete("/api/platos/507f1f77bcf86cd799439011")
      expect(response.status).to.eql(404)
    })
  })
})
