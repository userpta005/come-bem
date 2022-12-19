<template>
  <q-page style="min-height: auto; height: auto;">
    <div class="row">
      <div class="col-md-6 col-xs-12 pa-responsive-lg">
        <div class="flex flex-center q-mb-md">
          <img src="/imgs/logo-vertical.png"
            style="max-height: 100px" />
        </div>
        <p class="text-body1 text-center">
          Informe seus dados abaixo.
        </p>
        <q-form @submit.prevent="handleSubmit"
          class="q-col-gutter-sm">

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

          <q-input label="Password"
            outlined
            clearable
            type="password"
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => (val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-checkbox v-model="form.remember_me"
            label="Lembrar-me" />

          <div class="col-12 column items-center q-gutter-sm">
            <q-btn type="submit"
              label="Entrar"
              color="main-primary"
              style="width: 150px;" />

            <q-btn label="Criar Cadastro"
              text-color="grey-8"
              style="width: 150px;"
              :to="{ name: 'register' }" />
          </div>
        </q-form>
      </div>
      <div class="col-md-6 col-xs-12 flex flex-center"
        v-if="$q.screen.gt.sm">
        <q-img src="/imgs/28920.jpg"
          style="max-height: 100vh;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const router = useRouter()
    const store = useStorageStore()
    const form = reactive({
      email: '',
      password: '',
      remember_me: false
    })
    const handleSubmit = async () => {
      try {
        const message = await store.login(form)
        notifySuccess(message)
        router.push({ name: 'dashboard' })
      } catch (error) {
        notifyError(error)
      }
    }
    return {
      form,
      handleSubmit
    }
  }
})
</script>
