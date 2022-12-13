import { api } from 'src/boot/axios'
import { SessionStorage } from 'quasar'

export default function useAuthUser () {
  const login = async (form) => {
    const { data } = await api.post('/api/v1/auth/login', form)
    SessionStorage.set('user', data.data.user)
    SessionStorage.set('token', data.data.token)
    api.defaults.headers.common.Authorization = 'Bearer ' + data.data.token
  }

  const logout = async () => {
    await api.delete('/api/v1/auth/logout')
    SessionStorage.remove('user')
    SessionStorage.remove('token')
    api.defaults.headers.common.Authorization = null
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
