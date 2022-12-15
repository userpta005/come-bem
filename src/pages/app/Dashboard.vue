<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm">
      <div class="text-h5">
        Escolha seu perfil
        <q-separator color="main-primary" />
      </div>
    </div>
    <q-btn flat
      class="q-pa-sm"
      :disable="isDependent && !isResponsibleDependent"
      :to="{ name: 'responsible', params: { responsible: client.id } }">
      <div class="column flex-center">
        <q-icon name="mdi-human-male-boy"
          size="6rem" />
        Responsável/Pai
      </div>
    </q-btn>
    <q-btn flat
      class="q-pa-sm"
      :disable="isResponsible && !isResponsibleDependent"
      :to="{ name: 'dependent', params: { dependent: dependent.id } }">
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
  setup () {
    const user = ref(SessionStorage.getItem('user'))
    const client = ref(user.value.people.client)
    const dependent = ref(user.value.people.dependent)
    const isResponsible = ref(!!client.value && !dependent.value)
    const isDependent = ref(!client.value && !!dependent.value)
    const isResponsibleDependent = ref(isResponsible.value && isDependent.value)
    return {
      client,
      dependent,
      isResponsible,
      isDependent,
      isResponsibleDependent
    }
  }
})
</script>
