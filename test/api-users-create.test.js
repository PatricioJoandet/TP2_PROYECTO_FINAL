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
  })
})
