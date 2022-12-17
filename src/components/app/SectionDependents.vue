<template>
  <div class="row q-pa-sm"
    :class="{ 'flex-center': $q.screen.lt.md }">
    <div class="q-pa-xs"
      v-show="dependent.accounts.length"
      v-for="(dependent, index) in dependents"
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
          <SelectAccount @select-account="(account, accountIndex) => selectAccount(index, accountIndex)"
            :accounts="dependent.accounts" />
        </div>
        <div class="text-caption text-weight-medium q-mb-xs">
          Saldo: {{ floatToMoney(dependent.accounts[dependent.accountIndex ?? 0].balance) }}
        </div>
        <div class="text-caption text-weight-regular text-main-secondary q-mb-xs">
          Consumidor: {{ dependent.accounts[dependent.accountIndex ?? 0].status === 1 ? 'Ativo' : 'Inativo' }}
          <q-separator />
        </div>
        <div class="text-caption text-weight-light self-start">
          Nascimento: {{ brDate(dependent.birthdate) }}
        </div>
        <div class="text-caption text-weight-light self-start q-mb-xs">
          Sexo: {{ dependent.gender == 'M' ? 'Masculino' : 'Feminino' }}
        </div>
        <q-btn color="main-primary"
          text-color="white"
          size="sm"
          label="Quero saber mais"
          :to="{
            name: 'responsible-dependent',
            params: {
              dependent: dependent.id,
              account: dependent.accounts[dependent.accountIndex ?? 0].id
            }
          }" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import SelectAccount from 'components/app/SelectAccount.vue'
import useApi from 'src/composables/UseApi'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'SectionDependents',
  components: {
    SelectAccount
  },
  setup () {
    const { requestUser, getDependents } = useApi()
    const { notifyError } = notify()
    const dependents = ref(getDependents())

    const selectAccount = (dependentIndex, accountIndex) => {
      dependents.value[dependentIndex].accountIndex = accountIndex
    }

    const refreshLocalData = async () => {
      try {
        await requestUser()
        dependents.value = getDependents()
      } catch (error) {
        notifyError(error.message)
      }
    }

    refreshLocalData()

    return {
      floatToMoney,
      brDate,
      dependents,
      selectAccount
    }
  }
})
</script>
