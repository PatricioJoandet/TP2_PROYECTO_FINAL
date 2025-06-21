import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY;
const CIUDAD = "Buenos Aires";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=metric&lang=es`;

const obtenerClima = async () => {
  try {
    const response = await axios.get(url);
    const { main } = response.data;
    return main.temp;
  } catch (error) {
    console.error("Error al obtener el clima:", error.message);
    throw new Error("No se pudo obtener el clima");
  }
};

export default obtenerClima;
