<template>
  <div class="row bg-main-secondary text-white px-responsive-xl">
    <div class="col-12 text-h5 text-weight-bold text-center pt-responsive-sm">
      Newsletter
    </div>
    <div class="col-12 text-subtitle1 text-center pt-responsive-sm">
      Fique por dentro de nossas novidades!
    </div>
    <div class="col-12 pt-responsive-sm">
      <q-form class="row q-col-gutter-x-md"
        @submit.prevent="handleSubmit">
        <div class="col-md-6 col-xs-12">
          <q-input label="Nome"
            class="q-mb-md"
            label-color="white"
            color="white"
            clearable
            filled
            lazy-rules="ondemand"
            v-model="formNewsLetter.name"
            :rules="[
              val => (val && val.length > 0) || 'Nome é obrigatório !',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />
        </div>
        <div class="col-md-6 col-xs-12">
          <q-input type="email"
            class="q-mb-md"
            label="Email"
            label-color="white"
            color="white"
            clearable
            filled
            lazy-rules="ondemand"
            v-model="formNewsLetter.email"
            :rules="[
              val => (val && val.length > 0) || 'Email é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />
        </div>
        <div class="col-12 text-body2 text-center">
          Você receberá todas as promoções, novidades e ofertas direto no seu e-mail.
        </div>
        <div class="col-12 pa-responsive-md flex flex-center">
          <q-btn type="submit"
            color="main-primary"
            text-color="white"
            label="Cadastrar" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'NewsLetter',
  setup () {
    const { notifySuccess } = notify()
    const formNewsLetter = ref({
      name: '',
      email: ''
    })
    const handleSubmit = async () => {
      notifySuccess()
    }
    return {
      formNewsLetter,
      handleSubmit
    }
  }
})
</script>
