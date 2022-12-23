<template>
  <div class="row items-center justify-evenly q-pa-sm">
    <q-icon name="mdi-baby-face-outline"
      size="8rem"
      class="col-shrink q-pa-sm"
      :class="{ 'col-12': $q.screen.lt.md }" />
    <div class="column q-pa-sm"
      :class="{ 'col-12 flex-center': $q.screen.lt.md }">
      <h6 class="q-ma-xs">
        {{ store.dependent.people.name }}
      </h6>
      <SelectAccount class="q-ma-xs" />
      <span class="text-weight-regular q-ma-xs">
        Nascimento: {{ brDate(store.dependent.people.birthdate) }}
      </span>
      <span class="text-weight-regular q-ma-xs">
        Sexo: {{ gender(store.dependent.people.gender) }}
      </span>
    </div>
    <div class="column q-pa-sm"
      :class="{ 'col-12 flex-center': $q.screen.lt.md }">
      <span class="text-weight-regular q-ma-xs">
        Saldo: {{ floatToMoney(store.account.balance) }}
      </span>
      <span class="text-weight-regular q-ma-xs">
        Limite diário: {{ floatToMoney(store.account.daily_limit) }}
      </span>
      <span class="text-weight-regular q-ma-xs">
        Saldo do dia: {{ floatToMoney(0) }}
      </span>
      <q-toggle label="Desativar consumidor"
        v-model="store.account.status"
        :true-value="1"
        :false-value="2"
        style="border: 1px solid grey"
        class="q-pa-xs rounded-borders"
        :class="{ 'self-start': $q.screen.gt.sm }"
        :color="parseInt(store.account.status) === 1 ? 'green' : 'red'"
        keep-color
        left-label
        @update:model-value="handleBlockAccount"
        v-if="['responsible-dependent'].includes($route.name)" />
    </div>
    <q-separator class="col-12"
      size="0.1rem"
      color="main-primary" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import SelectAccount from 'src/components/app/dependents/SelectAccount.vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    SelectAccount
  },
  setup () {
    const { notifySuccess, notifyError } = notify()
    const route = useRoute()
    const store = useStorageStore()

    const gender = (gender) => {
      return gender === 'M' ? 'Masculino' : 'Feminino'
    }

    const handleBlockAccount = async (value) => {
      try {
        const data = await store.axios({
          method: 'put',
          url: `api/v1/accounts/${store.account.id}/block`,
          data: { activate: parseInt(value) === 1 }
        })
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      floatToMoney,
      brDate,
      handleBlockAccount,
      gender
    }
  }
})
</script>
