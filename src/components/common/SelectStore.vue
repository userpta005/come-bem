<template>
  <q-select v-model="storeId"
    outlined
    label="Qual escola/entidade"
    option-value="id"
    option-label="name"
    use-input
    input-debounce="200"
    :options="options"
    @filter="filterStore"
    map-options
    emit-value
    lazy-rules="ondemand"
    :rules="[val => (val && !!val) || 'Escola é obrigatória']">
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
import UseAxios from 'src/composables/UseAxios'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'SelectStore',
  props: ['modelValue', 'update:modelValue'],
  setup (props, { emit }) {
    const { axios } = UseAxios()
    const { notifyError } = notify()
    const storeId = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })
    const stores = ref(null)
    const options = ref([])
    const filterStore = async (val, update, abort) => {
      if (val.length < 3) {
        abort()
        return
      }

      try {
        const { data } = await axios({ method: 'get', url: '/api/v1/stores', params: { search: val } })
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
