<template>
  <q-btn-dropdown :label="label"
    flat
    dense
    size="sm"
    no-caps
    split
    text-color="grey-8">
    <q-list dense>
      <q-item clickable
        v-close-popup
        :active="selected === item.id"
        @click="onItemClick(item, index)"
        v-for="(item, index) in accounts"
        :key="index">
        <q-item-section>
          <q-item-label>{{ item.store.people.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SelectAccount',
  props: {
    accounts: {
      type: Array
    },
    dependentIndex: {
      type: Number
    }
  },
  emits: ['changeAccount'],
  setup (props, { emit }) {
    const label = ref(props.accounts[0].store.people.name)
    const selected = ref(props.accounts[0].id)
    return {
      label,
      selected,
      onItemClick (item, index) {
        label.value = item.store.people.name
        selected.value = item.id
        emit('changeAccount', props.dependentIndex, index)
      }
    }
  }
})
</script>
