import axios from "axios";

const API = axios.create({
  baseURL: "https://starseccomerce.pythonanywhere.com/api", // Django API bazaviy URL
});

export default API;
