<template>
  <q-page>
    <CustomTitle title="Cadastro de consumidor" />

    <q-form @submit.prevent="handleSubmit"
      class="row q-col-gutter-sm"
      :style="$q.screen.gt.sm ? 'max-width: 700px;' : ''">

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

      <q-input label="Nome social"
        class="col-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.full_name"
        :rules="[
          val => (!!val && val.length > 0) || 'Nome social é obrigatório',
          val => (val.length <= 30) || 'Máximo 30 caracteres !',
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

      <div class="col-12 flex flex-center">
        <q-btn label="Cancelar"
          class="q-ma-xs"
          text-color="grey-8"
          outline
          style="width: 150px;"
          @click="$router.back()"
          no-caps />
        <q-btn type="submit"
          label="Confirmar"
          class="q-ma-xs"
          color="main-primary"
          style="width: 150px;"
          no-caps />
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
import CustomTitle from 'src/components/app/common/CustomTitle.vue'
import { useQuasar } from 'quasar'
import CustomDialog from 'src/components/common/CustomDialog.vue'

export default defineComponent({
  name: 'DependentCreatePage',
  components: {
    CustomTitle,
    SelectCity,
    SelectStore
  },
  setup () {
    const { notifyError } = notify()
    const $q = useQuasar()
    const store = useStorageStore()
    const router = useRouter()
    const form = reactive({
      name: null,
      full_name: null,
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
        const { data } = await store.axios({
          method: 'post',
          url: `/api/v1/clients/${store.userClient.id}/dependents`,
          data: form
        })
        $q.dialog({
          component: CustomDialog,
          componentProps: {
            title: 'Parabéns, consumidor adicionado!',
            message: `Esta é a chave de acesso: ${data.access_key}. Ela ficará disponível em Ver detalhes do consumidor.`,
            cancel: false,
            confirm: false,
            warning: false,
            checked: true
          }
        }).onOk(() => {
          router.push({ name: 'responsible' })
        }).onCancel(() => {
          router.push({ name: 'responsible' })
        })
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
