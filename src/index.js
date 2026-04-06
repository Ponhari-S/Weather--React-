import React from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from "./WeatherApp";

const root=createRoot(document.getElementById("root"));

root.render(<WeatherApp />);