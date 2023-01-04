<template>
  <main class="column">
    <h5 class="no-margin text-weight-bold text-main-tertiary q-py-md"
      :class="content.title.selfAlignment">
      {{ content.title.label }}
      <q-separator :color="content.title.separatorColor"
        :size="content.title.separatorSize"
        v-if="content.title.separator" />
    </h5>
    <div v-for="(item, index)  in content.items"
      :key="index">
      <div class="row no-wrap q-py-sm">
        <div class="col-auto flex flex-center q-pr-md">
          <q-icon :name="item.iconName"
            :size="item.iconSize" />
        </div>
        <div class="col-shrink column">
          <p class="text-weight-bold q-mb-xs">{{ item.title }}</p>
          <span style="text-indent: 15px;">{{ item.text }}</span>
        </div>
      </div>
      <q-separator v-if="(item.separator)" />
    </div>
    <q-btn label="Saber mais"
      class="self-center q-ma-md"
      color="main-primary"
      text-color="white"
      no-caps
      style="width: 150px;"
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
