import axios from 'axios'
export * from 'axios'

export const $axios = axios.create({
    baseURL: '/api/',
})
