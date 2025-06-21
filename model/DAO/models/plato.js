import mongoose from "mongoose";

const platoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    calorias: {
      type: Number,
      required: true,
    },
    ingredientes: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

export const PlatoModel = mongoose.model("plato", platoSchema);
