<template>
  <q-btn-dropdown :label="account.store.people.name"
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
        v-for="(account, index) in dependent.accounts"
        :key="index"
        :active="selected === account.id"
        @click="onItemClick(account)">
        <q-item-section>
          <q-item-label>{{ account.store.people.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'

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
    }
  },
  setup (props) {
    const dependent = toRef(props, 'dependent')
    const account = toRef(props, 'account')
    const selected = ref(account.value.id)
    return {
      selected,
      onItemClick (account) {
        selected.value = account.id
        dependent.value.account = account
      }
    }
  }
})
</script>
