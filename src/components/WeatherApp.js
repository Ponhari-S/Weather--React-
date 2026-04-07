import React, { useState, useEffect } from "react";
import GetLocation from "./GetLocation";
import Forecast from "./Forecast";
import { getCityWeatherURL, getForecastURL } from "../config";
import { API_KEY as api_key } from "../config";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res1 = await fetch(getCityWeatherURL(city));
      const data1 = await res1.json();

      if (data1.error) {
        alert("City not found!");
        return;
      }

      setWeather(data1);

      const res2 = await fetch(getForecastURL(city));
      const data2 = await res2.json();
      setForecast(data2.forecast);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const query = `${latitude},${longitude}`;

      const res1 = await fetch(getCityWeatherURL(query));
      const data1 = await res1.json();
      setWeather(data1);

      const res2 = await fetch(getForecastURL(query));
      const data2 = await res2.json();
      setForecast(data2.forecast);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-400 to-indigo-500">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center w-100">

        <h2 className="text-2xl font-bold text-white mb-4">
          🌦 Weather App
        </h2>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          className="w-full p-2 rounded-lg mb-3 outline-none bg-indigo-300 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={fetchWeather}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>

        <GetLocation setWeather={setWeather} />

        {weather && (
          <div className="mt-4 text-white">
            <h3 className="text-lg font-semibold">
              {weather.location.name}
            </h3>

            <img
              src={weather.current.condition.icon}
              alt="icon"
              className="mx-auto"
            />

            <p className="text-2xl font-bold">
              {weather.current.temp_c}°C
            </p>

            <p>{weather.current.condition.text}</p>
          </div>
        )}

        {forecast && <Forecast forecast={forecast} />}

      </div>
    </div>
  );
};

export default WeatherApp;