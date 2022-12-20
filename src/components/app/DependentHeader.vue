<template>
  <div class="row">
    <div class="col-md-3 col-xs-12 flex flex-center q-pa-sm">
      <q-icon name="mdi-baby-face-outline"
        size="6rem"
        class="col-3" />
    </div>
    <div class="col-md-9 col-xs-12 row q-pa-sm">
      <div class="col-md-6 col-xs-12 column q-pa-sm"
        :class="{ 'flex flex-center': $q.screen.lt.md }">
        <div class="text-subtitle1 text-weight-medium">
          {{ store.dependent.people.name }}
        </div>
        <SelectAccount />
        <div class="text-caption text-weight-regular q-mb-xs">
          Nascimento: {{ brDate(store.dependent.people.birthdate) }}
        </div>
        <div class="text-caption text-weight-regular">
          Sexo: {{ gender(store.dependent.people.gender) }}
        </div>
      </div>
      <div class="col-md-6 col-xs-12 column q-pa-sm"
        :class="{ 'flex flex-center': $q.screen.lt.md }">
        <div class="text-caption text-weight-medium q-mb-xs">
          Saldo: {{ floatToMoney(store.account.balance) }}
        </div>
        <div class="text-caption text-weight-regular q-mb-xs">
          Limite diário: {{ floatToMoney(store.account.daily_limit) }}
        </div>
        <div class="text-caption text-weight-regular q-mb-xs">
          Saldo do dia: {{ floatToMoney(0) }}
        </div>
        <q-toggle v-model="store.account.status"
          :true-value="1"
          :false-value="2"
          style="border: 1px solid grey"
          class="q-pa-xs rounded-borders"
          :class="{ 'self-start': $q.screen.gt.sm }"
          dense
          label="Desativar consumidor"
          :color="parseInt(store.account.status) === 1 ? 'green' : 'red'"
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
</template>

<script>
import { defineComponent } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import SelectAccount from 'components/app/SelectAccount.vue'
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
