import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000',
})


export const createUser = payload => api.get(`/createUser?name=${payload.name}&email=${payload.email}&password=${payload.password}`)
export const showUsers = () => api.get(`/showUsers`)
export const loginUser = payload => api.get(`/loginUser?name=${payload.name}&password=${payload.password}`)

const apis = {
    createUser,
    showUsers,
    loginUser,
}

export default apis