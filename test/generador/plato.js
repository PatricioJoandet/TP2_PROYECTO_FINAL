import { faker } from "@faker-js/faker/locale/es"

const get = () => ({
  nombre: faker.food.dish(),
  precio: faker.number.int({ min: 800, max: 4000 }),
  calorias: faker.number.int({ min: 200, max: 1200 }),
  ingredientes: faker.helpers.multiple(faker.food.ingredient, { count: { min: 3, max: 6 } }),
})

export default { get }
