<template>
  <div class="row full-width">
    <div class="column"
      style="width: 800px;">

      <h6 class="no-margin text-weight-regular q-pb-sm">Pedir lanche</h6>

      <div class="row justify-evenly">
        <div class="column items-center justify-between cursor-pointer q-mr-md q-mt-md"
          v-for="(section, index) in sections"
          :key="index"
          @click="handleFilterProducts(section.id)">

          <q-img :src="section.image_url"
            height="50px"
            width="50px"
            class="rounded-borders q-mb-xs" />

          <span class="flex flex-center text-body2">{{ section.name }}</span>

        </div>
      </div>

      <q-separator class="q-mt-sm" />

      <div class="row flex-center q-my-xl q-py-sm"
        style="max-height: 600px; overflow: auto;">

        <q-card class="column q-mr-sm q-mb-md"
          style="width: 150px;"
          v-for="(product, index) in filteredProducts"
          :key="index">

          <q-card-section class="flex flex-center q-pa-sm">
            <q-img :src="product.image_url"
              height="60px"
              width="60px"
              class="rounded-borders" />
          </q-card-section>

          <q-card-section class="col column justify-between items-center q-px-sm q-pt-none q-pb-none">

            <div class="col column items-center justify-evenly">
              <span class="text-center text-body2">{{ limitString(product.name, 16) }}</span>
              <span class="text-center text-weight-medium text-body2">{{ floatToMoney(product.price) }}</span>
            </div>

            <div class="row no-wrap flex-center full-width q-py-xs">
              <q-icon class="cursor-pointer"
                name="mdi-minus-circle-outline"
                style="font-size: 1.5rem;"
                @click="handleMinus(product)" />

              <h6 class="no-margin q-px-xs">{{ product.quantity ? parseInt(product.quantity) : 1 }}</h6>

              <q-icon class="cursor-pointer"
                name="mdi-plus-circle-outline"
                style="font-size: 1.5rem;"
                @click="handlePlus(product)" />
            </div>

          </q-card-section>

          <q-card-actions class="flex flex-center q-pa-sm">
            <q-btn no-caps
              color="green-9"
              class="full-width"
              icon-right="mdi-cursor-pointer"
              @click="handleAddProduct(product)">
              Comprar
            </q-btn>
          </q-card-actions>

        </q-card>

      </div>

      <div :class="$q.screen.gt.xs ? 'row flex-center' : 'column items-center'">

        <q-btn label="Sair"
          class="rounded-borders"
          :class="$q.screen.gt.xs ? 'q-mr-lg' : 'q-mt-sm order-last'"
          text-color="grey-8"
          outline
          no-caps
          style="width: 200px;"
          @click="store.mainContent = 'QCalendar'" />

        <q-btn label="Finalizar compra"
          class="rounded-borders"
          color="main-primary"
          no-caps
          style="width: 200px;"
          icon-right="mdi-cart-outline"
          @click="handleSubmit">

          <q-badge color="red"
            floating
            v-if="store.cart.length">
            {{ store.cart.length }}
          </q-badge>

        </q-btn>

      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import notify from 'src/composables/notify'
import { floatToMoney, limitString } from 'src/utils/helpers'

export default defineComponent({
  name: 'PurchaseOrder',
  setup () {
    const { notifyError, notifyWarning } = notify()
    const store = useStorageStore()
    const sections = ref([])
    const products = ref([])
    const filteredProducts = ref([])

    const handleGetSections = async () => {
      try {
        const { data } = await store.axios({
          method: 'get',
          url: '/api/v1/sections'
        })
        sections.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleGetProducts = async () => {
      try {
        const { data } = await store.axios({
          method: 'get',
          url: `/api/v1/accounts/${store.account.id}/products`
        })
        products.value = filteredProducts.value = data.filter((product) => {
          const productCart = store.cart.find(value => parseInt(value.id) === parseInt(product.id))
          if (productCart) {
            product.quantity = parseInt(productCart.quantity)
          }
          if ((product.stock && parseInt(product.stock.quantity) > 0) && !product.limited_products.length) {
            return true
          }
          return false
        })
      } catch (error) {
        notifyError(error)
      }
    }

    const handleFilterProducts = (sectionId) => {
      filteredProducts.value = products.value.filter(product => parseInt(product.section_id) === parseInt(sectionId))
    }

    const handleAddProduct = (product) => {
      const productExists = store.cart.find(value => parseInt(value.id) === parseInt(product.id))
      if (!productExists) {
        if (!('quantity' in product)) {
          product.quantity = 1
        }
        store.cart.push(product)
      } else {
        notifyWarning('Produto já está no carrinho !')
      }
    }

    const handleSubmit = async () => {
      try {
        if (!store.cart.length) {
          notifyWarning('Carrinho vazio !')
        } else {
          store.mainContent = 'FinishPurchaseOrder'
        }
      } catch (error) {
        notifyError(error)
      }
    }

    const handlePlus = (product) => {
      if (!('quantity' in product)) {
        product.quantity = 1
      }
      if (product.quantity < product.stock.quantity) {
        product.quantity++
      } else {
        notifyWarning('Estoque indisponível!')
      }
    }

    const handleMinus = (product) => {
      if (!('quantity' in product)) {
        product.quantity = 1
      }
      if (product.quantity > 1) {
        product.quantity--
      }
    }

    handleGetSections()
    handleGetProducts()

    return {
      store,
      sections,
      filteredProducts,
      handleFilterProducts,
      handleSubmit,
      floatToMoney,
      handleAddProduct,
      handlePlus,
      handleMinus,
      limitString
    }
  }
})
</script>
