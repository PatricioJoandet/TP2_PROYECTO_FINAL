import { faker } from "@faker-js/faker/locale/es"

const get = () => ({
  nombre: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  telefono: faker.phone.number(),
  direccion: `${faker.location.streetAddress()}, ${faker.location.city()}`,
})

export default { get }
