<template>
  <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
    text-color="white"
    no-caps
    align="left"
    :disable="store.disableButtons || store.hasUser"
    @click="prompt = true">
    <q-img src="~assets/celular.png"
      height="20px"
      width="20px"
      style="margin-right: 12px;" />
    Habilitar celular
  </q-btn>

  <q-dialog @hide="clearInputs"
    v-model="prompt"
    persistent>
    <q-card class="q-pa-sm"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <h6 class="no-margin text-center">Habilitar compra pelo celular</h6>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
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
            v-close-popup
            style="width: 100px;" />

          <q-btn type="submit"
            label="Confirmar"
            color="main-primary"
            style="width: 100px;" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BtnEnablePhone',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const route = useRoute()
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
          url: `/api/v1/dependents/${store.dependent.id}/create-user`,
          data: form
        })
        prompt.value = false
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
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
