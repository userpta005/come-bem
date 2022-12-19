<template>
  <div class="row q-pa-sm"
    :class="{ 'flex-center': $q.screen.lt.md }">
    <div class="q-pa-xs"
      v-show="dependent.accounts.length"
      v-for="(dependent, index) in store.dependents"
      :key="index">
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
            :account="dependent.account ? dependent.account : dependent.accounts[0]" />
        </div>
        <div class="text-caption text-weight-medium q-mb-xs">
          Saldo: {{ floatToMoney(dependent.account ? dependent.account.balance : dependent.accounts[0].balance) }}
        </div>
        <div class="text-caption text-weight-regular text-main-secondary q-mb-xs">
          Consumidor: {{ status(dependent.account ? dependent.account.status : dependent.accounts[0].status) }}
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
          :to="{
            name: 'responsible-dependent',
            params: {
              dependent: dependent.id,
              account: dependent.account ? dependent.account.id : dependent.accounts[0].id
            }
          }" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import useStorageStore from 'src/stores/storage'
import SelectAccount from 'components/app/SelectAccount.vue'

export default defineComponent({
  name: 'SectionDependents',
  components: {
    SelectAccount
  },
  setup () {
    const store = useStorageStore()
    const status = (status) => {
      return status === 1 ? 'Ativo' : 'Inativo'
    }
    const gender = (gender) => {
      return gender === 'M' ? 'Masculino' : 'Feminino'
    }
    store.requestUser()

    return {
      floatToMoney,
      brDate,
      store,
      status,
      gender
    }
  }
})
</script>
