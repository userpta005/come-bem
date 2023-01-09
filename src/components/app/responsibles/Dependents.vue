<template>
  <div class="row q-col-gutter-md"
    :class="{ 'flex-center': $q.screen.lt.sm }">

    <div v-show="dependent.accounts.length"
      v-for="(dependent, index) in store.dependents"
      :key="index">

      <div class="column flex-center rounded-borders"
        style="border: 3px solid var(--orange); min-width: 250px; min-height: 350px;"
        :style="$q.screen.lt.sm ? 'min-width: 300px;' : ''"
        v-if="dependent.accounts.length">

        <q-img src="~assets/child.png"
          style="height: 90px; width: 70px;"
          class="q-mb-xs" />

        <h6 class="no-margin text-weight-medium">
          {{ dependent.people.name }}
        </h6>

        <SelectAccount :dependent="dependent"
          :account="dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex]"
          :dependentIndex="index" />

        <span class="text-weight-medium text-subtitle2 q-ma-sm">
          Saldo: {{ floatToMoney(dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex].balance) }}
        </span>

        <span class="text-weight-regular text-subtitle2 text-main-secondary q-mb-xs">
          Consumidor: {{ status(dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex].status) }}
          <q-separator />
        </span>

        <span class="text-weight-medium text-grey-9 text-caption self-start q-ml-lg q-mb-xs">
          Nascimento: {{ brDate(dependent.people.birthdate) }}
        </span>

        <span class="text-weight-medium text-grey-9 text-caption self-start q-ml-lg q-mb-md">
          Sexo: {{ gender(dependent.people.gender) }}
        </span>

        <q-btn label="Ver detalhes"
          color="main-primary"
          text-color="white"
          no-caps
          style="width: 82%;"
          @click="toGoDependent(dependent, index)" />

      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import useStorageStore from 'src/stores/storage'
import SelectAccount from 'components/app/responsibles/SelectAccount.vue'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'ResponsibleDependents',
  components: {
    SelectAccount
  },
  setup () {
    const { notifyError } = notify()
    const store = useStorageStore()
    const router = useRouter()

    const status = (status) => {
      return parseInt(status) === 1 ? 'Ativo' : 'Inativo'
    }

    const gender = (gender) => {
      return gender === 'M' ? 'Masculino' : 'Feminino'
    }

    const handleGetDependents = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: `/api/v1/clients/${store.userClient.id}/dependents` })
        store.setDependents(data)
      } catch (error) {
        notifyError(error)
      }
    }

    const toGoDependent = (dependent, index) => {
      store.setDependent(dependent, index)
      store.mainContent = 'QCalendar'
      router.push({
        name: 'responsible-dependent',
        params: {
          dependent: store.dependent.id,
          account: store.account.id
        }
      })
    }

    handleGetDependents()

    return {
      floatToMoney,
      brDate,
      store,
      status,
      gender,
      toGoDependent
    }
  }
})
</script>
