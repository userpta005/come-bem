<template>
  <div class="row">
    <div class="col-md-3 col-xs-12 row pa-responsive-xs"
      v-for="(item, index)  in content"
      :key="index">
      <div class="col-2 flex flex-center">
        <q-icon :name="item.iconName"
          :size="item.iconSize" />
      </div>
      <div class="col-10 flex items-center pa-responsive-xs">
        <div class="text-body1">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InternalContentTop',
  props: {
    content: {
      type: Array
    }
  }
})
</script>
