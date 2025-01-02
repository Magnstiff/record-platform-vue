import axios from "axios";

const domain = window.location.host;

const instance = axios.create({
  baseURL: `http://${domain}:3000`,
  timeout: 5000,
});
export default instance;
