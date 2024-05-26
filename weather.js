import axios from "axios";
import { config } from "./config.js";

export const getWeather = async (ctx) => {
  let locationLatitude = ctx.message.location.latitude;
  let locationLongitude = ctx.message.location.longitude;
  const response = await axios.get(
    config.weatherUrl + `${locationLatitude},${locationLongitude}`
  );

  let text = `${response.data.location.name}, температура: ${response.data.current.temp_c}°C`;
 let iconUrl = response.data.current.condition.icon;

  if (!/^https?:\/\//i.test(iconUrl)) {
    iconUrl = `http:${iconUrl}`;
  }
  console.log(response);
  return { text, iconUrl};
};