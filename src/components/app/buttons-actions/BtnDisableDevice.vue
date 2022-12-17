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
            class="self-start q-pa-xs rounded-borders"
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
import { api } from 'src/boot/axios'
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
    const {
      getCards
    } = useApi()
    const form = ref({ cards: getCards() })
    const prompt = ref(false)
    const handleSubmit = async () => {
      try {
        const { data } = await api.put('/api/v1/cards/block', form.value)
        SessionStorage.set('user', data.data)
        prompt.value = false
        emit('refreshLocalData')
        notifySuccess(data.message)
      } catch ({ response }) {
        const msg = response.data.data ? response.data.data[Object.keys(response.data.data)[0]][0] : response.data.message
        notifyError(msg)
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
