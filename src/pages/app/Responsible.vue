<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm">
      <div class="text-h5">
        Seja Bem-vindo
        <q-separator color="main-primary" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-9 col-xs-12 q-pa-sm">
        <SectionDependents />
      </div>
      <SidebarActions class="col-md-3 col-xs-12"
        :class="$q.screen.lt.md ? 'order-first' : ''" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SectionDependents from 'src/components/app/SectionDependents.vue'
import SidebarActions from 'src/components/app/SidebarActions.vue'

export default defineComponent({
  name: 'ResponsiblePage',
  components: {
    SectionDependents,
    SidebarActions
  }
})
</script>
