const API_KEY = "805e9ce53420a34db90d2c7d1c23a921";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const weatherService = {
  getWeather: async (location) => {
    const response = await fetch(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return response.json();
  },
};

export default weatherService;