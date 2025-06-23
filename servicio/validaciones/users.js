
import Joi from 'joi'

export const validar = usuario => {
    const usuariosSchema = Joi.object({
        nombre: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        telefono: Joi.string().required(),
        direccion: Joi.string().required()
 
    })

    const { error } = usuariosSchema.validate(usuario)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
