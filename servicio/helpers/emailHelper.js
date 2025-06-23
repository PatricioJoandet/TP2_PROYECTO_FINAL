import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const enviarMail = async (pedido) => {
  const mailConfig = {
    from: `"Restaurante" <${process.env.EMAIL}>`,
    to: pedido.email,
    subject: `Tu pedido está en camino!`,
    html: `Tu pedido con ID: <strong>${
      pedido._id
    }</strong> ha sido enviado y está en camino🛵. <br>
            Detalles del pedido: <br>
            ${pedido.platos
              .map(
                (plato) =>
                  `<p>${plato.nombre} - Cantidad: ${plato.cantidad}</p>`
              )
              .join("")}
            Total: <strong>$${pedido.total}</strong> <br>
            <br>¡Gracias por tu compra!`,
  };

  try {
    await transporter.sendMail(mailConfig);
    console.log("Email enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw new Error("No se pudo enviar el email de confirmación");
  }
};

export default enviarMail;
