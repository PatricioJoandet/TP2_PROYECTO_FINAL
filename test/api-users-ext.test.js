import { expect } from "chai"
import supertest from "supertest"
import generador from "./generador/users.js"

const request = supertest("http://localhost:8080")

describe("*** TEST API USERS (externo) ***", () => {
  describe("GET", () => {
    it("debería retornar status 200", async () => {
      const response = await request.get("/api/users")
      expect(response.status).to.eql(200)
    })

    it("debería retornar un array de usuarios", async () => {
      const response = await request.get("/api/users")
      expect(response.status).to.eql(200)
      expect(response.body).to.be.an("array")
    })
  })

  describe("POST", () => {
    it("debería crear un usuario válido", async () => {
      const usuario = generador.get()

      const response = await request.post("/api/users").send(usuario)
      expect(response.status).to.eql(200)

      const usuarioGuardado = response.body
      expect(usuarioGuardado).to.include.keys("nombre", "email", "telefono", "direccion", "_id")
      expect(usuarioGuardado.nombre).to.eql(usuario.nombre)
      expect(usuarioGuardado.email).to.eql(usuario.email)
      expect(usuarioGuardado.telefono).to.eql(usuario.telefono)
      expect(usuarioGuardado.direccion).to.eql(usuario.direccion)
    })

    it("debería fallar con usuario vacío", async () => {
      const response = await request.post("/api/users").send({})
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })

    it("debería fallar con email inválido", async () => {
      const usuario = { ...generador.get(), email: "email-invalido" }

      const response = await request.post("/api/users").send(usuario)
      expect(response.status).to.eql(500)
      expect(response.body).to.have.property("error")
    })
  })

  describe("PUT", () => {
    it("debería actualizar un usuario existente", async () => {
      // Crear usuario
      const usuarioOriginal = generador.get()
      const createResponse = await request.post("/api/users").send(usuarioOriginal)
      const usuarioCreado = createResponse.body

      // Actualizar usuario
      const usuarioActualizado = { nombre: "Usuario Actualizado", telefono: "123456789" }
      const updateResponse = await request.put(`/api/users/${usuarioCreado._id}`).send(usuarioActualizado)

      expect(updateResponse.status).to.eql(200)
      expect(updateResponse.body.nombre).to.eql("Usuario Actualizado")
      expect(updateResponse.body.telefono).to.eql("123456789")
    })

    it("debería fallar con ID inválido", async () => {
      const response = await request.put("/api/users/invalid-id").send({ nombre: "Test" })
      expect(response.status).to.eql(400)
      expect(response.body).to.have.property("error")
    })
  })

  describe("DELETE", () => {
    it("debería eliminar un usuario existente", async () => {
      // Crear usuario
      const usuario = generador.get()
      const createResponse = await request.post("/api/users").send(usuario)
      const usuarioCreado = createResponse.body

      // Eliminar usuario
      const deleteResponse = await request.delete(`/api/users/${usuarioCreado._id}`)
      expect(deleteResponse.status).to.eql(200)
      expect(deleteResponse.body._id).to.eql(usuarioCreado._id)
    })

    it("debería retornar 404 para usuario inexistente", async () => {
      const response = await request.delete("/api/users/507f1f77bcf86cd799439011")
      expect(response.status).to.eql(404)
    })
  })
})
