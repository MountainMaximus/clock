import axios from "axios";

const instance = axios.create({
  baseURL: "/timezones.json",
});

export default instance;
