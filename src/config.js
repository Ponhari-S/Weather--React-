export const API_KEY="1e7d0be522344d29b0861312261902";

export const getCityWeatherURL = (city) =>
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  
  export const getLocationWeatherURL = (lat, lon) =>
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`;