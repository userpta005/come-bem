<template>
  <q-btn label="Habilitar celular"
    size="sm"
    class="bg-main-quaternary q-mb-sm"
    text-color="white"
    :disable="store.disableButtons || store.hasUser"
    @click="prompt = true" />

  <q-dialog @hide="clearInputs"
    v-model="prompt"
    persistent>
    <q-card class="q-pa-md"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">Habilitar compra pelo celular</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Habilitar para o consumidor abaixo,
        a compra usando o celular no portal ou aplicativo.
      </q-card-section>

      <q-form @submit.prevent="handleSubmit">

        <q-card-section class="q-pt-none q-gutter-xs">
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

          <q-input type="password"
            label="Password"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => (val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length >= 8) || 'Minímo 8 caracteres !',
            ]" />

          <q-input type="password"
            label="Confirmar senha"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.password_confirmation"
            :rules="[
              val => (val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length >= 8) || 'Minímo 8 caracteres !',
              val => (val === form.password) || 'A senha não corresponde !',
            ]" />

        </q-card-section>

        <q-card-actions align="right"
          class="text-primary">
          <q-btn label="Sair"
            text-color="grey-8"
            outline
            v-close-popup />

          <q-btn type="submit"
            label="Confirmar"
            color="main-primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'BtnEnablePhone',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const prompt = ref(false)

    const form = reactive({
      email: null,
      password: null,
      password_confirmation: null
    })

    const clearInputs = () => {
      form.email = null
      form.password = null
      form.password_confirmation = null
    }

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/dependents/${store.dependentId}/create-user`,
          data: form
        })
        store.hasUser = true
        prompt.value = false
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      prompt,
      form,
      handleSubmit,
      clearInputs
    }
  }
})
</script>
