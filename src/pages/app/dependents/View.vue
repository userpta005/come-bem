<template>
  <q-page style="min-height: auto; height:auto;"
    class="row reverse-wrap justify-center">
    <div class="col-lg col-xs-12 q-ma-sm">
      <DependentHeader />
      <QCalendar />
    </div>
    <SidebarActions />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import DependentHeader from 'src/components/app/dependents/DependentHeader.vue'
import SidebarActions from 'src/components/app/common/SidebarActions.vue'
import useStorageStore from 'src/stores/storage'
import QCalendar from 'src/components/app/dependents/QCalendar.vue'

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
