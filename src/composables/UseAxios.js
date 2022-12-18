import { api } from 'src/boot/axios'

export default function useAuthUser () {
  const axios = async (config) => {
    try {
      const { data } = await api(config)
      return data
    } catch (error) {
      if (error.response) {
        const response = error.response
        if (response.status === 422) {
          const data = response.data.data
          const property = Object.keys(data)[0]
          throw data[property][0]
        }
        throw response.data.message
      }
      throw error.message
    }
  }

  return {
    axios
  }
}
