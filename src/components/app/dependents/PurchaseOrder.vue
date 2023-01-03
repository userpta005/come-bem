<template>
  <div class="column">
    <h6 class="no-margin q-px-xs q-py-sm">Pedir lanche</h6>
    <div class="row justify-evenly">
      <div class="column flex-center cursor-pointer q-ma-xs"
        v-for="(section, index) in sections"
        :key="index"
        @click="handleFilterProducts(section.id)">
        <q-img :src="section.image_url"
          height="60px"
          width="60px"
          class="rounded-borders q-ma-xs" />
        <span class="flex flex-center q-ma-xs">{{ section.name }}</span>
      </div>
    </div>
    <q-separator />
    <div class="row q-py-xl">
      <q-card class="q-ma-sm"
        style="height: 230px; width: 150px;"
        v-for="(product, index) in filteredProducts"
        :key="index">
        <q-card-section class="flex flex-center q-pa-sm">
          <q-img :src="product.image_url"
            height="60px"
            width="60px"
            class="rounded-borders" />
        </q-card-section>

        <q-card-section class="column flex-center q-pa-sm">
          <span class="flex flex-center q-ma-xs">{{ product.name }}</span>
          <span class="flex flex-center q-ma-xs">{{ floatToMoney(product.price) }}</span>
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
    <div class="row flex-center">
      <q-btn label="Sair"
        class="rounded-borders q-ma-xs"
        text-color="grey-8"
        outline
        no-caps
        style="width: 200px;"
        :class="{ 'self-center': $q.screen.lt.md }"
        @click="store.mainContent = 'QCalendar'" />
      <q-btn label="Finalizar compra"
        class="rounded-borders q-ma-xs"
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
</template>

<script>
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import notify from 'src/composables/notify'
import { floatToMoney } from 'src/utils/helpers'

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
        const data = await store.axios({
          method: 'get',
          url: '/api/v1/sections'
        })
        sections.value = data.data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleGetProducts = async () => {
      try {
        const data = await store.axios({
          method: 'get',
          url: `/api/v1/accounts/${store.account.id}/products`
        })
        products.value = filteredProducts.value = data.data.filter((product) => (product.stock && parseInt(product.stock.quantity) > 0) && !product.limited_products.length)
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
        product.quantity = 1
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

    handleGetSections()
    handleGetProducts()

    return {
      store,
      sections,
      filteredProducts,
      handleFilterProducts,
      handleSubmit,
      floatToMoney,
      handleAddProduct
    }
  }
})
</script>
