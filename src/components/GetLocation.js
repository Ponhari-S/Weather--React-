import { getLocationWeatherURL } from "../config";

const GetLocation = ({ setWeather }) => {
  const fetchLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            getLocationWeatherURL(latitude, longitude)
          );
          const data = await res.json();

          setWeather(data);
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        alert("Permission denied!");
      }
    );
  };

  return (
    <button
      onClick={fetchLocationWeather}
      className="w-full bg-green-600 text-white p-2 mt-2 rounded-lg hover:bg-green-700"
    >
      📍 Use My Location
    </button>
  );
};

export default GetLocation;