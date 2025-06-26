import { faker } from "@faker-js/faker/locale/es"

// Generador que crea pedidos con platos aleatorios de una lista
class GeneradorPedido {
  constructor(platosDisponibles = []) {
    this.platos = platosDisponibles
  }

  // Actualizar lista de platos disponibles
  setPlatosDisponibles(platos) {
    this.platos = platos
  }

  // Generar pedido con platos aleatorios
  get(usuarioId) {
    if (this.platos.length === 0) {
      throw new Error("No hay platos disponibles para generar pedido")
    }

    // Elegir entre 1 y 3 platos diferentes
    const cantidadTiposPlatos = faker.number.int({
      min: 1,
      max: Math.min(3, this.platos.length),
    })

    const platosElegidos = faker.helpers.arrayElements(this.platos, cantidadTiposPlatos)

    return {
      usuario: usuarioId,
      platos: platosElegidos.map((plato) => ({
        plato: plato._id,
        cantidad: faker.number.int({ min: 1, max: 3 }),
      })),
    }
  }

  // Generar pedido grande (más platos)
  getPedidoGrande(usuarioId) {
    const cantidadTiposPlatos = faker.number.int({
      min: 3,
      max: Math.min(5, this.platos.length),
    })

    const platosElegidos = faker.helpers.arrayElements(this.platos, cantidadTiposPlatos)

    return {
      usuario: usuarioId,
      platos: platosElegidos.map((plato) => ({
        plato: plato._id,
        cantidad: faker.number.int({ min: 2, max: 5 }),
      })),
    }
  }
}

export default GeneradorPedido
