<template>
  <q-btn label="Bloquear dispositivos"
    size="sm"
    class="bg-main-quaternary q-mb-sm"
    text-color="white"
    :disable="disableButtons"
    @click="prompt = true" />

  <q-dialog v-model="prompt"
    persistent>
    <q-card class="q-pa-md"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">Bloquear dispositivos</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Meus dispositivos
      </q-card-section>

      <q-form @submit.prevent="handleSubmit">

        <q-card-section class="column q-pt-none q-gutter-sm">
          <q-toggle v-for="(card, index) in form.cards"
            :key="index"
            v-model="card.status"
            :true-value="1"
            :false-value="2"
            style="border: 1px solid grey"
            class="self-start q-pa-xs rounded-borders fit"
            :label="card.uuid"
            :color="card.status === 1 ? 'green' : 'red'"
            keep-color
            left-label />
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
  name: 'BtnDisableDevice',
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
      getCards
    } = useApi()
    const form = ref({ cards: getCards() })
    const prompt = ref(false)
    const handleSubmit = async () => {
      try {
        const data = await axios({ method: 'put', url: '/api/v1/cards/block', data: form.value })
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
      handleSubmit
    }
  }
})
</script>
