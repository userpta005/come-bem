import { api } from 'src/boot/axios'
import { SessionStorage } from 'quasar'

export default function useAuthUser () {
  const login = async (form) => {
    try {
      const { data } = await api.post('/api/v1/auth/login', form)
      SessionStorage.set('user', data.data.user)
      SessionStorage.set('token', data.data.token)
      api.defaults.headers.common.Authorization = 'Bearer ' + data.data.token
      return data
    } catch ({ response }) {
      throw response.data.message
    }
  }

  const logout = async () => {
    const { data } = await api.delete('/api/v1/auth/logout')
    SessionStorage.clear()
    api.defaults.headers.common.Authorization = null
    return data
  }

  const isLogged = () => {
    return SessionStorage.has('user')
  }

  const register = async () => {
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
