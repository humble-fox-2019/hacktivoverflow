import axios from 'axios'

export default axios.create({
    baseURL: process.env.HOST_URL || 'http://localhost:3000',
    timeout: 1000,
    headers: { token: localStorage.getItem('token') }
})