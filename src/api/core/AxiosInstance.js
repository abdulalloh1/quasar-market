import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://94.158.54.194:9092/api'
})

export default axiosInstance;
