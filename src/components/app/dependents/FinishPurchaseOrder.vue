<template>
  <div class="row full-width">
    <q-form class="column"
      style="width: 550px;"
      @submit.prevent="handleSubmit">

      <h6 class="no-margin text-weight-regular q-pb-sm">Pedido de compra</h6>

      <span class="q-pb-sm text-grey-8">Itens do pedido</span>

      <div class="column q-pb-sm">
        <q-card bordered
          flat
          class="row q-mb-sm"
          v-for="(product, index) in store.cart"
          :key="index">

          <q-card-section horizontal
            class="flex flex-center q-pa-sm">

            <q-img :src="product.image_url"
              height="80px"
              width="80px"
              class="rounded-borders" />

          </q-card-section>

          <q-card-section horizontal
            class="col-grow column items-start q-pa-sm">
            <div class="column flex-center">
              <span class="q-pb-sm">{{ product.name }}</span>

              <div class="self-start row no-wrap flex-center">

                <q-icon class="cursor-pointer"
                  name="mdi-minus-circle-outline"
                  size="md"
                  @click="handleMinus(product)" />

                <h6 class="no-margin q-px-xs">{{ product.quantity }}</h6>

                <q-icon class="cursor-pointer"
                  name="mdi-plus-circle-outline"
                  size="md"
                  @click="handlePlus(product)" />

              </div>
            </div>
          </q-card-section>

          <q-card-section horizontal
            class="column items-center justify-between q-pa-sm q-pr-md">

            <q-icon class="cursor-pointer q-pb-sm"
              name="mdi-delete-circle"
              color="grey"
              size="lg"
              @click="handleRemoveProduct(product)" />

            <span>{{ floatToMoney(parseInt(product.quantity) * parseFloat(product.price)) }}</span>

          </q-card-section>

        </q-card>
      </div>

      <div class="row no-wrap justify-between items-center q-pb-sm">
        <span class="text-weight-medium">Total:</span>
        <span class="text-weight-medium q-pr-md">{{ floatToMoney(total) }}</span>
      </div>

      <q-separator color="black"
        class="q-mb-sm" />

      <span class="q-pb-sm text-grey-8">Data do consumo</span>

      <div class="row no-wrap justify-between items-center q-pb-sm"
        :style="$q.screen.gt.sm ? 'padding-left: 60px; padding-right: 60px;' : ''">

        <q-input v-model="store.purchaseDate"
          type="date"
          label="Data"
          stack-label
          outlined
          disable
          :rules="[val => (!!val) || 'Data é obrigatória']" />

        <q-select v-model="turn"
          outlined
          label="Turno"
          option-value="id"
          option-label="label"
          :options="turns"
          map-options
          emit-value
          lazy-rules="ondemand"
          :rules="[val => (!!val) || 'Turno é obrigatório']" />

      </div>

      <div class="row items-center q-pb-sm"
        :class="$q.screen.gt.xs ? 'justify-between' : 'justify-center'"
        :style="$q.screen.gt.sm ? 'padding-left: 60px; padding-right: 60px;' : ''">

        <q-btn label="Continuar comprando"
          class="rounded-borders"
          text-color="grey-8"
          outline
          no-caps
          style="width: 200px;"
          :class="$q.screen.lt.sm ? 'q-mb-sm' : ''"
          @click="store.mainContent = 'PurchaseOrder'" />

        <q-btn type="submit"
          label="Finalizar compra"
          class="rounded-borders"
          color="main-primary"
          no-caps
          style="width: 200px;"
          icon-right="mdi-cart-outline" />

      </div>

    </q-form>
  </div>
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
    const turn = ref(1)

    const total = computed(() => {
      let total = 0
      store.cart.forEach((value) => {
        total += (value.quantity * value.price)
      })
      return total
    })

    const turns = ref([
      { label: 'Matutino', id: 1 },
      { label: 'Vespertino', id: 2 },
      { label: 'Noturno', id: 3 }
    ])

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
            turn: turn.value
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
      turn,
      turns,
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
