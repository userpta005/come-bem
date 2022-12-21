<template>
  <q-btn-dropdown :label="store.account.store.people.name"
    flat
    dense
    no-caps
    align="left"
    class="text-weight-regular no-padding">
    <q-list dense>
      <q-item clickable
        v-close-popup
        v-for="(item, index) in store.accounts"
        :key="index"
        :active="parseInt(store.accountId) === parseInt(item.id)"
        @click="onItemClick(item, index)">
        <q-item-section>
          <q-item-label>{{ item.store.people.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'SelectAccount',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStorageStore()

    const onItemClick = (item, index) => {
      store.account = item
      store.accountId = store.account.id
      store.dependentIndexes[`index${store.getDependenIndexById(store.dependentId)}`].accountIndex = index
      store.disableButtons = parseInt(store.account.status) === 2
      store.app_token = store.account.store.app_token
      router.replace({ name: route.name, params: { account: item.id } })
    }

    return {
      store,
      onItemClick
    }
  }
})
</script>
