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
      :disable="store.isDependent && !store.isResponsibleDependent"
      :to="responsibleRoute">
      <div class="column flex-center">
        <q-icon name="mdi-human-male-boy"
          size="6rem" />
        Responsável/Pai
      </div>
    </q-btn>
    <q-btn flat
      class="q-pa-sm"
      :disable="store.isResponsible && !store.isResponsibleDependent"
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
import { defineComponent, computed } from 'vue'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'DashboardPage',
  setup () {
    const store = useStorageStore()

    const responsibleRoute = computed(() => {
      if (store.isResponsible || store.isResponsibleDependent) {
        return {
          name: 'responsible',
          params: { responsible: store.userClient.id }
        }
      }
      return { name: 'dashboard' }
    })

    const dependentRoute = computed(() => {
      if (store.isDependent || store.isResponsibleDependent) {
        return {
          name: 'dependent',
          params: { dependent: store.userDependent.id, account: store.account.id }
        }
      }
      return { name: 'dashboard' }
    })

    return {
      store,
      dependentRoute,
      responsibleRoute
    }
  }
})
</script>
