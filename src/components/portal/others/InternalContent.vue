<template>
  <div class="row">
    <div class="col-12 flex"
    :class="[content.title.justifyContent ?? 'justify-center']">
      <div class="text-h5 text-weight-bold text-main-tertiary text-center pa-responsive-md">
        {{ content.title.label }}
        <q-separator :color="content.title.separatorColor" v-if="content.title.separator" />
      </div>
    </div>
    <div class="col-12"
      v-for="(item, index)  in content.items"
      :key="index">
      <div class="row pa-responsive-md">
        <div class="col-2 flex flex-center">
          <q-icon :name="item.iconName"
            :size="item.iconSize" />
        </div>
        <div class="col-10 q-pl-md">
          <div class="text-subtitle1 text-weight-bold">{{ item.title }}</div>
          <div class="text-body1">{{ item.text }}</div>
        </div>
      </div>
      <q-separator v-if="(item.separator && content.items.length != (index + 1))" />
    </div>
    <div class="col-12 pa-responsive-md flex flex-center">
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
