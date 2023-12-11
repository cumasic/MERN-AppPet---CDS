import axios from 'axios'

const instance = axios.create ({
    baseURL: 'https://main-pet-app-j2b7.onrender.com/api',
    withCredentials: true
})

export default instance
