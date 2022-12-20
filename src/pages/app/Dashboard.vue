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
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'DashboardPage',
  setup () {
    const store = useStorageStore()

    const responsibleRoute = ref({ name: 'dashboard' })
    if (store.isResponsible || store.isResponsibleDependent) {
      responsibleRoute.value = {
        name: 'responsible',
        params: { responsible: store.userClient.id }
      }
    }

    const dependentRoute = ref({ name: 'dashboard' })
    if (store.isDependent || store.isResponsibleDependent) {
      store.dependent = store.userDependent
      store.account = store.dependent.accounts[0]
      dependentRoute.value = {
        name: 'dependent',
        params: { dependent: store.dependent.id, account: store.account.id }
      }
    }

    return {
      store,
      dependentRoute,
      responsibleRoute
    }
  }
})
</script>
