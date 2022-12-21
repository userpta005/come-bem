<template>
  <q-page style="min-height: auto; height:auto;">
    <div class="flex q-pa-sm"
      :class="{ 'flex-center': $q.screen.lt.md }">
      <h6 class="no-margin">
        Seja bem vindo
        <q-separator color="main-primary"
          size="0.12rem" />
      </h6>
    </div>
    <div class="row"
      :class="$q.screen.gt.sm ? 'justify-between no-wrap' : 'flex flex-center'">
      <Dependents />
      <SidebarActions :class="{ 'order-first': $q.screen.lt.md }" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Dependents from 'src/components/app/responsibles/Dependents.vue'
import SidebarActions from 'src/components/app/common/SidebarActions.vue'

export default defineComponent({
  name: 'ResponsibleViewPage',
  components: {
    Dependents,
    SidebarActions
  }
})
</script>
