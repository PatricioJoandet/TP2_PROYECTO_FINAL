import Joi from "joi";

export const validarPedidoPost = (pedido) => {
  const schema = Joi.object({
    usuario: Joi.string().required().messages({
      "any.required": "El ID del usuario es obligatorio",
      "string.empty": "El ID del usuario no puede estar vacío",
    }),
    platos: Joi.array()
      .items(
        Joi.object({
          plato: Joi.string().required().messages({
            "any.required": "El ID del plato es obligatorio",
            "string.empty": "El ID del plato no puede estar vacío",
          }),
          cantidad: Joi.number().integer().min(1).required().messages({
            "number.base": "La cantidad debe ser un número",
            "number.integer": "La cantidad debe ser un número entero",
            "number.min": "La cantidad debe ser al menos 1",
            "any.required": "La cantidad es obligatoria",
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.min": "Debe haber al menos un plato en el pedido",
        "any.required": "Los platos son obligatorios",
      }),
  });

  const { error } = schema.validate(pedido);
  return error ? { result: false, error } : { result: true };
};

export const validarPedidoPut = (pedido) => {
  const schema = Joi.object({
    usuario: Joi.string().messages({
      "string.base": "El ID del usuario debe ser un string",
    }),
    platos: Joi.array()
      .items(
        Joi.object({
          plato: Joi.string().required().messages({
            "any.required": "El ID del plato es obligatorio",
            "string.empty": "El ID del plato no puede estar vacío",
          }),
          cantidad: Joi.number().integer().min(1).required().messages({
            "number.base": "La cantidad debe ser un número",
            "number.integer": "La cantidad debe ser un número entero",
            "number.min": "La cantidad debe ser al menos 1",
            "any.required": "La cantidad es obligatoria",
          }),
        })
      )
      .min(1)
      .messages({
        "array.min": "Debe haber al menos un plato si se proporciona la lista",
      }),
    estado: Joi.string().valid("preparando", "enviado").messages({
      "any.only": "El estado debe ser 'preparando' o 'enviado'",
    }),
  })
    .min(1)
    .messages({
      "object.min": "Debe enviar al menos un campo para actualizar",
    });

  const { error } = schema.validate(pedido);
  return error ? { result: false, error } : { result: true };
};
