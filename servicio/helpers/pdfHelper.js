import PDFDocument from "pdfkit";

const generarPDFPedido = async (pedido) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc
        .fontSize(20)
        .fillColor("#2c3e50")
        .text("RESUMEN DE PEDIDO", { align: "center" });

      doc.moveDown();

      doc
        .fontSize(12)
        .fillColor("#34495e")
        .text(`ID del Pedido: ${pedido._id}`, { continued: true })
        .text(
          `Fecha: ${new Date(pedido.fechaPedido).toLocaleDateString("es-AR")}`,
          { align: "right" }
        );

      doc
        .text(`Estado: ${pedido.estado.toUpperCase()}`)
        .text(`Email: ${pedido.email}`);

      doc.moveDown();

      doc
        .strokeColor("#bdc3c7")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      doc
        .fontSize(16)
        .fillColor("#2c3e50")
        .text("DETALLE DE PLATOS", { underline: true });

      doc.moveDown();

      let yPosition = doc.y;

      doc
        .fontSize(10)
        .fillColor("#7f8c8d")
        .text("PLATO", 50, yPosition, { width: 200 })
        .text("CANTIDAD", 280, yPosition, { width: 80, align: "center" })
        .text("PRECIO UNIT.", 380, yPosition, { width: 80, align: "right" })
        .text("SUBTOTAL", 480, yPosition, { width: 80, align: "right" });

      yPosition += 20;

      doc
        .strokeColor("#bdc3c7")
        .lineWidth(0.5)
        .moveTo(50, yPosition)
        .lineTo(550, yPosition)
        .stroke();

      yPosition += 10;

      doc.fontSize(9).fillColor("#2c3e50");

      pedido.platos.forEach((plato, index) => {
        const subtotal = plato.precio * plato.cantidad;

        doc
          .text(plato.nombre, 50, yPosition, { width: 200 })
          .text(plato.cantidad.toString(), 280, yPosition, {
            width: 80,
            align: "center",
          })
          .text(`$${plato.precio.toFixed(2)}`, 380, yPosition, {
            width: 80,
            align: "right",
          })
          .text(`$${subtotal.toFixed(2)}`, 480, yPosition, {
            width: 80,
            align: "right",
          });

        yPosition += 15;

        if ((index + 1) % 3 === 0) {
          doc
            .strokeColor("#ecf0f1")
            .lineWidth(0.3)
            .moveTo(50, yPosition)
            .lineTo(550, yPosition)
            .stroke();
          yPosition += 5;
        }
      });

      yPosition += 10;

      doc
        .strokeColor("#34495e")
        .lineWidth(1)
        .moveTo(350, yPosition)
        .lineTo(550, yPosition)
        .stroke();

      yPosition += 15;

      doc
        .fontSize(14)
        .fillColor("#27ae60")
        .text(`TOTAL: $${pedido.total.toFixed(2)}`, 480, yPosition, {
          width: 80,
          align: "right",
          underline: true,
        });

      doc
        .fontSize(8)
        .fillColor("#95a5a6")
        .text("¡Gracias por tu compra!", 50, doc.page.height - 100, {
          align: "center",
          width: doc.page.width - 100,
        })
        .text("Restaurante - Sistema de Pedidos Online", { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
export default generarPDFPedido;
