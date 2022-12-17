<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm">
      <div class="text-h5">
        Escolha seu perfil
        <q-separator color="main-primary"
          style="height: 0.12rem;" />
      </div>
    </div>
    <q-btn flat
      class="q-pa-sm"
      :disable="isDependent() && !isResponsibleDependent()"
      :to="responsibleRoute">
      <div class="column flex-center">
        <q-icon name="mdi-human-male-boy"
          size="6rem" />
        Responsável/Pai
      </div>
    </q-btn>
    <q-btn flat
      class="q-pa-sm"
      :disable="isResponsible() && !isResponsibleDependent()"
      :to="dependentRoute">
      <div class="column flex-center">
        <q-icon name="mdi-human-child"
          size="6rem" />
        Consumidor/Filho
      </div>
    </q-btn>
  </q-page>
</template>

<script>
import useApi from 'src/composables/UseApi'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
  setup () {
    const {
      getUserClientId,
      getUserDependentId,
      getAccountId,
      isResponsible,
      isResponsibleDependent,
      isDependent
    } = useApi()

    const dependentRoute = computed(() => {
      if (isDependent() || isResponsibleDependent()) {
        return {
          name: 'dependent',
          params: { dependent: getUserDependentId(), account: getAccountId() }
        }
      }
      return { name: 'dashboard' }
    })

    const responsibleRoute = computed(() => {
      if (isResponsible() || isResponsibleDependent()) {
        return {
          name: 'responsible',
          params: { responsible: getUserClientId() }
        }
      }
      return { name: 'dashboard' }
    })

    return {
      isResponsible,
      isDependent,
      isResponsibleDependent,
      dependentRoute,
      responsibleRoute
    }
  }
})
</script>
