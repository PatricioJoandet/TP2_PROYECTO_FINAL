import { expect } from 'chai'
import generador from './generador/producto.js'


describe('*** TEST DEL GENERADOR DE PRODUCTO ***', () => {
    it('el producto debe contener los campos nombre, precio y stock', () => {
        const prod = generador.get()
        //console.log(prod)
        expect(prod).to.include.keys('nombre','precio','stock')
    })

    it('debería generar productos aleatorios', () => {
        const prod1 = generador.get()
        const prod2 = generador.get()

        expect(prod1.nombre).not.to.eql(prod2.nombre)
        expect(prod1.precio).not.to.eql(prod2.precio)
        expect(prod1.stock).not.to.eql(prod2.stock)
    })
})