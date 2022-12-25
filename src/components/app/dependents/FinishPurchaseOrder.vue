<template>
  <q-form class="q-pa-sm column"
    @submit.prevent="handleSubmit">
    <h6 class="no-margin q-pa-xs">Pedido de compra</h6>
    <span class="q-pa-xs">Itens do pedido</span>
    <div class="column q-pa-xs">
      <q-card bordered
        flat
        class="q-my-xs row"
        :style="$q.screen.gt.sm ? 'width: 600px;' : 'width: 320px;'"
        v-for="(product, index) in store.cart"
        :key="index">
        <q-card-section horizontal
          class="flex flex-center q-pa-sm">
          <q-img :src="product.image_url"
            height="80px"
            width="80px"
            class="rounded-borders q-ma-xs" />
        </q-card-section>
        <q-card-section horizontal
          class="col-grow column flex-center q-pa-sm">
          <span class="q-pa-xs">{{ product.name }}</span>
          <div class="row no-wrap flex-center q-pa-xs">
            <q-icon class="cursor-pointer q-pa-xs"
              name="mdi-minus-circle-outline"
              size="md"
              @click="handleMinus(product)" />
            <h6 class="no-margin q-pa-xs">{{ product.quantity }}</h6>
            <q-icon class="cursor-pointer q-pa-xs"
              name="mdi-plus-circle-outline"
              size="md"
              @click="handlePlus(product)" />
          </div>
        </q-card-section>
        <q-card-section horizontal
          class="column flex-center q-pa-sm">
          <q-icon class="cursor-pointer q-pa-xs"
            name="mdi-delete"
            color="red"
            size="lg"
            @click="handleRemoveProduct(product)" />
          <span class="q-pa-xs">{{ floatToMoney(product.quantity * product.price) }}</span>
        </q-card-section>
      </q-card>
    </div>
    <div class="row no-wrap justify-between items-center q-pa-xs"
      :style="$q.screen.gt.sm ? 'width: 600px;' : 'width: 320px;'">
      <span class="text-weight-medium q-pa-xs">Total:</span>
      <span class="text-weight-medium q-pa-xs">{{ floatToMoney(total) }}</span>
    </div>
    <q-separator color="black"
      class="q-ma-xs"
      :style="$q.screen.gt.sm ? 'width: 600px;' : 'width: 320px;'" />
    <span class="q-pa-xs">Data do consumo</span>
    <div class="row no-wrap justify-between items-center q-pa-xs"
      :style="$q.screen.gt.sm ? 'width: 600px;' : 'width: 320px;'">
      <q-input v-model="store.purchaseDate"
        type="date"
        label="Data"
        stack-label
        outlined
        disable />
      <q-input v-model="time"
        type="time"
        label="Horário"
        stack-label
        outlined
        :rules="[val => !!val || 'Horário é obrigatório!']" />
    </div>
    <div class="row flex-center q-pt-xl">
      <q-btn label="Continuar comprando"
        class="rounded-borders q-ma-xs"
        text-color="grey-8"
        outline
        no-caps
        style="width: 200px;"
        :class="{ 'self-center': $q.screen.lt.md }"
        @click="store.mainContent = 'PurchaseOrder'" />
      <q-btn type="submit"
        label="Finalizar compra"
        class="rounded-borders q-ma-xs"
        color="main-primary"
        no-caps
        style="width: 200px;"
        icon-right="mdi-cart-outline" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import { floatToMoney } from 'src/utils/helpers'
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'FinishPurchaseOrder',
  setup () {
    const { notifyWarning, notifyError, notifySuccess } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const time = ref(null)

    const total = computed(() => {
      let total = 0
      store.cart.forEach((value) => {
        total += (value.quantity * value.price)
      })
      return total
    })

    const handlePlus = (product) => {
      if (product.quantity < product.stock.quantity) {
        product.quantity++
      } else {
        notifyWarning('Estoque indisponível!')
      }
    }

    const handleMinus = (product) => {
      if (product.quantity > 1) {
        product.quantity--
      }
    }

    const handleRemoveProduct = (product) => {
      store.cart = store.cart.filter(value => parseInt(value.id) !== parseInt(product.id))
    }

    const handleSubmit = async () => {
      if (!store.cart.length) {
        notifyWarning('Carrinho vazio !')
        return
      }
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/accounts/${store.account.id}/orders`,
          data: {
            products: store.cart,
            date: store.purchaseDate,
            time: time.value
          }
        })
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      time,
      handleMinus,
      handlePlus,
      handleRemoveProduct,
      handleSubmit,
      floatToMoney,
      total
    }
  }
})
</script>
