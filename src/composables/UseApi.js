import { SessionStorage } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default function useApi () {
  const route = useRoute()
  const user = ref(SessionStorage.getItem('user'))
  const userClient = ref(user.value.people.client)
  const userClientId = ref(null)
  const userDependent = ref(user.value.people.dependent)
  const userDependentId = ref(null)
  const dependents = ref(null)
  const dependent = ref(null)
  const dependentId = ref(null)
  const accounts = ref(null)
  const account = ref(null)
  const accountId = ref(null)
  const cards = ref(null)

  const getUserClient = () => userClient.value
  const getUserClientId = () => userClientId.value
  const getUserDependent = () => userDependent.value
  const getUserDependentId = () => userDependentId.value
  const getDependents = () => dependents.value
  const getDependent = () => dependent.value
  const getDependentId = () => dependentId.value
  const getAccounts = () => accounts.value
  const getAccount = () => account.value
  const getAccountId = () => accountId.value
  const getCards = () => account.value.cards

  const isResponsible = () => !!userClient.value && !userDependent.value
  const isResponsibleDependent = () => !!userClient.value && !!userDependent.value
  const isDependent = () => !userClient.value && !!userDependent.value

  const dependentHasUser = () => !!dependent.value.people.user
  const dependentBlocked = () => account.value.status === 2

  const filterDependents = (dependents, dependentId) => {
    return dependents.filter(dependent => parseInt(dependent.id) === parseInt(dependentId))[0]
  }

  const filterAccounts = (accounts, accountId) => {
    return accounts.filter(account => parseInt(account.id) === parseInt(accountId))[0]
  }

  const refreshData = () => {
    user.value = SessionStorage.getItem('user')

    if (isResponsible()) {
      userClient.value = user.value.people.client
      userClientId.value = userClient.value.id
      dependents.value = userClient.value.dependents

      if (['responsible-dependent'].includes(route.name)) {
        dependentId.value = route.params.dependent
        dependent.value = filterDependents(dependents.value, dependentId.value)
        accounts.value = dependent.value.accounts
        accountId.value = route.params.account
        account.value = filterAccounts(accounts.value, accountId.value)
        cards.value = account.value.cards
      }
    }

    if (isDependent()) {
      userDependent.value = user.value.people.dependent
      userDependentId.value = userDependent.value.id
      dependent.value = userDependent.value
      dependentId.value = dependent.value.id
      accounts.value = dependent.value.accounts
      accountId.value = route.params.account ?? accounts.value[0].id
      account.value = ref(filterAccounts(accounts.value, accountId.value))
      cards.value = account.value.cards
    }

    if (isResponsibleDependent()) {
      userClient.value = user.value.people.client
      userClientId.value = userClient.value.id
      userDependent.value = user.value.people.dependent
      userDependentId.value = userDependent.value.id
      dependents.value = userClient.value.dependents
      accounts.value = userDependent.value.accounts
      accountId.value = accounts.value[0].id

      if (['responsible-dependent'].includes(route.name)) {
        dependentId.value = route.params.dependent
        dependent.value = filterDependents(dependents.value, dependentId.value)
        accounts.value = dependent.value.accounts
        accountId.value = route.params.account
        account.value = filterAccounts(accounts.value, accountId.value)
        cards.value = account.value.cards
      }

      if (['dependent'].includes(route.name)) {
        dependent.value = userDependent.value
        dependentId.value = dependent.value.id
        accounts.value = dependent.value.accounts
        accountId.value = route.params.account
        account.value = filterAccounts(accounts.value, accountId.value)
        cards.value = account.value.cards
      }
    }
  }

  const requestUser = async () => {
    const { data } = await api.get('/api/v1/auth/users')
    SessionStorage.set('user', data.data)
    refreshData()
  }

  refreshData()

  return {
    refreshData,
    requestUser,
    getUserClient,
    getUserClientId,
    getUserDependent,
    getUserDependentId,
    getDependents,
    getDependent,
    getDependentId,
    getAccounts,
    getAccount,
    getAccountId,
    getCards,
    isDependent,
    isResponsibleDependent,
    isResponsible,
    filterDependents,
    filterAccounts,
    dependentHasUser,
    dependentBlocked
  }
}
