<template>
  <q-page style="min-height: auto; height: auto;">
    <div class="row">
      <div class="col-md-6 col-xs-12 px-responsive-xl py-responsive-lg">
        <p class="text-h5 text-weight-bold text-main-tertiary text-center">Contato</p>
        <p class="text-body1 text-center">
          Informe os dados no formulário para contatarmos e entendermos como ajudar
          ou somar mais para você e a sua empresa.
        </p>
        <q-form @submit.prevent="handleSubmit">
          <q-input label="Nome"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.name"
            :rules="[
              val => (val && val.length > 0) || 'Nome é obrigatório !',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Email"
            outlined
            clearable
            type="email"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[
              val => (val && val.length > 0) || 'Email é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Telefone"
            outlined
            clearable
            v-model="form.phone"
            mask="(##) ##### - ####"
            fill-mask
            lazy-rules="ondemand"
            :rules="[val => (val && val.length > 0) || 'Telefone é obrigatório']" />

          <q-input label="Mensagem"
            autogrow
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.message" />

          <div class="col-12 px-responsive-md q-pt-lg flex flex-center">
            <q-btn type="submit"
              label="Enviar"
              color="main-primary"
              style="width: 150px;" />
          </div>
        </q-form>
      </div>
      <div class="col-md-6 col-xs-12"
        v-if="$q.screen.gt.sm">
        <q-img src="/imgs/front-view-people-having-meeting-office.jpg"
          style="height: 100vh;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'ContactsPage',
  setup () {
    const { success } = notify()
    const form = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    const handleSubmit = async () => {
      success()
    }
    return {
      form,
      handleSubmit
    }
  }
})
</script>
