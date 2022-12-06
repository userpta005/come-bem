<template>
  <q-page>
    <ResponsivePadding>
      <div class="flex flex-center column">
        <p>Para pais</p>
      </div>
    </ResponsivePadding>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ResponsivePadding from 'src/components/ResponsivePadding.vue'

export default defineComponent({
  name: 'ToParentsPage',
  components: {
    ResponsivePadding
  }
})
</script>
