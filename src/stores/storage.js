import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

const useStorageStore = defineStore('storage', {
  state: () => ({
    user: null,
    userClient: null,
    dependents: null,
    userDependent: null,
    userAccounts: null,
    account: null,
    token: null,
    app_token: null
  }),
  getters: {
    isLogged: (state) => {
      return !!state.token
    },
    isResponsible: (state) => {
      return !!state.userClient.id && !state.userDependent.id
    },
    isDependent: (state) => {
      return !!state.userDependent.id && !state.userClient.id
    },
    isResponsibleDependent: (state) => {
      return !!state.userDependent.id && !!state.userClient.id
    }
  },
  actions: {
    async axios (config) {
      try {
        if (this.token) api.defaults.headers.common.Authorization = 'Bearer ' + this.token
        if (this.app_token) api.defaults.headers.common.app = this.app_token
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
    },

    setUser (user) {
      this.user = user
      this.userClient = this.user.people.client
      this.dependents = this.userClient.dependents
      this.userDependent = this.user.people.dependent
      this.userAccounts = this.userDependent.accounts
      this.account = this.userAccounts[0]
      this.app_token = this.account.store.app_token
    },

    async requestUser () {
      const { data } = await this.axios({ method: 'get', url: '/api/v1/auth/users' })
      this.setUser(data)
    },

    async register (form) {
      const data = await this.axios({ method: 'post', url: '/api/v1/auth/users', data: form })
      return data.message
    },

    async login (form) {
      const data = await this.axios({ method: 'post', url: '/api/v1/auth/login', data: form })
      this.setUser(data.data.user)
      this.token = data.data.token
      return data.message
    },

    async logout () {
      const data = await this.axios({ method: 'delete', url: '/api/v1/auth/logout' })
      this.user = null
      this.userClient = null
      this.dependents = null
      this.userDependent = null
      this.userAccounts = null
      this.account = null
      this.app_token = null
      this.token = null
      return data.message
    }
  },
  persist: true
})

export default useStorageStore
