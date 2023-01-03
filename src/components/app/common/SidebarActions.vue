<template>
  <div>
    <div style="border: 2px solid var(--orange); min-width: 300px;"
      class="column rounded-borders"
      :style="$q.screen.gt.sm ? 'min-height: 600px;' : ''">

      <div class="col-shrink column q-px-sm q-my-md">
        <h6 class="no-margin text-center">
          Ações
          <q-separator color="black" />
        </h6>
      </div>

      <div class="col-grow column justify-start q-px-lg">

        <q-btn label="Adicionar consumidor"
          class="text-weight-regular bg-main-quaternary q-mb-md"
          text-color="white"
          no-caps
          :to="{ name: 'responsible-dependent-create' }"
          v-if="['responsible'].includes($route.name)" />

        <BtnReloadCredits v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Cardápio"
          class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          @click="store.mainContent = 'LimitProduts'"
          :disable="store.disableButtons"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <BtnDisableDevice v-if="['responsible-dependent'].includes($route.name)" />

        <BtnEnablePhone v-if="['responsible-dependent'].includes($route.name)" />

        <BtnDailyLimit v-if="['responsible-dependent'].includes($route.name)" />

        <q-btn label="Histórico de consumo"
          class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          @click="store.mainContent = 'ConsumptionHistory'"
          :disable="store.disableButtons"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Histórico financeiro"
          class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          @click="store.mainContent = 'FinancialHistory'"
          :disable="store.disableButtons"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <q-btn label="Voltar"
          class="text-weight-regular q-mb-md"
          outline
          no-caps
          :to="{ name: backTo }" />
      </div>

    </div>

  </div>
</template>

<script>
import useStorageStore from 'src/stores/storage'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import BtnReloadCredits from 'src/components/app/common/BtnReloadCredits.vue'
import BtnDisableDevice from 'src/components/app/common/BtnDisableDevice.vue'
import BtnEnablePhone from 'src/components/app/common/BtnEnablePhone.vue'
import BtnDailyLimit from 'src/components/app/common/BtnDailyLimit.vue'

export default defineComponent({
  name: 'SidebarActions',
  components: {
    BtnReloadCredits,
    BtnDisableDevice,
    BtnEnablePhone,
    BtnDailyLimit
  },
  setup () {
    const route = useRoute()
    const store = useStorageStore()

    const backTo = computed(() => {
      return route.name === 'responsible-dependent' ? 'responsible' : 'dashboard'
    })

    return {
      store,
      backTo
    }
  }
})
</script>
