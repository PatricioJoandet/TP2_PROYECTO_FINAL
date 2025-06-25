import axios from "axios"

const testMatisPedido = async () => {
  try {
    console.log("🍕 Creando pedido para Matias Esquivel...")

    // 1. Crear pedido para mi usuario
    const pedidoResponse = await axios.post("http://localhost:8080/api/pedidos", {
      usuario: "685c5280ff2b45316c200475",
      platos: [
        { plato: "6856d08b80fdb38c466ef887", cantidad: 2 }, // Papas fritas
        { plato: "6858a4e3cc137084c40070b2", cantidad: 1 }, // Ensalada César
      ],
    })

    const pedido = pedidoResponse.data
    console.log("✅ Pedido creado:", pedido._id)
    console.log("👤 Cliente:", pedido.email)
    console.log("💰 Total:", pedido.total)
    console.log("📋 Platos:")
    pedido.platos.forEach((plato) => {
      console.log(`   - ${plato.nombre} x${plato.cantidad} = $${plato.precio * plato.cantidad}`)
    })

    // 2. Enviar pedido (genera PDF + email)
    console.log("\n📤 Enviando pedido a Springfield...")
    const envioResponse = await axios.patch(`http://localhost:8080/api/pedidos/enviar/${pedido._id}`)

    console.log("✅ ¡Email con PDF enviado! 🍩")
    console.log("📧 Destinatario:", envioResponse.data.email)
    console.log("🏠 Dirección:", "Calle Falsa 123")

    console.log("\n🎉 ¡Matias recibirá su pedido con PDF adjunto!")
    console.log("📄 Archivo PDF: pedido-" + pedido._id + ".pdf")
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message)
  }
}

testMatisPedido()
