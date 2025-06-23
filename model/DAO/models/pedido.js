import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    platos: [
      {
        nombre: { type: String, required: true },
        precio: { type: Number, required: true, min: 0 },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: ["preparando", "enviado"],
      default: "preparando",
    },
    fechaPedido: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export const PedidoModel = mongoose.model("pedido", pedidoSchema);
