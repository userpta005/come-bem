import { SessionStorage } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export default function useApi () {
  const user = ref(SessionStorage.getItem('user'))
  const client = ref(user.value.people.client)
  const dependent = ref(user.value.people.dependent)

  const isResponsible = () => {
    return !!client.value && !dependent.value
  }

  const isResponsibleDependent = () => {
    return !!client.value && !!dependent.value
  }

  const isDependent = () => {
    return !client.value && !!dependent.value
  }

  const getUser = async () => {
    const { data } = await api.get('/api/v1/auth/users')
    SessionStorage.set('user', data.data)
    return data.data
  }
  return {
    getUser,
    isDependent,
    isResponsibleDependent,
    isResponsible
  }
}
