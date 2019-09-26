import axios from 'axios';

const BASE_URL = process.env.APP_VUE_BASE_URL || 'http://localhost:3000'
const axiosInstance = axios.create({
    baseURL : BASE_URL
})
export default axiosInstance