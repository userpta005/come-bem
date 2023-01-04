<template>
  <div class="column">

    <h6 class="no-margin q-py-sm">Cardápio</h6>

    <div class="row justify-evenly">
      <div class="column items-center justify-between cursor-pointer q-ma-sm"
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

    <q-separator class="q-mt-sm" />

    <span class="text-caption text-weight-medium text-red q-mt-md q-mb-sm">
      Para restringir o consumo do produto do cardápio, clique na
      imagem abaixo.
    </span>

    <div class="row"
      :class="$q.screen.lt.sm ? 'flex-center' : ''">

      <div class="column justify-between items-center cursor-pointer rounded-borders q-my-sm q-mr-md"
        style="border: 2px solid var(--orange); height: 180px; width: 180px;"
        :class="{ 'limitedProduct': handleProductIsLimited(product) }"
        v-for="(product, index) in filteredProducts"
        :key="index"
        @click="handleAddLimitedProduct(product)">

        <q-img :src="product.image_url"
          height="70px"
          width="70px"
          class="rounded-borders q-mt-sm"
          :class="{ 'imageLimitedProduct': handleProductIsLimited(product) }" />

        <span class="text-center q-pa-sm">{{ product.name }}</span>
        <span class="text-center q-pb-sm">{{ floatToMoney(product.price) }}</span>
        <span class="textLimitedProduct"
          v-if="handleProductIsLimited(product)">Produto restrito</span>

      </div>

    </div>

    <h6 class="no-margin q-py-sm"
      v-if="$route.name === 'responsible-dependent'">Produtos restritos</h6>

    <div class="column"
      v-if="$route.name === 'responsible-dependent'">
      <div class="row justify-between items-center q-ml-lg q-my-xs"
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

    <span class="text-center"
      v-if="$route.name === 'responsible-dependent' && !limitedProducts.length">
      Nenhum produto restrito.
    </span>

    <div class="row flex-center q-mt-lg">
      <q-btn label="Voltar"
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
        v-if="$route.name === 'responsible-dependent' && limitedProductSelected" />
    </div>

  </div>
</template>

<style>
.limitedProduct {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
}

.imageLimitedProduct {
  filter: brightness(50%)
}

.textLimitedProduct {
  position: absolute;
  text-align: center;
  color: white;
  font-size: 20px;
  top: 75px;
}
</style>

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
    const limitedProducts = ref(store.account.limited_products.filter((value) => value))
    const limitedProductSelected = ref(false)

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
        limitedProductSelected.value = true
      }
    }

    const handleRemoveLimitedProduct = (limitedProductId) => {
      limitedProducts.value = limitedProducts.value.filter(limitedProduct => parseInt(limitedProduct.id) !== parseInt(limitedProductId))
      limitedProductSelected.value = true
    }

    const handleProductIsLimited = (product) => {
      return limitedProducts.value.find(limitedProduct => parseInt(limitedProduct.id) === parseInt(product.id))
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
      limitedProductSelected,
      handleFilterProducts,
      handleRemoveLimitedProduct,
      handleAddLimitedProduct,
      handleProductIsLimited,
      handleSubmit,
      floatToMoney
    }
  }
})
</script>
