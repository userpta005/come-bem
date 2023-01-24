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
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'MainLayout',

  components: {
    PortalHeader,
    PortalCarousel,
    PortalFooter
  },

  setup () {
    const { notifyError } = notify()
    const store = useStorageStore()

    const slides = ref([
      { img_url: 'imgs/banner-1.jpg' },
      { img_url: 'imgs/banner-2.jpg' },
      { img_url: 'imgs/banner-3.jpg' }
    ])

    const handleGetSetting = async () => {
      try {
        const { data } = await store.axios({
          url: '/api/v1/settings'
        })
        store.setting = data[0]
      } catch (error) {
        notifyError(error)
      }
    }

    handleGetSetting()

    return {
      slides
    }
  }
})
</script>
