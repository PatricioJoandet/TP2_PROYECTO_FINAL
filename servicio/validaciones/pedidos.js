import Joi from "joi";

export const validar = (pedido) => {
  const pedidosSchema = Joi.object({
    usuario: Joi.string().required(),
    platos: Joi.array()
      .items(
        Joi.object({
          plato: Joi.string().required(),
          cantidad: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
  });

  const { error } = pedidosSchema.validate(pedido);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};
