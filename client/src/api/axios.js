import axios from 'axios';

// const BASE_URL = 'http://52.221.242.65'
const BASE_URL = 'http://localhost:3000'
const axiosInstance = axios.create({
    baseURL : BASE_URL
})
export default axiosInstance