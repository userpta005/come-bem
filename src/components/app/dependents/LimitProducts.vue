<template>
  <div class="row full-width">
    <div class="column"
      style="width: 650px;">

      <h6 class="no-margin text-weight-regular q-pb-sm">Cardápio</h6>

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

      <span class="text-body2 text-weight-medium text-red q-my-md"
      v-if="$route.name === 'responsible-dependent'">
        Para restringir o consumo do produto do cardápio, clique na
        imagem abaixo.
      </span>

      <div ref="containerProducts"
        class="row flex-center q-py-sm"
        style="max-height: 428px; overflow: auto;">

        <q-card class="column flex-center cursor-pointer q-mr-sm q-mb-md"
          style="width: 150px;"
          :class="{ 'limitedProduct': handleProductIsLimited(product) }"
          @click="handleAddLimitedProduct(product)"
          v-for="(product, index) in filteredProducts"
          :key="index">

          <q-card-section class="flex flex-center q-pa-sm">
            <q-img :src="product.image_url"
              height="60px"
              width="60px"
              class="rounded-borders"
              :class="{ 'imageLimitedProduct': handleProductIsLimited(product) }" />
          </q-card-section>

          <q-card-section class="col column items-center justify-evenly q-pa-sm">
            <span class="text-center text-body2">{{ limitString(product.name, 16) }}</span>
            <span class="text-center text-weight-medium text-body2">{{ floatToMoney(product.price) }}</span>
          </q-card-section>

          <span class="textLimitedProduct"
            v-if="handleProductIsLimited(product)">Produto restrito</span>

        </q-card>

      </div>

      <h6 class="no-margin text-weight-regular q-py-sm"
        v-if="$route.name === 'responsible-dependent'">Produtos restritos</h6>

      <div class="column"
        v-if="$route.name === 'responsible-dependent'">

        <div class="row no-wrap justify-between items-center q-ml-lg q-mr-xl q-mb-xs"
          v-for="(limitedProduct, index) in limitedProducts"
          :key="index">
          {{ limitedProduct.name }}
          <q-icon class="cursor-pointer q-ml-md"
            name="mdi-delete-circle"
            color="grey"
            size="lg"
            @click="handleRemoveLimitedProduct(limitedProduct.id)" />
        </div>

      </div>

      <span class="text-center"
        v-if="$route.name === 'responsible-dependent' && !limitedProducts.length">
        Nenhum produto restrito.
      </span>

      <div class="q-mt-xl"
        :class="$q.screen.gt.xs ? 'row flex-center' : 'column items-center'">

        <q-btn label="Sair"
          class="rounded-borders"
          :class="$q.screen.gt.xs && $route.name === 'responsible-dependent' && limitedProductSelected ? 'q-mr-lg' : 'q-mt-sm order-last'"
          text-color="grey-8"
          outline
          no-caps
          style="width: 200px;"
          @click="store.mainContent = 'QCalendar'" />

        <q-btn label="Confirmar"
          class="rounded-borders"
          color="main-primary"
          no-caps
          style="width: 200px;"
          @click="handleSubmit"
          v-if="$route.name === 'responsible-dependent' && limitedProductSelected" />

      </div>

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
}
</style>

<script>
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { floatToMoney, limitString } from 'src/utils/helpers'

export default defineComponent({
  name: 'LimitProducts',
  setup () {
    const { notifyError, notifySuccess } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const sections = ref([])
    const products = ref([])
    const filteredProducts = ref([])
    const limitedProducts = ref([])
    const limitedProductSelected = ref(false)

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
        products.value = filteredProducts.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleGetlimitedProducts = async () => {
      try {
        const { data } = await store.axios({
          method: 'get',
          url: `/api/v1/accounts/${store.account.id}/limited-products`
        })
        limitedProducts.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleFilterProducts = (sectionId) => {
      filteredProducts.value = products.value.filter(product => parseInt(product.section_id) === parseInt(sectionId))
    }

    const handleAddLimitedProduct = (product) => {
      if (route.name === 'responsible-dependent') {
        const productExists = limitedProducts.value.find(value => parseInt(value.id) === parseInt(product.id))
        if (!productExists) {
          limitedProducts.value.push(product)
          limitedProductSelected.value = true
        }
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
        const { message } = await store.axios({
          method: 'put',
          url: `/api/v1/accounts/${store.account.id}/limited-products`,
          data: { products: limitedProducts.value.map(value => value.id) }
        })
        notifySuccess(message)
      } catch (error) {
        notifyError(error)
      }
    }

    handleGetSections()
    handleGetProducts()
    handleGetlimitedProducts()

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
      floatToMoney,
      limitString
    }
  }
})
</script>
