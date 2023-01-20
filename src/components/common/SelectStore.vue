<template>
  <q-select v-model="storeId"
    outlined
    label="Escola/Entidade*"
    option-value="id"
    option-label="name"
    use-input
    input-debounce="200"
    :options="options"
    @filter="filterStore"
    map-options
    emit-value
    lazy-rules="ondemand"
    :disable="disable"
    :rules="[val => !!val || !!disable || 'Escola é obrigatória']">
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Digite no minímo 3 caracteres
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'SelectStore',
  props: ['modelValue', 'accounts', 'city_id', 'optionsStores', 'disable'],
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { notifyError } = notify()
    const store = useStorageStore()
    const propOptionsStores = computed(() => props.optionsStores)
    const stores = ref([])
    const options = ref(propOptionsStores.value)
    const storeId = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        if (props.accounts) {
          const account = props.accounts.find(account => parseInt(account.store_id) === parseInt(value))
          if (account) {
            notifyError('Escola já adicionada!')
            return
          }
        }
        emit('update:modelValue', value)
      }
    })

    const filterStore = async (val, update, abort) => {
      if (!props.city_id) {
        notifyError('Selecione primeiro a cidade!')
        abort()
        return
      }
      if (val.length < 3) {
        update(() => {
          options.value = propOptionsStores.value
        })
        return
      }

      try {
        const { data } = await store.axios({ method: 'get', url: '/api/v1/stores', params: { search: val, city_id: props.city_id } })
        stores.value = data
      } catch (error) {
        notifyError(error)
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        options.value = stores.value.filter(v => v.info.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      storeId,
      options,
      filterStore
    }
  }
})
</script>
