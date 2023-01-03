<template>
  <q-page style="min-height: auto; height:auto;"
    :class="{ 'column items-center': $q.screen.lt.sm }">

    <CustomTitle title="Seja bem-vindo" />

    <div class="row q-col-gutter-md"
      :class="$q.screen.gt.xs ? 'no-wrap justify-between' : 'flex flex-center'">
      <Dependents />
      <SidebarActions />
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Dependents from 'src/components/app/responsibles/Dependents.vue'
import SidebarActions from 'src/components/app/common/SidebarActions.vue'
import CustomTitle from 'src/components/app/common/CustomTitle.vue'

export default defineComponent({
  name: 'ResponsibleViewPage',
  components: {
    CustomTitle,
    Dependents,
    SidebarActions
  }
})
</script>
