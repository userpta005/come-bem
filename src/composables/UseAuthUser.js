import { api } from 'src/boot/axios'
import { SessionStorage } from 'quasar'

export default function useAuthUser () {
  const login = async (form) => {
    await api.post('/api/v1/auth/login', form)
      .then((response) => {
        SessionStorage.set('user', response.data.data.user)
        SessionStorage.set('token', response.data.data.token)
        api.defaults.headers.common.Authorization = 'Bearer ' + response.data.data.token
        return response.data.data.user
      })
      .catch((error) => {
        throw error
      })
  }

  const logout = async () => {
    await api.delete('/api/v1/auth/logout')
      .then((response) => {
        SessionStorage.remove('user')
        SessionStorage.remove('token')
        api.defaults.headers.common.Authorization = null
      })
      .catch((error) => {
        throw error
      })
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
