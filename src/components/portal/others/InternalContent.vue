<template>
  <div class="row">
    <div class="col text-h5 text-weight-bold text-brown-7 text-center q-pa-md">
      {{ content.title.label }}
    </div>
    <div class="col-12"
      v-for="(item, index)  in content.items"
      :key="index">
      <div class="row q-pa-md">
        <div class="col-2 flex flex-center">
          <q-icon :name="item.iconName"
            :size="item.iconSize" />
        </div>
        <div class="col-10 q-pl-md">
          <div class="text-subtitle1 text-weight-bold">{{ item.title }}</div>
          <div class="text-body1">{{ item.text }}</div>
        </div>
      </div>
      <q-separator v-if="(content.items.length != (index + 1))" />
    </div>
    <div class="col-12 q-pa-md flex flex-center">
      <q-btn color="main-primary"
        text-color="white"
        label="Quero saber mais"
        :to="{ name: 'contacts' }" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InternalContent',
  props: {
    content: {
      type: Object
    }
  }
})
</script>
