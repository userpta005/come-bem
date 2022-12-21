<template>
  <main class="column">
    <h6 class="no-margin text-weight-bold text-main-tertiary q-py-md"
      :class="content.title.selfAlignment">
      {{ content.title.label }}
      <q-separator :color="content.title.separatorColor"
        :size="content.title.separatorSize"
        v-if="content.title.separator" />
    </h6>
    <div class="row no-wrap q-py-md"
      v-for="(item, index)  in content.items"
      :key="index">
      <div class="col-auto flex flex-center q-pa-sm">
        <q-icon :name="item.iconName"
          :size="item.iconSize" />
      </div>
      <div class="col-shrink column q-pa-sm">
        <p class="text-weight-bold">{{ item.title }}</p>
        <span>{{ item.text }}</span>
        <q-separator v-if="(item.separator)" />
      </div>
    </div>
    <q-btn label="Quero saber mais"
      class="self-center q-ma-sm"
      color="main-primary"
      text-color="white"
      :to="{ name: 'contacts' }" />
  </main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainContent',
  props: {
    content: {
      type: Object
    }
  }
})
</script>
