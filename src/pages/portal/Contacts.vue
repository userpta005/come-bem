<template>
  <q-page style="min-height: auto; height: auto;"
    class="row">
    <div class="col-md-6 col-xs-12 px-responsive-xl q-py-md flex flex-center">
      <div style="width: 100%;">
        <h6 class="no-margin q-mb-md text-weight-bold text-main-tertiary text-center">Contato</h6>
        <p class="q-mt-md text-center">
          Informe os dados no formulário para contatarmos e entendermos como ajudar
          ou somar mais para você e a sua empresa.
        </p>
        <q-form @submit.prevent="handleSubmit">
          <q-input label="Nome"
            class="q-pa-md"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.name"
            :rules="[
              val => (!!val && val.length > 0) || 'Nome é obrigatório !',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Email"
            class="q-pa-md"
            outlined
            clearable
            type="email"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[
              val => (!!val && val.length > 0) || 'Email é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Telefone"
            class="q-pa-md"
            outlined
            clearable
            v-model="form.phone"
            mask="(##) ##### - ####"
            fill-mask
            lazy-rules="ondemand"
            :rules="[val => (!!val && val.length > 0) || 'Telefone é obrigatório']" />

          <q-input label="Mensagem"
            class="q-pa-md"
            autogrow
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.message" />

          <div class="flex flex-center">
            <q-btn type="submit"
              label="Enviar"
              color="main-primary" />
          </div>
        </q-form>
      </div>
    </div>
    <q-img src="imgs/front-view-people-having-meeting-office.jpg"
      class="col-6"
      style="height: 80vh;"
      v-if="$q.screen.gt.sm" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'ContactsPage',
  setup () {
    const { notifySuccess } = notify()
    const form = ref({
      name: null,
      email: null,
      phone: null,
      message: null
    })

    const handleSubmit = async () => {
      notifySuccess()
    }

    return {
      form,
      handleSubmit
    }
  }
})
</script>
