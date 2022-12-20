<template>
  <div class="row q-pa-sm"
    :class="{ 'flex-center': $q.screen.lt.md }">
    <div class="q-pa-xs"
      v-for="(dependent, index) in store.userClient.dependents"
      :key="index"
      v-show="dependent.accounts.length">
      <div style="border: 0.15rem solid var(--orange); width: 200px;"
        class="column flex-center rounded-borders q-pa-sm"
        v-if="dependent.accounts.length">
        <q-icon name="mdi-baby-face-outline"
          size="4rem" />
        <div class="text-subtitle1 text-weight-medium">
          {{ dependent.people.name }}
        </div>
        <div class="text-subtitle2 text-weight-light q-mb-xs">
          <SelectAccount :dependent="dependent"
            :account="dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex]"
            :dependentIndex="index" />
        </div>
        <div class="text-caption text-weight-medium q-mb-xs">
          Saldo: {{ floatToMoney(dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex].balance) }}
        </div>
        <div class="text-caption text-weight-regular text-main-secondary q-mb-xs">
          Consumidor: {{ status(dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex].status) }}
          <q-separator />
        </div>
        <div class="text-caption text-weight-light self-start">
          Nascimento: {{ brDate(dependent.birthdate) }}
        </div>
        <div class="text-caption text-weight-light self-start q-mb-xs">
          Sexo: {{ gender(dependent.gender) }}
        </div>
        <q-btn color="main-primary"
          text-color="white"
          size="sm"
          label="Quero saber mais"
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
  name: 'SectionDependents',
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
      store.dependentId = store.dependent.id
      store.accounts = store.dependent.accounts
      store.account = store.dependent.accounts[store.dependentIndexes[`index${index}`].accountIndex]
      store.accountId = store.account.id
      store.hasUser = !!store.dependent.people.user
      store.disableButtons = parseInt(store.account.status) === 2
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
