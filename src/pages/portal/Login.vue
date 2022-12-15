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
        <q-form @submit.prevent="handleSubmit">

          <q-input label="Email"
            class="q-mb-md"
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
            class="q-mb-md"
            outlined
            clearable
            type="password"
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => (val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-checkbox v-model="rememberMe"
            label="Lembrar-me"
            class="q-mb-md" />

          <div class="col-12 column items-center">
            <q-btn type="submit"
              class="q-mb-md"
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
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'
import UseAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const router = useRouter()
    const { login } = UseAuthUser()
    const { notifySuccess, notifyError } = notify()
    const form = ref({
      email: '',
      password: ''
    })
    const rememberMe = ref(false)
    const handleSubmit = async () => {
      try {
        const { message } = await login(form.value)
        notifySuccess(message)
        router.push({ name: 'dashboard' })
      } catch (error) {
        notifyError(error)
      }
    }
    return {
      form,
      handleSubmit,
      rememberMe
    }
  }
})
</script>
