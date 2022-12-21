<template>
  <artcile class="row">
    <div class="col-md-3 col-sm-6 col-xs-12 row no-wrap"
      v-for="(item, index)  in content"
      :key="index">
      <div class="col-auto flex flex-center q-pa-sm">
        <q-icon :name="item.iconName"
          :size="item.iconSize" />
      </div>
      <div class="col-shrink flex items-center q-pa-sm">
        <span>{{ item.text }}</span>
      </div>
    </div>
  </artcile>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleContent',
  props: {
    content: {
      type: Array
    }
  }
})
</script>
