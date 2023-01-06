<template>
  <div class="flex">
    <h5 class="no-margin q-pb-lg text-weight-regular">
      {{ title }}
      <q-separator color="main-primary" />
    </h5>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomTitle',
  props: ['title']
})
</script>
