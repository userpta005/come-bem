<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pb-xl">
      <div class="text-h5">
        Escolha seu perfil
        <q-separator color="main-primary" />
      </div>
    </div>
    <q-btn flat
      class="q-mr-md"
      :to="{ name: 'responsible' }">
      <div class="column flex-center">
        <q-icon name="mdi-human-male-boy"
          size="6rem" />
        Responsável/Pai
      </div>
    </q-btn>
    <q-btn flat
      :to="{ name: 'dependent' }">
      <div class="column flex-center">
        <q-icon name="mdi-human-child"
          size="6rem" />
        Consumidor/Filho
      </div>
    </q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PainelPage'
})
</script>
