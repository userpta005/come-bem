import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

const useStorageStore = defineStore('storage', {
  state: () => ({
    userClient: null,
    userDependent: null,
    dependent: null,
    account: null,
    hasUser: false,
    disableButtons: false,
    dependentIndexes: {},
    mainContent: 'QCalendar',
    purchaseDate: null,
    cart: [],
    app_token: null,
    token: null
  }),
  getters: {
    isLogged: (state) => {
      return !!state.token
    },
    isResponsible: (state) => {
      return !!state.userClient && !state.userDependent
    },
    isDependent: (state) => {
      return !!state.userDependent && !state.userClient
    },
    isResponsibleDependent: (state) => {
      return !!state.userDependent && !!state.userClient
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

    getDependentById (dependentId) {
      return this.userClient.dependents.find((value) => parseInt(value.id) === parseInt(dependentId))
    },

    getAccountById (accountId) {
      return this.dependent.accounts.find((value) => parseInt(value.id) === parseInt(accountId))
    },

    getDependenIndexById (dependentId) {
      return this.userClient.dependents.findIndex((value) => parseInt(value.id) === parseInt(dependentId))
    },

    setUser (user) {
      this.userClient = user.people.client
      this.userDependent = user.people.dependent
      if (this.isResponsible || this.isResponsibleDependent) {
        this.userClient.dependents.forEach((dependent, index) => {
          if (!(`index${index}` in this.dependentIndexes)) {
            this.dependentIndexes[`index${index}`] = { accountIndex: 0 }
          }
        })
      }
    },

    refreshData (dependentId, accountId) {
      this.dependent = this.getDependentById(dependentId)
      this.account = this.getAccountById(accountId)
      this.hasUser = !!this.dependent.people.user
      this.disableButtons = parseInt(this.account.status) === 2
      this.mainContent = 'QCalendar'
      this.purchaseDate = null
      this.cart = []
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
      return data.message
    }
  },
  persist: true
})

export default useStorageStore
