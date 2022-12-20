<template>
  <q-select v-model="cityId"
    outlined
    label="Cidades"
    option-value="id"
    option-label="info"
    use-input
    input-debounce="200"
    :options="options"
    @filter="filterCity"
    map-options
    emit-value
    lazy-rules="ondemand"
    :rules="[val => !!val || 'Cidade é obrigatória']">
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
  name: 'SelectCity',
  props: ['modelValue', 'update:modelValue'],
  setup (props, { emit }) {
    const { notifyError } = notify()
    const store = useStorageStore()
    const cities = ref()
    const options = ref()
    const cityId = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })
    const filterCity = async (val, update, abort) => {
      if (val.length < 3) {
        abort()
        return
      }

      try {
        const { data } = await store.axios({ method: 'get', url: '/api/v1/cities', params: { search: val } })
        cities.value = data
      } catch (error) {
        notifyError(error)
        abort()
      }

      update(() => {
        const needle = val.toLowerCase()
        options.value = cities.value.filter(v => v.info.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      cityId,
      options,
      filterCity
    }
  }
})
</script>
