import { SessionStorage } from 'quasar'
import { api } from 'src/boot/axios'

export default function useApi () {
  const getUser = async () => {
    const { data, error } = await api.get('/api/v1/auth/users')
    if (error) throw error
    SessionStorage.set('user', data.data)
    return data.data
  }
  return {
    getUser
  }
}
