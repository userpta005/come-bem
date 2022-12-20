<template>
  <q-page class="pa-responsive-md">
    <div class="row">
      <div class="col-md-9 col-xs-12 self-start q-pa-sm">
        <DependentHeader />
      </div>
      <SidebarActions class="col-md-3 col-xs-12 self-center"
        :class="{ 'order-first': $q.screen.lt.md }" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import DependentHeader from 'src/components/app/DependentHeader.vue'
import SidebarActions from 'src/components/app/SidebarActions.vue'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    DependentHeader,
    SidebarActions
  },
  setup () {
    const store = useStorageStore()
    store.requestUser()
    return {}
  }
})
</script>
