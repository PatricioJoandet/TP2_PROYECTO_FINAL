import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const enviarMail = async (pedido, pdf) => {
  try {
    const mailConfig = {
      from: `"Restaurante" <${process.env.EMAIL}>`,
      to: pedido.email,
      subject: `Tu pedido está en camino! 🛵`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">¡Tu pedido está en camino!</h2>
          
          <p>Hola,</p>
          
          <p>Tu pedido con ID: <strong>${
            pedido._id
          }</strong> ha sido enviado y está en camino 🛵</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Resumen del pedido:</h3>
            ${pedido.platos
              .map(
                (plato) =>
                  `<p style="margin: 5px 0;">• ${plato.nombre} - Cantidad: ${plato.cantidad}</p>`
              )
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
          content: pdf,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailConfig);
    console.log("Email con PDF enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw new Error("No se pudo enviar el email de confirmación");
  }
};

export default enviarMail;
