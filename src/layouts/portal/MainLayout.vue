<template>
  <q-layout view="lHh Lpr lFf">

    <custom-header />

    <q-page-container>
      <router-view />
    </q-page-container>

    <custom-footer />

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import CustomHeader from 'components/layouts/portal/CustomHeader.vue'
import CustomFooter from 'components/layouts/portal/CustomFooter.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CustomHeader,
    CustomFooter
  },

  setup () {
    return {}
  }
})
</script>
