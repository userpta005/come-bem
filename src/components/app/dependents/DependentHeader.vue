<template>
  <div class="row full-width q-mb-md">
    <div class="row"
      style="width: 800px;">

      <div class="flex items-center col-auto"
        :class="$q.screen.lt.sm ? 'col-12 justify-center' : 'q-mr-xl'">
        <q-img src="~assets/child.png"
          height="130px"
          width="110px" />
      </div>

      <div class="col-grow">
        <div class="row justify-between"
          :class="$q.screen.gt.md ? 'no-wrap' : ''">

          <div class="column q-mb-sm"
            :class="{ 'col-12 flex-center': $q.screen.lt.sm }">

            <h5 class="no-margin text-weight-medium">
              {{ store.dependent.people.full_name ?? store.dependent.people.name }}
            </h5>

            <SelectAccount />

            <span class="text-body2 text-weight-medium text-grey-8 q-mb-sm">
              Nascimento: {{ brDate(store.dependent.people.birthdate) }}
            </span>

            <span class="text-body2 text-weight-medium text-grey-8 q-mb-sm">
              Sexo: {{ gender(store.dependent.people.gender) }}
            </span>

            <div v-if="showAccessKey && accessKey"
              :class="$q.screen.lt.sm ? 'text-center' : ''">
              Usuário: {{ accessKey[0] }}
              Senha: {{ accessKey[1] }}

              <span class="text-body2 text-weight-medium text-red block">
                Esqueceu o cartão? Use o usuário e a senha para comprar!
              </span>
            </div>

          </div>

          <div class="column items-end q-mb-sm"
            :class="{ 'col-12 flex-center': $q.screen.lt.sm }">

            <span class="text-weight-medium q-mb-sm">
              Saldo: {{ floatToMoney(store.account.balance) }}
            </span>

            <span class="text-body2 text-weight-regular q-mb-sm">
              Limite diário: {{ floatToMoney(store.account.daily_limit) }}
            </span>

            <span class="text-body2 text-weight-regular q-mb-sm">
              Saldo do dia: {{ floatToMoney(store.account.day_balance) }}
            </span>

            <q-toggle :label="parseInt(statusDependent) === 1 ? 'Desativar consumidor' : 'Ativar consumidor'"
              v-model="statusDependent"
              :true-value="1"
              :false-value="2"
              style="border: 1px solid grey"
              class="q-py-sm q-px-md rounded-borders"
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
import { defineComponent, computed, ref } from 'vue'
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
    const statusDependent = computed(() => store.account.status)
    const accessKey = computed(() => {
      if (store.dependent.access_key) {
        return [store.dependent.access_key.slice(0, 3), store.dependent.access_key.slice(3)]
      }
      return null
    })

    const showAccessKey = computed(() => {
      if (store.isDependent || store.isResponsibleDependent) {
        return (store.isDependent || parseInt(store.userDependent.id) !== parseInt(store.dependent.id))
      }
      return true
    })

    const gender = (gender) => {
      return gender === 'M' ? 'Masculino' : 'Feminino'
    }

    const handleBlockAccount = async (value) => {
      try {
        const { message } = await store.axios({
          method: 'put',
          url: `api/v1/accounts/${store.account.id}/block`,
          data: { activate: parseInt(value) === 1 }
        })
        store.account.status = value
        store.disabledUser = parseInt(store.account.status) === 2
        notifySuccess(message)
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
      gender,
      showAccessKey,
      accessKey
    }
  }
})
</script>
