import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const UserModel = mongoose.model("usuario", userSchema);
