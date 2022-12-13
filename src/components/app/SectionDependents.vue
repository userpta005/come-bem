<template>
  <div class="row"
    :class="$q.screen.lt.md ? 'flex-center' : '' ">
    <div class="q-pa-xs"
      v-for="(dependent, index) in dependentes"
      :key="index">
      <div style="border: 0.15rem solid var(--orange); width: 200px;"
        class="column flex-center rounded-borders q-pa-sm">
        <q-icon name="mdi-baby-face-outline"
          size="4rem" />
        <div class="text-subtitle1 text-weight-medium">
          {{ dependent.name }}
        </div>
        <div class="text-subtitle2 text-weight-light q-mb-xs">
          {{ dependent.accounts[0].store.people.name }}
        </div>
        <div class="text-caption text-weight-medium q-mb-xs">
          Saldo: R${{ formatCurrency(dependent.accounts[0].balance) }}
        </div>
        <div class="text-caption text-weight-regular text-main-secondary q-mb-xs">
          Consumidor: {{ dependent.attr_status }}
          <q-separator />
        </div>
        <div class="text-caption text-weight-light self-start">
          Nascimento: {{ dependent.birthdate }}
        </div>
        <div class="text-caption text-weight-light self-start q-mb-xs">
          Sexo: {{ dependent.gender == 'M' ? 'Masculino' : 'Feminino' }}
        </div>
        <q-btn color="main-primary"
          text-color="white"
          size="sm"
          label="Quero saber mais" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { SessionStorage } from 'quasar'
import { formatCurrency } from 'src/utils/format'

export default defineComponent({
  name: 'SectionDependents',
  setup () {
    const user = SessionStorage.getItem('user')
    const dependentes = ref(user.people.client.dependents)
    return {
      dependentes,
      formatCurrency
    }
  }
})
</script>
