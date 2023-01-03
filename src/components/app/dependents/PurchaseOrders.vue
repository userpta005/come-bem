<template>
  <q-dialog persistent>
    <q-card class="q-pa-sm"
      style="min-width: 300px;">
      <q-card-section class="flex flex-center">
        <div class="container">
          <h5 class="no-margin text-center">{{ title }}</h5>
          <q-separator color="main-primary" />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center column">
        <div class="column"
          v-for="(order, index) in orders"
          :key="index">
          <div class="column">
            <div class="row no-wrap">
              <h6 class="no-margin text-weight-regular q-pb-sm"
                :style="{ color: getRandomDarkColor() }">
                Pedido: #{{ order.id.toString().padStart(3, '0') }}
              </h6>
            </div>
            <div class="row no-wrap justify-between items-center">
              <div class="row items-center">
                <span class="q-pr-xs q-pb-xs"
                  v-for="(item, index) in order.order_items"
                  :key="index">
                  <q-badge :color="badgeColor(item.product.nutritional_classification)"
                    style="height:15px; width: 15px;"
                    rounded />
                  {{ item.product.name }}
                </span>
              </div>
              <q-icon class="cursor-pointer q-pb-xs"
                name="mdi-delete-circle"
                color="red"
                size="md"
                @click="handleRemoveOrder(order)" />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center"
        class="text-primary">
        <q-btn label="Sair"
          class="q-ma-xs"
          text-color="grey-8"
          outline
          v-close-popup
          no-caps
          style="width: 160px;" />
        <q-btn label="Novo pedido"
          class="q-ma-xs"
          color="main-primary"
          no-caps
          style="width: 160px;"
          icon-right="mdi-cart-outline"
          @click="handleNewOrder" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import useStorageStore from 'src/stores/storage'
import { brDate, getRandomDarkColor } from 'src/utils/helpers'
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { parseISO, format } from 'date-fns'

export default defineComponent({
  name: 'PurchaseOrders',
  props: ['orders'],
  emits: ['closeModal'],
  setup (props, { emit }) {
    const { notifyError, notifySuccess } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const title = format(parseISO(store.purchaseDate), 'dd MMM yyyy')

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

    const handleNewOrder = () => {
      store.mainContent = 'PurchaseOrder'
    }

    const badgeColor = (nutritionalClassification) => {
      if (parseInt(nutritionalClassification) === 1) {
        return 'grey'
      } else if (parseInt(nutritionalClassification) === 2) {
        return 'red'
      } else if (parseInt(nutritionalClassification) === 3) {
        return 'yellow'
      } else if (parseInt(nutritionalClassification) === 4) {
        return 'green'
      }
    }

    return {
      store,
      title,
      handleRemoveOrder,
      brDate,
      badgeColor,
      getRandomDarkColor,
      handleNewOrder
    }
  }
})
</script>
