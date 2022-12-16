<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm">
      <div class="text-h5">
        Cadastro de consumidor
        <q-separator color="main-primary" style="height: 0.12rem;" />
      </div>
    </div>
    <q-form @submit.prevent="handleSubmit"
      class="row q-pa-sm q-col-gutter-xs"
      :style="$q.screen.gt.sm ? 'max-width: 70%;' : ''">

      <q-input label="Nome completo"
        class="col-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.name"
        :rules="[
          val => (val && val.length > 0) || 'Nome completo é obrigatório',
          val => (val.length <= 100) || 'Máximo 100 caracteres !',
        ]" />

      <q-select v-model="form.gender"
        outlined
        class="col-md-6 col-xs-12"
        label="Sexo"
        option-value="id"
        option-label="label"
        :options="optionsGender"
        map-options
        emit-value
        lazy-rules="ondemand"
        :rules="[val => (val && !!val) || 'Sexo é obrigatória']" />

      <q-input label="Dt. de nascimento"
        stack-label
        v-model="form.birthdate"
        type="date"
        class="col-md-6 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        :rules="[val => (val && val.length > 0) || 'Dt. de nascimento é obrigatória']" />

      <q-select v-model="form.city_id"
        outlined
        class="col-md-6 col-xs-12"
        label="Cidade"
        option-value="id"
        option-label="info"
        use-input
        input-debounce="200"
        :options="optionsCities"
        @filter="filterCity"
        map-options
        emit-value
        lazy-rules="ondemand"
        :rules="[val => (val && !!val) || 'Cidade é obrigatória']">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Nenhum resultado
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select v-model="form.store_id"
        outlined
        class="col-md-6 col-xs-12"
        label="Qual escola/entidade"
        option-value="id"
        option-label="name"
        use-input
        input-debounce="200"
        :options="optionsStores"
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

      <q-input label="Série"
        class="col-md-3 col-sm-6 col-xs-12 "
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.school_year"
        :rules="[
          val => (val && val.length > 0) || 'Série é obrigatório',
          val => (val.length <= 10) || 'Máximo 10 caracteres !',
        ]" />

      <q-input label="Turma"
        class="col-md-3 col-sm-6 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.class"
        :rules="[
          val => (val && val.length > 0) || 'Turma é obrigatório',
          val => (val.length <= 10) || 'Máximo 10 caracteres !',
        ]" />

      <q-select v-model="form.turn"
        outlined
        class="col-md-6 col-xs-12"
        label="Turno"
        option-value="id"
        option-label="label"
        :options="optionsTurn"
        map-options
        emit-value
        lazy-rules="ondemand"
        :rules="[val => (val && !!val) || 'Turno é obrigatória']" />

      <div class="col-12 flex-center q-gutter-sm"
        :class="$q.screen.lt.md ? 'column' : 'row'">
        <q-btn label="Voltar"
          :class="$q.screen.lt.md ? 'order-last' : ''"
          text-color="grey-8"
          style="width: 150px;"
          :to="{ name: 'responsible' }" />

        <q-btn type="submit"
          label="Confirmar"
          color="main-primary"
          style="width: 150px;" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'
import { useRoute, useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import { SessionStorage } from 'quasar'

export default defineComponent({
  name: 'DependentCreatePage',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { notifySuccess, notifyError } = notify()
    const clientId = ref(route.params.responsible)
    const form = ref({
      name: '',
      gender: null,
      birthdate: '',
      city_id: null,
      store_id: null,
      type: 1,
      school_year: '',
      class: '',
      turn: null
    })
    const optionsGender = ref([
      { label: 'Masculino', id: 'M' },
      { label: 'Feminino', id: 'F' }
    ])
    const optionsTurn = ref([
      { label: 'Matutino', id: 1 },
      { label: 'Vespertino', id: 2 },
      { label: 'Noturno', id: 3 }
    ])
    const optionsCities = ref([])
    const filterCity = (val, update) => {
      if (val.length > 2) {
        update(() => {
          api.get(`/api/v1/cities?search=${val}`)
            .then((response) => {
              optionsCities.value = response.data.data
            })
        })
      }
    }
    const optionsStores = ref([])
    const filterStore = (val, update) => {
      if (val.length > 2) {
        update(() => {
          api.get(`/api/v1/stores?search=${val}`)
            .then((response) => {
              optionsStores.value = response.data.data
            })
        })
      }
    }
    const handleSubmit = () => {
      api.post(`/api/v1/clients/${clientId.value}/dependents`, form.value)
        .then((response) => {
          SessionStorage.set('user', response.data.data)
          notifySuccess(response.data.message)
          router.push({ name: 'responsible' })
        })
        .catch((error) => {
          notifyError(error.response.data.message)
        })
    }
    return {
      form,
      optionsGender,
      optionsTurn,
      filterCity,
      optionsCities,
      filterStore,
      optionsStores,
      handleSubmit
    }
  }
})
</script>
