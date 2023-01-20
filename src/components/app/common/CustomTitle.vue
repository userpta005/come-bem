<template>
  <div class="flex">
    <span class="q-pb-lg text-weight-regular"
      :class="size ?? 'text-h5'">
      {{ title }}
      <q-separator color="main-primary q-mt-sm" />
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomTitle',
  props: ['title', 'size']
})
</script>
