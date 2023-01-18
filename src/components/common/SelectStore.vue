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
          Nenhum resultado
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'SelectStore',
  props: ['modelValue', 'accounts', 'city_id', 'optionsStores', 'disable'],
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { notifyError } = notify()
    const store = useStorageStore()
    const stores = ref()
    const options = ref(props.optionsStores)
    const storeId = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        if (props.accounts) {
          const account = props.accounts.find(account => parseInt(account.store_id) === parseInt(value))
          if (account) {
            notifyError('Escola já adicionada!')
            storeId.value = null
            return
          }
        }
        emit('update:modelValue', value)
      }
    })

    const filterStore = async (val, update, abort) => {
      if (val.length < 3) {
        abort()
        return
      }

      try {
        const { data } = await store.axios({ method: 'get', url: '/api/v1/stores', params: { search: val, city_id: props.city_id } })
        stores.value = data
      } catch (error) {
        notifyError(error)
        abort()
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
