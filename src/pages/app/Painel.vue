<template>
  <q-page class="flex flex-center">
    <div v-if="$q.sessionStorage.has('user')">
      <p>Hello {{ $q.sessionStorage.getItem('user').name }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PainelPage'
})
</script>
