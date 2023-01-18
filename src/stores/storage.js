import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

const useStorageStore = defineStore('storage', {
  state: () => ({
    userClient: null,
    userDependent: null,
    dependents: [],
    dependent: null,
    account: null,
    disabledUser: false,
    dependentIndexes: {},
    order_id: null,
    purchaseDate: null,
    turn: null,
    cart: [],
    reloadCredits: {
      amount: 0,
      payment_method_id: null
    },
    checkout: [],
    mainContent: 'QCalendar',
    openReloadCredits: false,
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
      return this.dependents.find((value) => parseInt(value.id) === parseInt(dependentId))
    },

    getAccountById (accountId) {
      return this.dependent.accounts.find((value) => parseInt(value.id) === parseInt(accountId))
    },

    getDependenIndexById (dependentId) {
      return this.dependents.findIndex((value) => parseInt(value.id) === parseInt(dependentId))
    },

    setDependents (dependents) {
      this.dependents = dependents
      if (this.isResponsible || this.isResponsibleDependent) {
        this.dependents.forEach((dependent, index) => {
          if (!(`index${index}` in this.dependentIndexes)) {
            this.dependentIndexes[`index${index}`] = { accountIndex: 0 }
          }
        })
      }
    },

    setDependent (dependent = null, index = null) {
      if (dependent) {
        this.dependent = dependent
      }
      this.account = index === null ? this.getAccountById(this.account.id)
        : this.dependent.accounts[this.dependentIndexes[`index${index}`].accountIndex]
      this.disabledUser = parseInt(this.account.status) === 2
      this.app_token = this.account.store.app_token
    },

    setAccount (account) {
      this.account = account
      this.disabledUser = parseInt(this.account.status) === 2
      this.app_token = this.account.store.app_token
    },

    async register (form) {
      const data = await this.axios({ method: 'post', url: '/api/v1/auth/users', data: form })
      return data.message
    },

    async login (form) {
      const data = await this.axios({ method: 'post', url: '/api/v1/auth/login', data: form })
      this.userClient = data.data.user.people.client
      this.userDependent = data.data.user.people.dependent
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
