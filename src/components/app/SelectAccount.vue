<template>
  <q-btn-dropdown :label="label"
    flat
    dense
    size="0.8rem"
    no-caps
    align="left"
    text-color="grey-8"
    class="no-padding">
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
import { useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'SelectAccount',
  props: {
    accounts: {
      type: Array,
      required: true
    }
  },
  emits: ['selectAccount'],
  setup (props, { emit }) {
    const { filterAccounts } = useApi()
    const route = useRoute()
    const accounts = ref(props.accounts)
    const accountId = ref(route.params.account ?? accounts.value[0].id)
    const account = ref(filterAccounts(accounts.value, accountId.value))
    const label = ref(account.value.store.people.name)
    const selected = ref(account.value.id)
    return {
      label,
      selected,
      onItemClick (item, index) {
        label.value = item.store.people.name
        selected.value = item.id
        emit('selectAccount', item, index)
      }
    }
  }
})
</script>
