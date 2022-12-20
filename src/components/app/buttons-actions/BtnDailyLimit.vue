<template>
  <q-btn label="Limite diário"
    size="sm"
    class="bg-main-quaternary q-mb-sm"
    text-color="white"
    :disable="store.disableButtons"
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
              val => (!!val && val.length > 0) || 'Limite diário é obrigatório'
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
  name: 'BtnDailyLimit',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const prompt = ref(false)
    const form = reactive({ daily_limit: 0 })

    const clearInputs = () => { form.daily_limit = 0 }

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'put',
          url: `/api/v1/accounts/${store.accountId}`,
          data: form
        })
        store.account.daily_limit = form.daily_limit
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
