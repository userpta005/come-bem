<template>
  <q-page style="min-height: auto; height: auto;"
    class="row">
    <div class="col-md-6 col-xs-12 q-py-md flex flex-center"
      :class="$q.screen.gt.md ? 'px-responsive-lg' : ($q.screen.gt.sm ? 'px-responsive-md' : 'px-responsive-sm')">
      <div style="width: 100%;">
        <div class="flex flex-center">
          <img src="imgs/logo-vertical.png"
            class="q-pb-md"
            style="max-height: 180px" />
        </div>
        <p class="text-center">
          Informe seus dados abaixo.
        </p>
        <q-form @submit.prevent="handleSubmit">
          <q-input label="Email"
            class="q-py-md"
            outlined
            clearable
            type="email"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[
              val => (!!val && val.length > 0) || 'Email é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Password"
            :type="isPwd ? 'password' : 'text'"
            class="q-py-md"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => (!!val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-checkbox v-model="form.remember_me"
            class="q-py-md"
            label="Lembrar-me" />

          <div class="col-12 row flex-center">
            <q-btn type="submit"
              label="Entrar"
              color="main-primary"
              no-caps
              class="q-ma-sm"
              style="width: 150px;" />

            <q-btn label="Criar cadastro"
              text-color="grey-8"
              outline
              no-caps
              class="q-ma-sm"
              style="width: 150px;"
              :to="{ name: 'register' }" />
          </div>
        </q-form>
      </div>
    </div>
    <img src="imgs/28920.jpg"
      class="col-6"
      style="height: 80vh;"
      v-if="$q.screen.gt.sm" />
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const { notifyError } = notify()
    const router = useRouter()
    const store = useStorageStore()
    const isPwd = ref(true)
    const form = reactive({
      email: null,
      password: null,
      remember_me: false
    })
    const handleSubmit = async () => {
      try {
        await store.login(form)
        router.push({ name: 'dashboard' })
      } catch (error) {
        notifyError(error)
      }
    }
    return {
      isPwd,
      form,
      handleSubmit
    }
  }
})
</script>
