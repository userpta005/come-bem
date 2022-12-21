<template>
  <!-- Atenção essa class footer-container não faz nada -->
  <div class="footer">
    <TopContent />
    <BottomContent />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TopContent from 'src/components/portal/layouts/footers/TopContent.vue'
import BottomContent from 'src/components/portal/layouts/footers/BottomContent.vue'

export default defineComponent({
  name: 'PortalFooter',
  components: {
    TopContent,
    BottomContent
  }
})
</script>
