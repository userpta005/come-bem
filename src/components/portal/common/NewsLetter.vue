<template>
  <div class="column bg-main-secondary px-responsive-xl text-white ">
    <h6 class="no-margin text-weight-bold text-center q-py-md">
      Newsletter
    </h6>
    <span class="text-center q-py-md">
      Fique por dentro de nossas novidades!
    </span>
    <q-form class="row flex-center q-py-md px-responsive-lg"
      @submit.prevent="handleSubmit">
      <q-input label="Nome"
        color="white"
        class="col-md-6 col-xs-12 q-pa-md"
        label-color="white"
        clearable
        filled
        lazy-rules="ondemand"
        v-model="formNewsLetter.name"
        :rules="[
          val => (!!val && val.length > 0) || 'Nome é obrigatório !',
          val => (val.length <= 100) || 'Máximo 100 caracteres !',
        ]" />
      <q-input type="email"
        class="col-md-6 col-xs-12 q-pa-md"
        label="Email"
        label-color="white"
        color="white"
        clearable
        filled
        lazy-rules="ondemand"
        v-model="formNewsLetter.email"
        :rules="[
          val => (!!val && val.length > 0) || 'Email é obrigatório',
          val => (val.length <= 100) || 'Máximo 100 caracteres !',
        ]" />
      <span class="col-12 text-center q-pa-md">
        Você receberá todas as promoções, novidades e ofertas direto no seu e-mail.
      </span>
      <q-btn label="Cadastrar"
        type="submit"
        color="main-primary"
        text-color="white" />
    </q-form>
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
      name: null,
      email: null
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
