import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const STRCNX = process.env.STRCNX;
const BASE = process.env.BASE || "test";

export default {
  PORT,
  STRCNX,
  BASE,
};
