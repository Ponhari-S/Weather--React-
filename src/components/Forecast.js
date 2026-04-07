import React from "react";

const Forecast = ({ forecast }) => {
  return (
    <div className="mt-6 text-white">
      <h3 className="text-lg font-semibold mb-2">3-Day Forecast</h3>

      <div className="flex gap-3 overflow-x-auto">
        {forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md p-3 rounded-xl min-w-25 text-center"
          >
            <p className="text-sm">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>

            <img
              src={day.day.condition.icon}
              alt="icon"
              className="mx-auto"
            />

            <p className="font-bold">{day.day.avgtemp_c}°C</p>

            <p className="text-xs">{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;