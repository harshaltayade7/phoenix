import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000',
})


export const createUser = payload => api.post('/createUser',
   payload
  )
export const showUsers = () => api.get(`/showUsers`)
export const loginUser = payload => api.post('/loginUser',payload)

const apis = {
    createUser,
    showUsers,
    loginUser,
}

export default apis