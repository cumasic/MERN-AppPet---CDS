import axios from 'axios'

const instance = axios.create ({
    baseURL: 'https://backend-zwqf.onrender.com',
    withCredentials: true
})

export default instance
