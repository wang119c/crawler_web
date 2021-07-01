import { apiUrl } from "../config/network";
import axios from "axios";

const service = axios.create({
  baseURL: apiUrl,
  timeout: 500000000,
});
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
