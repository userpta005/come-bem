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
          :to="{ name: 'new-dependent' }" />
        <q-btn label="Voltar"
          size="sm"
          outline
          :to="{ name: 'painel' }" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarActions'
})
</script>
