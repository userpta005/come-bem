<template>
  <div class="row bg-main-secondary text-white pa">
    <div class="col-12 text-h5 text-weight-bold text-center q-pb-md">
      Newsletter
    </div>
    <div class="col-12 text-subtitle1 text-center q-pb-md">
      Fique por dentro de nossas novidades!
    </div>
    <div class="col-12">
      <q-form class="row"
        @submit.prevent="handleSubmit">
        <div class="col-md-6 col-xs-12 pl q-pr-sm">
          <q-input label="Nome"
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
        <div class="col-md-6 col-xs-12 pr q-pl-sm">
          <q-input type="email"
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
        <div class="col-12 text-body2 text-center q-pb-md">
          Você receberá todas as promoções, novidades e ofertas direto no seu e-mail.
        </div>
        <div class="col-12 flex flex-center">
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
    const { success } = notify()
    const formNewsLetter = ref({
      name: '',
      email: ''
    })
    const handleSubmit = async () => {
      success()
    }
    return {
      formNewsLetter,
      handleSubmit
    }
  }
})
</script>
