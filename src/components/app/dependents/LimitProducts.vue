<template>
  <div class="q-pa-sm column">
    <h6 class="no-margin q-px-xs q-py-sm">Cardápio</h6>
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
    <span class="text-caption text-weight-medium text-red q-px-xs q-py-sm">
      Para restringir o consumo do produto do cardápio, clique na
      imagem abaixo.
    </span>
    <div class="row">
      <div class="column flex-center cursor-pointer rounded-borders q-ma-xs"
        style="border: 0.15rem solid var(--orange); height: 150px; width: 150px;"
        v-for="(product, index) in filteredProducts"
        :key="index"
        @click="handleAddLimitedProduct(product)">
        <q-img :src="product.image_url"
          height="60px"
          width="60px"
          class="rounded-borders q-ma-xs" />
        <span class="flex flex-center q-ma-xs">{{ product.name }}</span>
        <span class="flex flex-center q-ma-xs">{{ floatToMoney(product.price) }}</span>
      </div>
    </div>
    <h6 class="no-margin q-px-xs q-py-sm"
      v-if="$route.name === 'responsible-dependent'">Produtos restritos</h6>
    <div class="column"
      v-if="$route.name === 'responsible-dependent'">
      <div class="row justify-between items-center q-ma-xs"
        v-for="(limitedProduct, index) in limitedProducts"
        :key="index">
        {{ limitedProduct.name }}
        <q-icon class="cursor-pointer"
          name="mdi-delete"
          color="red"
          size="lg"
          @click="handleRemoveLimitedProduct(limitedProduct.id)" />
      </div>
    </div>
    <div class="row flex-center">
      <q-btn label="Sair"
        class="rounded-borders q-ma-xs"
        text-color="grey-8"
        outline
        no-caps
        style="width: 150px;"
        :class="{ 'self-center': $q.screen.lt.md }"
        @click="store.mainContent = 'QCalendar'" />
      <q-btn label="Confirmar"
        class="rounded-borders q-ma-xs"
        color="main-primary"
        no-caps
        style="width: 150px;"
        @click="handleSubmit"
        v-if="$route.name === 'responsible-dependent'" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { floatToMoney } from 'src/utils/helpers'

export default defineComponent({
  name: 'LimitProducts',
  setup () {
    const { notifyError, notifySuccess } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const sections = ref([])
    const products = ref([])
    const filteredProducts = ref([])
    const limitedProducts = ref(store.account.limited_products)

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
        products.value = filteredProducts.value = data.data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleFilterProducts = (sectionId) => {
      filteredProducts.value = products.value.filter(product => parseInt(product.section_id) === parseInt(sectionId))
    }

    const handleAddLimitedProduct = (product) => {
      const productExists = limitedProducts.value.find(value => parseInt(value.id) === parseInt(product.id))
      if (!productExists) {
        limitedProducts.value.push(product)
      }
    }

    const handleRemoveLimitedProduct = (limitedProductId) => {
      limitedProducts.value = limitedProducts.value.filter(limitedProduct => parseInt(limitedProduct.id) !== parseInt(limitedProductId))
    }

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'put',
          url: `/api/v1/accounts/${store.account.id}/limited-products`,
          data: { products: limitedProducts.value.map(value => value.id) }
        })
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
        notifySuccess(data.message)
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
      limitedProducts,
      handleFilterProducts,
      handleRemoveLimitedProduct,
      handleAddLimitedProduct,
      handleSubmit,
      floatToMoney
    }
  }
})
</script>
