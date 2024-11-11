import axios from 'axios'

export const frontend = axios.create({
    baseURL: 'http://localhost:5000/backend'
})