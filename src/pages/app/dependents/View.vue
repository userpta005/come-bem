<template>
  <q-page class="pa-responsive-md">
    <div class="row">
      <div class="col-md-9 col-xs-12 self-start q-pa-sm">
        <DependentHeader />
        <QCalendar />
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
import QCalendar from 'src/components/app/QCalendar.vue'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    DependentHeader,
    SidebarActions,
    QCalendar
  },
  setup () {
    const store = useStorageStore()
    store.requestUser()
    return {}
  }
})
</script>
