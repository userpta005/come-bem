<template>
  <q-btn label="Bloquear dispositivos"
    class="bg-main-quaternary q-ma-sm"
    text-color="white"
    no-caps
    :disable="store.disableButtons"
    @click="prompt = true" />

  <q-dialog v-model="prompt"
    persistent>
    <q-card class="q-pa-sm"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <h6 class="no-margin text-center">Bloquear dispositivos</h6>
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        Meus dispositivos
      </q-card-section>

      <q-form @submit.prevent="handleSubmit">

        <q-card-section class="column q-pt-none q-gutter-sm">
          <q-toggle v-for="(card, index) in store.account.cards"
            :key="index"
            v-model="card.status"
            :true-value="1"
            :false-value="2"
            style="border: 1px solid grey"
            class="self-start q-pa-xs rounded-borders fit"
            :label="card.uuid"
            :color="parseInt(card.status) === 1 ? 'green' : 'red'"
            keep-color
            left-label />
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
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'BtnDisableDevice',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const prompt = ref(false)

    const handleSubmit = async () => {
      try {
        const data = await store.axios({ method: 'put', url: '/api/v1/cards/block', data: { cards: store.account.cards } })
        prompt.value = false
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      prompt,
      handleSubmit
    }
  }
})
</script>
