<template>
  <q-dialog persistent
    @show="handleOpen">

    <q-card class="q-py-lg column justify-between"
      style="max-width: 800px; min-height: 500px;"
      :style="$q.screen.gt.xs ? 'min-width: 600px; padding-left: 80px; padding-right: 80px;' : 'min-width: 300px;'">

      <q-card-section class="column flex-center">
        <h5 class="no-margin text-center">
          {{ title }}
          <q-separator color="main-primary" />
        </h5>
      </q-card-section>

      <q-card-section class="q-pt-none col column">

        <div class="column"
          v-for="(order, index) in orders"
          :key="index">

          <h6 class="no-margin text-weight-regular q-pb-sm text-grey-8">
            Pedido: #{{ order.id.toString().padStart(3, '0') }}
          </h6>

          <q-separator />

          <div class="row no-wrap justify-between">

            <div class="row items-center">
              <span class="flex justify-between items-center q-pr-sm"
                v-for="(item, index) in order.order_items"
                :key="index">
                <q-badge :color="badgeColor(item.product.nutritional_classification)"
                  class="q-mr-sm"
                  style="height:15px; width: 15px;"
                  rounded />
                {{ item.product.name }}
              </span>
            </div>

            <q-icon class="cursor-pointer q-pl-md"
              name="mdi-delete-circle"
              color="grey"
              size="md"
              @click="handleRemoveOrder(order)" />

          </div>

          <q-separator class="q-mb-md" />

        </div>

      </q-card-section>

      <q-card-actions align="center"
        class="text-primary q-pa-md"
        :class="$q.screen.gt.xs ? 'row' : 'column'">

        <q-btn label="Sair"
          :class="$q.screen.gt.xs ? 'q-mr-lg' : 'q-mt-md'"
          text-color="grey-8"
          outline
          v-close-popup
          no-caps
          style="width: 170px;" />

        <q-btn type="submit"
          :class="$q.screen.gt.xs ? '' : 'order-first'"
          class="no-margin"
          label="Novo pedido"
          color="main-primary"
          style="width: 170px;"
          icon-right="mdi-cart-outline"
          no-caps
          @click="handleNewOrder" />

      </q-card-actions>

    </q-card>

  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import { brDate } from 'src/utils/helpers'
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export default defineComponent({
  name: 'PurchaseOrders',
  props: ['orders'],
  emits: ['closeModal'],
  setup (props, { emit }) {
    const { notifyError, notifySuccess } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const title = ref(null)

    const handleOpen = () => {
      title.value = format(parseISO(store.purchaseDate), 'dd MMM yyyy', { locale: pt })
    }

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
      handleNewOrder,
      handleOpen
    }
  }
})
</script>
