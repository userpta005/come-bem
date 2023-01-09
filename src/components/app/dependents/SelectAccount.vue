<template>
  <q-btn-dropdown :label="store.account.store.people.name"
    flat
    dense
    no-caps
    align="left"
    class="text-weight-light no-padding"
    style="font-size: 17px;">
    <q-list dense>
      <q-item clickable
        v-close-popup
        v-for="(item, index) in store.dependent.accounts"
        :key="index"
        :active="parseInt(store.account.id) === parseInt(item.id)"
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
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'SelectAccount',
  setup () {
    const { notifyError } = notify()
    const router = useRouter()
    const route = useRoute()
    const store = useStorageStore()

    const onItemClick = async (item, index) => {
      try {
        const { data } = await store.axios({ method: 'get', url: `/api/v1/dependents/${store.dependent.id}` })
        store.dependent = data
      } catch (error) {
        notifyError(error)
      }
      const dependentIndex = store.getDependenIndexById(store.dependent.id)
      store.dependentIndexes[`index${dependentIndex}`].accountIndex = index
      store.setDependent(null, dependentIndex)
      store.mainContent = 'QCalendar'
      router.replace({ name: route.name, params: { account: item.id } })
    }

    return {
      store,
      onItemClick
    }
  }
})
</script>
