import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com/users/'
})

export const fetchRepos = user => api.get(`${user}/repos`)

export const fetchStars = user => api.get(`${user}/starred`)