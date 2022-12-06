<template>
    <div class="bg-blue-grey-9 text-white"
      :class="dynamicSpacing">
      <div class="q-py-sm"
        :class="dynamicSpacing">
        <div class="row">
          <div class="col-md-auto col-xs-12">
            <div class="text-subtitle2 text-center">CNPJ: 00.000.000/0001-00</div>
          </div>
          <q-space />
          <div class="col-md-auto col-xs-12">
            <div class="text-subtitle2 text-center"
              :class="[$q.platform.is.desktop ? 'q-mr-sm' : '']">Desenvolvido por</div>
          </div>
          <div class="col-md-auto col-xs-12 row items-center justify-center">
            <img src="/imgs/dix-digital-logo-horizontal-branca.png"
              style="max-height: 22px" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FooterBottom',
  props: {},
  setup () {
    const $q = useQuasar()
    const dynamicSpacing = computed(() => ({
      'q-px-xl': $q.platform.is.desktop,
      'q-px-md': $q.platform.is.mobile
    }))
    return {
      dynamicSpacing
    }
  }
})
</script>
