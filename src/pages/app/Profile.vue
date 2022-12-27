<template>
  <q-page>
    <div class="flex q-pa-sm">
      <h6 class="no-margin">
        Editar perfil
        <q-separator color="main-primary"
          size="0.12rem" />
      </h6>
    </div>
    <q-form @submit.prevent="handleSubmit"
      class="column q-pa-sm q-col-gutter-xs"
      :style="$q.screen.gt.sm ? 'max-width: 50%;' : ''">

      <q-input label="Nome completo"
        class="col-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.name"
        :rules="[
          val => (!!val && val.length > 0) || 'Nome completo é obrigatório',
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

      <div class="col-12 flex flex-center"
        :class="$q.screen.lt.md ? 'column' : 'row'">
        <q-btn label="Voltar"
          class="q-ma-xs"
          :class="{ 'order-last': $q.screen.lt.md }"
          text-color="grey-8"
          outline
          style="width: 150px;"
          :to="{ name: 'dashboard' }" />

        <q-btn type="submit"
          label="Confirmar"
          class="q-ma-xs"
          color="main-primary"
          style="width: 150px;" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import notify from 'src/composables/notify'
import { useRouter } from 'vue-router'
import useStorageStore from 'src/stores/storage'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const router = useRouter()
    const form = reactive({
      name: null,
      email: null
    })

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'put',
          url: '/api/v1/auth/profile',
          data: form
        })
        notifySuccess(data.message)
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
