import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const enviarMail = async () => {
  const mailConfig = {
    from: `"Restaurante" <${process.env.EMAIL}>`,
    to: "patriciojoandet@gmail.com",
    subject: `Tu pedido está en camino`,
    html: "TEST",
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
