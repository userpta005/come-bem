<template>
  <q-btn label="Limite diário"
    size="sm"
    class="bg-main-quaternary q-mb-sm"
    text-color="white"
    :disable="disableButtons"
    @click="prompt = true" />

  <q-dialog @hide="clearInputs"
    v-model="prompt"
    persistent>
    <q-card class="q-pa-md"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">Limite diário</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Adicione o limite diário para este consumidor:
      </q-card-section>

      <q-form @submit.prevent="handleSubmit">

        <q-card-section class="q-pt-none q-gutter-xs">
          <q-input label="Limite diário"
            outlined
            clearable
            prefix="R$"
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            lazy-rules="ondemand"
            v-model="form.daily_limit"
            :rules="[
              val => (val && val.length > 0) || 'Limite diário é obrigatório'
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
import { SessionStorage } from 'quasar'
import UseAxios from 'src/composables/UseAxios'
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'BtnDailyLimit',
  props: {
    disableButtons: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    'refreshLocalData'
  ],
  setup (props, { emit }) {
    const { notifySuccess, notifyError } = notify()
    const { axios } = UseAxios()
    const {
      getAccountId
    } = useApi()
    const accountId = ref(getAccountId())
    const prompt = ref(false)
    const form = ref({ daily_limit: null })
    const clearInputs = () => { form.value.daily_limit = null }
    const handleSubmit = async () => {
      try {
        const data = await axios({ method: 'put', url: `/api/v1/accounts/${accountId.value}`, data: form.value })
        SessionStorage.set('user', data.data)
        prompt.value = false
        notifySuccess(data.message)
        emit('refreshLocalData')
      } catch (error) {
        notifyError(error)
      }
    }
    return {
      prompt,
      form,
      handleSubmit,
      clearInputs
    }
  }
})
</script>
