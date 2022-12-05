<template>
  <!-- Atenção essa class footer-container não faz nada -->
  <div class="footer-container">
    <footer-top />
    <footer-bottom />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FooterTop from 'src/components/layouts/portal/footers/FooterTop.vue'
import FooterBottom from 'components/layouts/portal/footers/FooterBottom.vue'

export default defineComponent({
  name: 'CustomFooter',
  components: {
    FooterTop,
    FooterBottom
  },
  setup () {
    return {}
  }
})
</script>
