<template>
  <div class="q-pa-sm">
    <div style="border: 0.08rem solid var(--orange);"
      :style="$q.screen.gt.sm ? 'min-height: 65vh' : ''"
      class="column rounded-borders q-pa-sm">
      <div class="text-subtitle1 text-center q-mb-md">
        Ações
        <q-separator color="black"
          size="0.02rem" />
      </div>
      <div class="q-px-md column">
        <q-btn label="Adicionar consumidor"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          :to="{ name: 'responsible-dependent-create' }"
          v-if="['responsible'].includes($route.name)" />

        <q-btn label="Recarregar créditos"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Cardápio"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Bloquear dispositivos"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent'].includes($route.name)" />

        <q-btn label="Habilitar celular"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent'].includes($route.name)" />

        <q-btn label="Limite diário"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent'].includes($route.name)" />

        <q-btn label="Histórico de consumo"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Histórico financeiro"
          size="sm"
          class="bg-main-quaternary q-mb-sm"
          text-color="white"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Voltar"
          size="sm"
          outline
          :to="{ name: backTo }" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SidebarActions',
  setup () {
    const route = useRoute()
    const backTo = computed(() => {
      return route.name === 'responsible-dependent' ? 'responsible' : 'dashboard'
    })
    return {
      backTo
    }
  }
})
</script>
