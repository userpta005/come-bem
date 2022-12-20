<template>
  <q-page class="pa-responsive-md">
    <div class="flex q-pa-sm">
      <div class="text-h5">
        Cadastro de consumidor
        <q-separator color="main-primary"
          style="height: 0.12rem;" />
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
          val => (!!val && val.length > 0) || 'Nome completo é obrigatório',
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
        :rules="[val => (!!val) || 'Sexo é obrigatória']" />

      <q-input label="Dt. de nascimento"
        stack-label
        v-model="form.birthdate"
        type="date"
        class="col-md-6 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        :rules="[val => (!!val && val.length > 0) || 'Dt. de nascimento é obrigatória']" />

      <SelectCity class="col-md-6 col-xs-12"
        v-model="form.city_id" />

      <SelectStore class="col-md-6 col-xs-12"
        v-model="form.store_id" />

      <q-input label="Série"
        class="col-md-3 col-sm-6 col-xs-12 "
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.school_year"
        :rules="[
          val => (!!val && val.length > 0) || 'Série é obrigatório',
          val => (val.length <= 10) || 'Máximo 10 caracteres !',
        ]" />

      <q-input label="Turma"
        class="col-md-3 col-sm-6 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.class"
        :rules="[
          val => (!!val && val.length > 0) || 'Turma é obrigatório',
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
        :rules="[val => (!!val) || 'Turno é obrigatória']" />

      <div class="col-12 flex-center q-gutter-sm"
        :class="$q.screen.lt.md ? 'column' : 'row'">
        <q-btn label="Voltar"
          :class="{ 'order-last': $q.screen.lt.md }"
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
import { defineComponent, reactive } from 'vue'
import notify from 'src/composables/notify'
import { useRouter } from 'vue-router'
import SelectCity from 'src/components/common/SelectCity.vue'
import SelectStore from 'src/components/common/SelectStore.vue'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'DependentCreatePage',
  components: {
    SelectCity,
    SelectStore
  },
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const router = useRouter()
    const form = reactive({
      name: null,
      gender: null,
      birthdate: null,
      city_id: null,
      store_id: null,
      type: 1,
      school_year: null,
      class: null,
      turn: null
    })
    const optionsGender = reactive([
      { label: 'Masculino', id: 'M' },
      { label: 'Feminino', id: 'F' }
    ])
    const optionsTurn = reactive([
      { label: 'Matutino', id: 1 },
      { label: 'Vespertino', id: 2 },
      { label: 'Noturno', id: 3 }
    ])
    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/clients/${store.userClient.id}/dependents`,
          data: form
        })
        store.setUser(data.data)
        notifySuccess(data.message)
        router.push({ name: 'responsible' })
      } catch (error) {
        notifyError(error)
      }
    }
    return {
      form,
      optionsGender,
      optionsTurn,
      handleSubmit
    }
  }
})
</script>
