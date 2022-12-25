<template>
  <q-dialog persistent>
    <q-card class="q-pa-sm"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <h5 class="no-margin text-center">{{ brDate(store.purchaseDate) }}</h5>
      </q-card-section>

      <q-card-section class="q-pt-none text-center column">
        <div class="row no-wrap flex-center"
          v-for="(order, index) in orders"
          :key="index">
          <h6 class="no-margin text-weight-regular q-pa-xs">{{ order.time.slice(0, 5) }}</h6>
          <q-icon class="cursor-pointer q-pa-xs"
            name="mdi-delete"
            color="red"
            size="md"
            @click="handleRemoveOrder(order)" />
        </div>
      </q-card-section>

      <q-card-actions align="center"
        class="text-primary">
        <q-btn label="Sair"
          text-color="grey-8"
          outline
          v-close-popup
          style="width: 100px;" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import useStorageStore from 'src/stores/storage'
import { brDate } from 'src/utils/helpers'
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PurchaseOrders',
  props: ['orders'],
  emits: ['closeModal'],
  setup (props, { emit }) {
    const store = useStorageStore()
    const { notifyError, notifySuccess } = notify()
    const route = useRoute()

    const handleRemoveOrder = async (order) => {
      try {
        const data = await store.axios({
          method: 'delete',
          url: `/api/v1/orders/${order.id}`
        })
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
        emit('closeModal')
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      handleRemoveOrder,
      brDate
    }
  }
})
</script>
