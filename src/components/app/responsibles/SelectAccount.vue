<template>
  <q-btn-dropdown :label="account.store.people.name"
    flat
    dense
    no-caps
    align="left"
    class="text-weight-light"
    style="font-size: 17px; padding: 0 0 0 25px;">
    <q-list dense>
      <q-item clickable
        v-close-popup
        v-for="(item, index) in dependent.accounts"
        :key="index"
        :active="parseInt(account.id) === parseInt(item.id)"
        @click="onItemClick(item, index)">
        <q-item-section>
          <q-item-label>{{ item.store.people.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'SelectAccount',
  props: {
    dependent: {
      type: Object,
      required: true
    },
    account: {
      type: Object,
      required: true
    },
    dependentIndex: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const store = useStorageStore()
    const dependentIndex = toRef(props, 'dependentIndex')

    const onItemClick = (item, index) => {
      store.dependentIndexes[`index${dependentIndex.value}`].accountIndex = index
    }

    return {
      onItemClick
    }
  }
})
</script>
