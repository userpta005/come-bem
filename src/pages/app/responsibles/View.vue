<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm"
      :class="{ 'flex-center': $q.screen.lt.md }">
      <div class="text-h5">
        Seja Bem-vindo
        <q-separator color="main-primary" style="height: 0.12rem;" />
      </div>
    </div>
    <div class="row">
      <SectionDependents class="col-md-9 col-xs-12" />
      <!-- <SidebarActions class="col-md-3 col-xs-12"
        :class="{ 'order-first': $q.screen.lt.md }" /> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SectionDependents from 'src/components/app/SectionDependents.vue'
// import SidebarActions from 'src/components/app/SidebarActions.vue'

export default defineComponent({
  name: 'ResponsibleViewPage',
  components: {
    SectionDependents
    // SidebarActions
  }
})
</script>
