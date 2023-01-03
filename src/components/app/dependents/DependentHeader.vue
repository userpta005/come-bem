<template>
  <div>

    <div class="row"
      :style="$q.screen.gt.xs ? 'max-width: 650px' : ''">

      <div class="flex items-center col-grow"
        :class="{ 'col-12 justify-center': $q.screen.lt.sm }">
        <q-img src="/src/assets/child.png"
          height="130px"
          width="110px" />
      </div>

      <div class="col-grow">

        <div class="row justify-between">

          <div class="column q-mb-sm"
            :class="{ 'col-12 flex-center': $q.screen.lt.sm }">

            <h6 class="no-margin">
              {{ store.dependent.people.name }}
            </h6>

            <SelectAccount />

            <span class="text-weight-regular q-mb-xs">
              Nascimento: {{ brDate(store.dependent.people.birthdate) }}
            </span>

            <span class="text-weight-regular q-mb-xs">
              Sexo: {{ gender(store.dependent.people.gender) }}
            </span>

          </div>

          <div class="column items-end q-mb-sm"
            :class="{ 'col-12 flex-center': $q.screen.lt.sm }">

            <span class="text-weight-medium q-mb-xs">
              Saldo: {{ floatToMoney(store.account.balance) }}
            </span>

            <span class="text-weight-regular q-mb-xs">
              Limite diário: {{ floatToMoney(store.account.daily_limit) }}
            </span>

            <span class="text-weight-regular q-mb-xs">
              Saldo do dia: {{ floatToMoney(0) }}
            </span>

            <q-toggle label="Desativar consumidor"
              v-model="statusDependent"
              :true-value="1"
              :false-value="2"
              style="border: 1px solid grey"
              class="q-py-xs q-px-md rounded-borders q-mb-xs"
              :class="{ 'self-start': $q.screen.gt.xs }"
              :color="parseInt(statusDependent) === 1 ? 'green' : 'red'"
              keep-color
              left-label
              @update:model-value="handleBlockAccount"
              v-if="['responsible-dependent'].includes($route.name)" />

          </div>

        </div>

        <q-separator class="col-12"
          size="2px"
          color="main-primary" />

      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
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
    const statusDependent = computed(() => store.account.status)

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
      statusDependent,
      floatToMoney,
      brDate,
      handleBlockAccount,
      gender
    }
  }
})
</script>
