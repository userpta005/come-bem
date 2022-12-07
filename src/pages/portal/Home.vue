<template>
  <q-page class="column justify-between">
    <div class="text-center">Home</div>
    <NewsLetter />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import NewsLetter from 'components/portal/others/NewsLetter.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    NewsLetter
  }
})
</script>
