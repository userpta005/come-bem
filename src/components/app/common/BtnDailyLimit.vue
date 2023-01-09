<template>
  <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
    text-color="white"
    no-caps
    align="left"
    :disable="store.disabledUser"
    @click="prompt = true">
    <q-img src="~assets/financeiro.png"
      height="20px"
      width="20px"
      style="margin-right: 12px;" />
    Limite diário
  </q-btn>

  <q-dialog @hide="clearInputs"
    v-model="prompt"
    persistent>

    <q-card class="q-py-lg column justify-between"
      style="max-width: 800px; min-height: 500px;"
      :style="$q.screen.gt.xs ? 'min-width: 600px; padding-left: 80px; padding-right: 80px;' : 'min-width: 300px;'">

      <q-card-section class="column flex-center">
        <h5 class="no-margin text-center">
          Limite diário
          <q-separator color="main-primary" />
        </h5>
      </q-card-section>

      <q-form class="col column justify-between"
        @submit.prevent="handleSubmit">

        <div class="column">

          <q-card-section class="q-pt-none">
            Adicione o limite diário para este consumidor:
          </q-card-section>

          <q-card-section class="q-pt-none">

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

        </div>

        <q-card-actions align="center"
          class="text-primary q-pa-md"
          :class="$q.screen.gt.xs ? 'row' : 'column'">
          <q-btn label="Sair"
            :class="$q.screen.gt.xs ? 'q-mr-lg' : 'q-mt-md'"
            text-color="grey-8"
            outline
            v-close-popup
            no-caps
            style="width: 150px;" />

          <q-btn type="submit"
            :class="$q.screen.gt.xs ? '' : 'order-first'"
            class="no-margin"
            label="Confirmar"
            color="main-primary"
            style="width: 150px;"
            no-caps />
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
          url: `/api/v1/accounts/${store.account.id}`,
          data: form
        })
        store.account = data.data
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
