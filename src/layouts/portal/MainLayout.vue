<template>
  <q-layout view="lHh Lpr lFf">

    <custom-header />

    <q-page-container>
      <custom-carousel v-if="['homeDefault', 'home', 'to-parents', 'to-entrepreneurs'].includes($route.name)" />
      <router-view />
    </q-page-container>

    <custom-footer />

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import CustomHeader from 'components/portal/layouts/CustomHeader.vue'
import CustomFooter from 'components/portal/layouts/CustomFooter.vue'
import CustomCarousel from 'src/components/portal/others/CustomCarousel.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CustomHeader,
    CustomFooter,
    CustomCarousel
  },

  setup () {
    return {}
  }
})
</script>
