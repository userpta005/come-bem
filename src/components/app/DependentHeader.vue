<template>
  <div class="row">
    <div class="col-3 flex flex-center q-pa-sm">
      <q-icon name="mdi-baby-face-outline"
        size="6rem"
        class="col-3" />
    </div>
    <div class="col-9 row q-pa-sm">
      <div class="col-md-6 col-xs-12 column q-pa-sm">
        <div class="text-subtitle1 text-weight-medium">
          {{ propDependent.people.name }}
        </div>
        <SelectAccount @select-account="selectAccount"
          :accounts="propDependent.accounts" />
        <div class="text-caption text-weight-regular q-mb-xs">
          Nascimento: {{ brDate(propDependent.people.birthdate) }}
        </div>
        <div class="text-caption text-weight-regular">
          Sexo: {{ propDependent.people.gender == 'M' ? 'Masculino' : 'Feminino' }}
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
</template>

<script>
import { defineComponent, computed } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import SelectAccount from 'components/app/SelectAccount.vue'
import notify from 'src/composables/notify'
import { useRoute, useRouter } from 'vue-router'
import { SessionStorage } from 'quasar'
import UseAxios from 'src/composables/axios'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    SelectAccount
  },
  props: [
    'propDependent',
    'propAccount'
  ],
  emits: [
    'update:modelValue',
    'refreshLocalData'
  ],
  setup (props, { emit }) {
    const { notifySuccess, notifyError } = notify()
    const { axios } = UseAxios()
    const route = useRoute()
    const router = useRouter()
    const account = computed({
      get () {
        return props.propAccount
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })

    const selectAccount = (item) => {
      router.replace({ name: route.name, params: { account: item.id } })
    }

    const handleBlockAccount = async (value) => {
      try {
        const data = await axios({
          method: 'put',
          url: `api/v1/accounts/${account.value.id}/block`,
          data: { activate: value === 1 }
        })
        SessionStorage.set('user', data.data)
        notifySuccess(data.message)
        emit('refreshLocalData', false)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      floatToMoney,
      brDate,
      selectAccount,
      handleBlockAccount,
      account
    }
  }
})
</script>
