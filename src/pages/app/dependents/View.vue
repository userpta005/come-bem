<template>
  <q-page class="pa-responsive-md">
    <div class="row">
      <div class="col-md-9 col-xs-12 row self-start q-pa-sm">
        <div class="col-3 flex flex-center q-pa-sm">
          <q-icon name="mdi-baby-face-outline"
            size="6rem"
            class="col-3" />
        </div>
        <div class="col-9 row q-pa-sm">
          <div class="col-md-6 col-xs-12 column q-pa-sm">
            <div class="text-subtitle1 text-weight-medium">
              {{ dependent.name }}
            </div>
            <SelectAccount @select-account="selectAccount"
              :accounts="dependent.accounts" />
            <div class="text-caption text-weight-regular q-mb-xs">
              Nascimento: {{ brDate(dependent.birthdate) }}
            </div>
            <div class="text-caption text-weight-regular">
              Sexo: {{ dependent.gender == 'M' ? 'Masculino' : 'Feminino' }}
            </div>
          </div>
          <div class="col-md-6 col-xs-12 column q-pa-sm">
            <div class="text-caption text-weight-medium q-mb-xs">
              Saldo: {{ floatToMoney(account.balance) }}
            </div>
            <div class="text-caption text-weight-regular q-mb-xs">
              Limite diário: {{ floatToMoney(account.daily_limit) }}
            </div>
            <div class="text-caption text-weight-regular q-mb-xs">
              Saldo do dia: {{ floatToMoney(0) }}
            </div>
            <q-toggle v-model="account.status"
              :true-value="1"
              :false-value="2"
              style="border: 1px solid grey"
              class="self-start q-pa-xs rounded-borders"
              dense
              label="Desativar consumidor"
              :color="account.status === 1 ? 'green' : 'red'"
              keep-color
              left-label
              @update:model-value="handleBlockAccount"
              v-if="['responsible-dependent'].includes($route.name)" />
          </div>
          <q-separator class="col-12 full-width"
            style="height: 0.1rem;"
            color="main-primary" />
        </div>
      </div>
      <SidebarActions class="col-md-3 col-xs-12 self-center"
        :class="{ 'order-first': $q.screen.lt.md }" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import SelectAccount from 'components/app/SelectAccount.vue'
import useApi from 'src/composables/UseApi'
import SidebarActions from 'src/components/app/SidebarActions.vue'
import notify from 'src/composables/notify'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { SessionStorage } from 'quasar'
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    SidebarActions,
    SelectAccount
  },
  setup () {
    const { notifySuccess, notifyError } = notify()
    const { getUser } = useApi()
    const route = useRoute()
    const router = useRouter()
    const user = ref(null)
    const dependentId = ref(null)
    const accountId = ref(null)
    const dependents = ref(null)
    const dependent = ref(null)
    const account = ref(null)

    const getDependent = (dependents, dependentId) => {
      return dependents.filter(dependent => parseInt(dependent.id) === parseInt(dependentId))[0]
    }

    const getAccount = (accounts, accountId) => {
      return accounts.filter(account => parseInt(account.id) === parseInt(accountId))[0]
    }

    const selectAccount = (item) => {
      router.replace({ name: route.name, params: { account: item.id } })
    }

    const handleBlockAccount = async (value) => {
      try {
        const { data } = await api({
          method: 'delete',
          url: `api/v1/accounts/${accountId.value}/block`,
          data: {
            activate: value === 1
          }
        })
        SessionStorage.set('user', data.data)
        handleGetUser(false)
        notifySuccess(data.message)
      } catch ({ response }) {
        notifyError(response.data.message)
      }
    }

    onBeforeRouteUpdate(async (to, from) => {
      handleGetUser(true, to.params.account)
    })

    const handleGetUser = async (request = true, paramAccountId = route.params.account) => {
      try {
        user.value = request ? await getUser() : SessionStorage.getItem('user')
        dependentId.value = route.params.dependent
        accountId.value = paramAccountId
        dependents.value = user.value.people.client.dependents
        dependent.value = getDependent(dependents.value, dependentId.value)
        account.value = getAccount(dependent.value.accounts, accountId.value)
        api.defaults.headers.common.app = account.value.store.app_token
      } catch (error) {
        notifyError(error.message)
      }
    }

    handleGetUser(false)
    handleGetUser()

    return {
      floatToMoney,
      brDate,
      dependent,
      account,
      accountId,
      selectAccount,
      handleBlockAccount
    }
  }
})
</script>
