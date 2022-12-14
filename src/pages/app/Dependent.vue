<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm"
      :class="{ 'flex-center': $q.screen.lt.md }">
      <div class="text-h5">
        Seja Bem-vindo
        <q-separator color="main-primary" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-9 col-xs-12"></div>
      <SidebarActions class="col-md-3 col-xs-12"
        :class="{ 'order-first': $q.screen.lt.md }" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SidebarActions from 'src/components/app/SidebarActions.vue'

export default defineComponent({
  name: 'DependentPage',
  components: {
    SidebarActions
  }
})
</script>
