import Joi from "joi";

const schemaPost = Joi.object({
  nombre: Joi.string().required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "any.required": "El nombre es obligatorio",
  }),
  precio: Joi.number().min(0).max(1000000).required().messages({
    "number.base": "El precio debe ser un número",
    "number.min": "El precio no puede ser menor que 0",
    "number.max": "El precio no puede ser mayor que 1.000.000",
    "any.required": "El precio es obligatorio",
  }),
  calorias: Joi.number().integer().min(0).max(10000).required().messages({
    "number.base": "Las calorías deben ser un número",
    "number.integer": "Las calorías deben ser un número entero",
    "number.min": "Las calorías no pueden ser menores que 0",
    "number.max": "Las calorías no pueden ser mayores que 10.000",
    "any.required": "Las calorías son obligatorias",
  }),
  ingredientes: Joi.array()
    .items(
      Joi.string().min(1).messages({
        "string.base": "Cada ingrediente debe ser un texto",
        "string.empty": "Cada ingrediente no puede estar vacío",
        "string.min": "Cada ingrediente debe tener al menos 1 carácter",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los ingredientes deben ser una lista",
      "array.min": "Debe haber al menos un ingrediente",
      "any.required": "Los ingredientes son obligatorios",
    }),
});

const schemaPut = Joi.object({
  nombre: Joi.string().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
  }),
  precio: Joi.number().min(0).max(1000000).messages({
    "number.base": "El precio debe ser un número",
    "number.min": "El precio no puede ser menor que 0",
    "number.max": "El precio no puede ser mayor que 1.000.000",
  }),
  calorias: Joi.number().integer().min(0).max(10000).messages({
    "number.base": "Las calorías deben ser un número",
    "number.integer": "Las calorías deben ser un número entero",
    "number.min": "Las calorías no pueden ser menores que 0",
    "number.max": "Las calorías no pueden ser mayores que 10.000",
  }),
  ingredientes: Joi.array()
    .items(
      Joi.string().min(1).messages({
        "string.base": "Cada ingrediente debe ser un texto",
        "string.empty": "Cada ingrediente no puede estar vacío",
        "string.min": "Cada ingrediente debe tener al menos 1 carácter",
      })
    )
    .min(1)
    .messages({
      "array.base": "Los ingredientes deben ser una lista",
      "array.min": "Debe haber al menos un ingrediente",
    }),
})
  .min(1)
  .messages({
    "object.min": "Debes enviar al menos un campo para actualizar el plato",
  });

export const validarPlatoPost = (plato) => {
  const { error } = schemaPost.validate(plato);
  return error ? { result: false, error } : { result: true };
};

export const validarPlatoPut = (plato) => {
  const { error } = schemaPut.validate(plato);
  return error ? { result: false, error } : { result: true };
};
