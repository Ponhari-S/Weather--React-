import React, { useState, useEffect } from "react";
import GetLocation from "./GetLocation";
import { getCityWeatherURL } from "../config";
import { API_KEY as api_key } from "../config";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(getCityWeatherURL(city));
      const data = await res.json();

      if (data.error) {
        alert("City not found!");
        return;
      }

      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latitude},${longitude}`
      );

      const data = await res.json();
      setWeather(data);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-400 to-indigo-500">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center w-80">

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
          <div className="mt-6 text-white">
            <h3 className="text-xl font-semibold">
              {weather.location.name}, {weather.location.country}
            </h3>

            <img
              src={weather.current.condition.icon}
              alt="icon"
              className="mx-auto"
            />

            <p className="text-3xl font-bold">
              {weather.current.temp_c}°C
            </p>

            <p>{weather.current.condition.text}</p>

            <div className="flex justify-between mt-4 text-sm">
              <span>💧 {weather.current.humidity}%</span>
              <span>💨 {weather.current.wind_kph} kph</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WeatherApp;