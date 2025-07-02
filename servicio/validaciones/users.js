import Joi from "joi";

const schemaPost = Joi.object({
  nombre: Joi.string().min(1).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "any.required": "El nombre es obligatorio",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El email debe tener un formato válido",
    "string.empty": "El email es obligatorio",
    "any.required": "El email es obligatorio",
  }),
  telefono: Joi.string().required().messages({
    "string.empty": "El teléfono es obligatorio",
    "any.required": "El teléfono es obligatorio",
  }),
  direccion: Joi.string().required().messages({
    "string.empty": "La dirección es obligatoria",
    "any.required": "La dirección es obligatoria",
  }),
});

const schemaPut = Joi.object({
  nombre: Joi.string().min(1).messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
  }),
  email: Joi.string().email().messages({
    "string.email": "El email debe tener un formato válido",
    "string.empty": "El email no puede estar vacío",
  }),
  telefono: Joi.string().messages({
    "string.empty": "El teléfono no puede estar vacío",
  }),
  direccion: Joi.string().messages({
    "string.empty": "La dirección no puede estar vacía",
  }),
}).min(1);

export const validarUsuarioPost = (usuario) => {
  const { error } = schemaPost.validate(usuario);
  return error ? { result: false, error } : { result: true };
};

export const validarUsuarioPut = (usuario) => {
  const { error } = schemaPut.validate(usuario);
  return error ? { result: false, error } : { result: true };
};
