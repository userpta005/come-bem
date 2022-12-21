<template>
  <div class="row flex justify-center">
    <div class="col-md-shrink col-xs-12 flex flex-center q-pa-sm">
      <q-icon name="mdi-baby-face-outline"
        size="6rem" />
    </div>
    <div class="col-md-grow col-xs-12 row q-pa-sm"
      :class="{ 'flex-center': $q.screen.lt.md }">
      <div class="col-md-grow col-xs-12 column q-pa-sm"
        :class="{ 'flex-center': $q.screen.lt.md }">
        <span class="text-weight-medium q-ma-xs">
          {{ store.dependent.people.name }}
        </span>
        <SelectAccount class="q-ma-xs" />
        <span class="text-weight-regular q-ma-xs">
          Nascimento: {{ brDate(store.dependent.people.birthdate) }}
        </span>
        <span class="text-weight-regular q-ma-xs">
          Sexo: {{ gender(store.dependent.people.gender) }}
        </span>
      </div>
      <div class="col-md-grow col-xs-12 column q-pa-sm"
        :class="{ 'flex-center': $q.screen.lt.md }">
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
          class="q-ba-xs rounded-borders"
          :class="{ 'self-start': $q.screen.gt.sm }"
          :color="parseInt(store.account.status) === 1 ? 'green' : 'red'"
          keep-color
          left-label
          @update:model-value="handleBlockAccount"
          v-if="['responsible-dependent'].includes($route.name)" />
      </div>
      <q-separator class="col-10"
        size="0.1rem"
        color="main-primary" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import SelectAccount from 'src/components/app/dependents/SelectAccount.vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    SelectAccount
  },
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()

    const gender = (gender) => {
      return gender === 'M' ? 'Masculino' : 'Feminino'
    }

    const handleBlockAccount = async (value) => {
      try {
        const data = await store.axios({
          method: 'put',
          url: `api/v1/accounts/${store.accountId}/block`,
          data: { activate: parseInt(value) === 1 }
        })
        store.setUser(data.data)
        store.disableButtons = parseInt(value) === 2
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
