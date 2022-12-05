<template>
  <!-- Atenção essa class footer-container não faz nada -->
  <div class="footer-container">
    <footer-top />
    <footer-bottom />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'
import FooterTop from 'src/components/layouts/portal/footers/FooterTop.vue'
import FooterBottom from 'components/layouts/portal/footers/FooterBottom.vue'

export default defineComponent({
  name: 'CustomFooter',
  components: {
    FooterTop,
    FooterBottom
  },
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
