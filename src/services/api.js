import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 60 * 60 * 1000
});