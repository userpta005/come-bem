<template>
  <div class="row q-col-gutter-md"
    :class="{ 'flex-center': $q.screen.lt.sm }">

    <div v-show="dependent.accounts.length"
      v-for="(dependent, index) in store.userClient.dependents"
      :key="index">

      <div class="column flex-center rounded-borders"
        style="border: 2px solid var(--orange); min-width: 250px; min-height: 350px;"
        :style="$q.screen.lt.sm ? 'min-width: 300px;' : ''"
        v-if="dependent.accounts.length">

        <q-img src="/src/assets/child.png"
          style="height: 100px; width: 80px;"
          class="q-mb-xs" />

        <span class="text-weight-medium">
          {{ dependent.people.name }}
        </span>

        <SelectAccount :dependent="dependent"
          :account="dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex]"
          :dependentIndex="index" />

        <span class="text-weight-medium q-mb-xs">
          Saldo: {{ floatToMoney(dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex].balance) }}
        </span>

        <span class="text-weight-regular text-main-secondary q-mb-xs">
          Consumidor: {{ status(dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex].status) }}
          <q-separator />
        </span>

        <span class="text-weight-regular q-mb-xs">
          Nascimento: {{ brDate(dependent.birthdate) }}
        </span>

        <span class="text-weight-regular q-mb-xs">
          Sexo: {{ gender(dependent.gender) }}
        </span>

        <q-btn label="Ver detalhes"
          color="main-primary"
          text-color="white"
          no-caps
          style="width: 80%;"
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

export default defineComponent({
  name: 'ResponsibleDependents',
  components: {
    SelectAccount
  },
  setup () {
    const store = useStorageStore()
    const router = useRouter()
    store.requestUser()

    const status = (status) => {
      return parseInt(status) === 1 ? 'Ativo' : 'Inativo'
    }
    const gender = (gender) => {
      return gender === 'M' ? 'Masculino' : 'Feminino'
    }

    const toGoDependent = (dependent, index) => {
      store.dependent = dependent
      store.account = store.dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex]
      store.hasUser = !!store.dependent.people.user
      store.disableButtons = parseInt(store.account.status) === 2
      store.mainContent = 'QCalendar'
      store.purchaseDate = null
      store.cart = []
      store.app_token = store.account.store.app_token
      router.push({
        name: 'responsible-dependent',
        params: {
          dependent: store.dependent.id,
          account: store.account.id
        }
      })
    }

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
