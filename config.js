import dotenv from  'dotenv'

dotenv.config()

//console.log(process.env)
//console.log('process.env.PORT', process.env.PORT)
//console.log('process.env.MODO_PERSISTENCIA', process.env.MODO_PERSISTENCIA)

const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || ''
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'

export default {
    PORT,
    MODO_PERSISTENCIA,   // MODO_PERSISTENCIA: MODO_PERSISTENCIA
    STRCNX,
    BASE
}