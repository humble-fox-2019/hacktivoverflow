import axios from 'axios'

const myaxios = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'http://api.toooverflow.guntoroyk.site'
})

export default myaxios
