import { api } from 'src/boot/axios'
import UseAxios from 'src/composables/UseAxios'
import { SessionStorage } from 'quasar'

export default function useAuthUser () {
  const { axios } = UseAxios()

  const isLogged = () => {
    return SessionStorage.has('token')
  }

  const login = async (form) => {
    const data = await axios({ method: 'post', url: '/api/v1/auth/login', data: form })
    SessionStorage.set('token', data.data.token)
    SessionStorage.set('user', data.data.user)
    api.defaults.headers.common.Authorization = 'Bearer ' + data.data.token
    return data
  }

  const logout = async () => {
    const data = await axios({ method: 'delete', url: '/api/v1/auth/logout' })
    SessionStorage.clear()
    api.defaults.headers.common.Authorization = null
    return data
  }

  const register = async (form) => {
    const data = await axios({ method: 'post', url: '/api/v1/auth/users', data: form })
    return data
  }

  const update = async () => {
  }

  const sendPasswordRestEmail = async () => {
  }

  const resetPassword = async () => {
  }

  return {
    login,
    isLogged,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword
  }
}
