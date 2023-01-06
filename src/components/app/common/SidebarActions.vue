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

        <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          align="left"
          :to="{ name: 'responsible' }"
          v-if="['responsible-dependent'].includes($route.name)">
          <q-img src="~assets/miudo.png"
            height="20px"
            width="20px"
            style="margin-right: 12px;" />
          Consumidores
        </q-btn>

        <BtnReloadCredits v-if="['responsible-dependent', 'dependent'].includes($route.name)" />

        <BtnDailyLimit v-if="['responsible-dependent'].includes($route.name)" />

        <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          align="left"
          @click="store.mainContent = 'LimitProduts'"
          :disable="store.disableButtons"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)">
          <q-img src="~assets/cardapio.png"
            height="20px"
            width="20px"
            style="margin-right: 12px;" />
          Cardápio
        </q-btn>

        <BtnEnablePhone v-if="['responsible-dependent'].includes($route.name)" />

        <BtnDisableDevice v-if="['responsible-dependent'].includes($route.name)" />

        <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          align="left"
          @click="store.mainContent = 'FinancialHistory'"
          :disable="store.disableButtons"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)">
          <q-img src="~assets/saco-de-dinheiro-em-dolares-na-mao.png"
            height="20px"
            width="20px"
            style="margin-right: 12px;" />
          Conta correnta
        </q-btn>

        <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          align="left"
          @click="store.mainContent = 'ConsumptionHistory'"
          :disable="store.disableButtons"
          v-if="['responsible-dependent', 'dependent'].includes($route.name)">
          <q-img src="~assets/historico.png"
            height="20px"
            width="20px"
            style="margin-right: 12px;" />
          Histórico de consumo
        </q-btn>

        <q-btn label="Adicionar consumidor"
          class="text-weight-regular bg-main-quaternary q-mb-sm"
          text-color="white"
          no-caps
          icon="mdi-plus-circle"
          align="left"
          :to="{ name: 'responsible-dependent-create' }"
          v-if="['responsible'].includes($route.name)" />

        <q-btn label="Voltar"
          class="text-weight-regular q-mb-md"
          outline
          no-caps
          icon="mdi-keyboard-backspace"
          align="left"
          :to="{ name: 'dashboard' }"
          v-if="['responsible', 'dependent'].includes($route.name)" />
      </div>

    </div>

  </div>
</template>

<script>
import useStorageStore from 'src/stores/storage'
import { defineComponent } from 'vue'
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
    const store = useStorageStore()

    return {
      store
    }
  }
})
</script>
