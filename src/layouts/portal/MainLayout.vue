<template>
  <q-layout view="lHh Lpr lFf">

    <PortalHeader />

    <q-page-container>
      <PortalCarousel :slides="slides"
        v-if="['homeDefault', 'home', 'to-parents', 'to-entrepreneurs'].includes($route.name)" />
      <router-view />
    </q-page-container>

    <PortalFooter />

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import PortalHeader from 'src/components/portal/layouts/PortalHeader.vue'
import PortalCarousel from 'src/components/portal/common/PortalCarousel.vue'
import PortalFooter from 'src/components/portal/layouts/PortalFooter.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    PortalHeader,
    PortalCarousel,
    PortalFooter
  },

  setup () {
    const slides = ref([
      { img_url: 'imgs/banner-1.jpg' },
      { img_url: 'imgs/banner-2.jpg' },
      { img_url: 'imgs/banner-3.jpg' }
    ])
    return {
      slides
    }
  }
})
</script>
