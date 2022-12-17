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
import { SessionStorage } from 'quasar'
import useApi from 'src/composables/UseApi'
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
  setup () {
    const { isResponsible, isResponsibleDependent, isDependent } = useApi()
    const user = ref(SessionStorage.getItem('user'))
    const client = ref(user.value.people.client)
    const dependent = ref(user.value.people.dependent)

    const dependentRoute = computed(() => {
      if (isDependent() || isResponsibleDependent()) {
        return {
          name: 'dependent',
          params: { dependent: dependent.value.id, account: dependent.value.accounts[0].id }
        }
      }
      return { name: 'dashboard' }
    })
    const responsibleRoute = computed(() => {
      if (isResponsible() || isResponsibleDependent()) {
        return {
          name: 'responsible',
          params: { responsible: client.value.id }
        }
      }
      return { name: 'dashboard' }
    })
    return {
      client,
      dependent,
      isResponsible,
      isDependent,
      isResponsibleDependent,
      dependentRoute,
      responsibleRoute
    }
  }
})
</script>
