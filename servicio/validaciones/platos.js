import Joi from "joi";

export const validar = (plato) => {
  const platosSchema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().min(0).max(1000000).required(),
    calorias: Joi.number().integer().min(0).max(10000).required(),
    ingredientes: Joi.array().items(Joi.string().alphanum()).min(1).required(),
  });

  const { error } = platosSchema.validate(plato);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};
