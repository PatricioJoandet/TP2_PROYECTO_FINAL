import nodemailer from "nodemailer"
import PDFDocument from "pdfkit"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const generarPDFPedido = async (pedido) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 })
      const chunks = []

      // Capturar el PDF en memoria
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Header del documento
      doc.fontSize(20).fillColor("#2c3e50").text("RESUMEN DE PEDIDO", { align: "center" })

      doc.moveDown()

      // Información del pedido
      doc
        .fontSize(12)
        .fillColor("#34495e")
        .text(`ID del Pedido: ${pedido._id}`, { continued: true })
        .text(`Fecha: ${new Date(pedido.fechaPedido).toLocaleDateString("es-AR")}`, { align: "right" })

      doc.text(`Estado: ${pedido.estado.toUpperCase()}`).text(`Email: ${pedido.email}`)

      doc.moveDown()

      // Línea separadora
      doc.strokeColor("#bdc3c7").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke()

      doc.moveDown()

      // Título de platos
      doc.fontSize(16).fillColor("#2c3e50").text("DETALLE DE PLATOS", { underline: true })

      doc.moveDown()

      // Tabla de platos
      let yPosition = doc.y

      // Headers de la tabla
      doc
        .fontSize(10)
        .fillColor("#7f8c8d")
        .text("PLATO", 50, yPosition, { width: 200 })
        .text("CANTIDAD", 280, yPosition, { width: 80, align: "center" })
        .text("PRECIO UNIT.", 380, yPosition, { width: 80, align: "right" })
        .text("SUBTOTAL", 480, yPosition, { width: 80, align: "right" })

      yPosition += 20

      // Línea bajo headers
      doc.strokeColor("#bdc3c7").lineWidth(0.5).moveTo(50, yPosition).lineTo(550, yPosition).stroke()

      yPosition += 10

      // Datos de los platos
      doc.fontSize(9).fillColor("#2c3e50")

      pedido.platos.forEach((plato, index) => {
        const subtotal = plato.precio * plato.cantidad

        doc
          .text(plato.nombre, 50, yPosition, { width: 200 })
          .text(plato.cantidad.toString(), 280, yPosition, { width: 80, align: "center" })
          .text(`$${plato.precio.toFixed(2)}`, 380, yPosition, { width: 80, align: "right" })
          .text(`$${subtotal.toFixed(2)}`, 480, yPosition, { width: 80, align: "right" })

        yPosition += 15

        // Línea separadora cada 3 items
        if ((index + 1) % 3 === 0) {
          doc.strokeColor("#ecf0f1").lineWidth(0.3).moveTo(50, yPosition).lineTo(550, yPosition).stroke()
          yPosition += 5
        }
      })

      yPosition += 10

      // Línea antes del total
      doc.strokeColor("#34495e").lineWidth(1).moveTo(350, yPosition).lineTo(550, yPosition).stroke()

      yPosition += 15

      // Total
      doc
        .fontSize(14)
        .fillColor("#27ae60")
        .text(`TOTAL: $${pedido.total.toFixed(2)}`, 480, yPosition, {
          width: 80,
          align: "right",
          underline: true,
        })

      // Footer
      doc
        .fontSize(8)
        .fillColor("#95a5a6")
        .text("¡Gracias por tu compra! 🍽️", 50, doc.page.height - 100, {
          align: "center",
          width: doc.page.width - 100,
        })
        .text("Restaurante - Sistema de Pedidos Online", { align: "center" })

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

const enviarMail = async (pedido) => {
  try {
    // Generar PDF
    const pdfBuffer = await generarPDFPedido(pedido)

    const mailConfig = {
      from: `"Restaurante" <${process.env.EMAIL}>`,
      to: pedido.email,
      subject: `Tu pedido está en camino! 🛵`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">¡Tu pedido está en camino!</h2>
          
          <p>Hola,</p>
          
          <p>Tu pedido con ID: <strong>${pedido._id}</strong> ha sido enviado y está en camino 🛵</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Resumen del pedido:</h3>
            ${pedido.platos
              .map((plato) => `<p style="margin: 5px 0;">• ${plato.nombre} - Cantidad: ${plato.cantidad}</p>`)
              .join("")}
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 15px 0;">
            <p style="font-size: 18px; font-weight: bold; color: #28a745;">
              Total: $${pedido.total.toFixed(2)}
            </p>
          </div>
          
          <p><strong>📎 Adjunto encontrarás el resumen detallado en PDF</strong></p>
          
          <p style="color: #6c757d; font-size: 14px;">
            ¡Gracias por tu compra!<br>
            Equipo del Restaurante
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `pedido-${pedido._id}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    }

    await transporter.sendMail(mailConfig)
    console.log("Email con PDF enviado exitosamente")
  } catch (error) {
    console.error("Error al enviar el email:", error)
    throw new Error("No se pudo enviar el email de confirmación")
  }
}

export default enviarMail
