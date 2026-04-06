import React from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from "./components/WeatherApp";

const root = createRoot(document.getElementById("root"));
root.render(<WeatherApp />);