import axios from 'axios'

export const frontend = axios.create({
    baseURL: 'https://jazzy-music-backend.onrender.com'
})
