<template>
  <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
    text-color="white"
    no-caps
    align="left"
    @click="prompt = true"
    :disable="store.disabledUser">
    <q-img src="~assets/sinal-de-proibido.png"
      height="20px"
      width="20px"
      style="margin-right: 12px;" />
    Bloquear dispositivos
  </q-btn>

  <q-dialog @show="handleShow"
    v-model="prompt"
    persistent>

    <q-card class="q-py-lg column justify-between"
      style="max-width: 800px; min-height: 500px;"
      :style="$q.screen.gt.xs ? 'min-width: 600px; padding-left: 80px; padding-right: 80px;' : 'min-width: 300px;'">

      <q-card-section class="column flex-center">
        <h5 class="no-margin text-center">
          Bloquear dispositivos
          <q-separator color="main-primary" />
        </h5>
      </q-card-section>

      <q-form class="col column justify-between"
        @submit.prevent="handleSubmit">

        <div class="column">

          <q-card-section class="q-pt-none">
            Meus dispositivos
          </q-card-section>

          <q-card-section class="column q-pt-none">
            <q-toggle v-for="(card, index) in cards"
              :key="index"
              v-model="card.status"
              :true-value="1"
              :false-value="2"
              style="border: 1px solid grey"
              class="row justify-evenly q-pa-xs q-mb-sm rounded-borders fit"
              :label="card.uuid"
              :color="parseInt(card.status) === 1 ? 'green' : 'red'"
              keep-color
              left-label />
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
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'BtnDisableDevice',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const cards = ref([])
    const prompt = ref(false)

    const handleShow = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: `/api/v1/accounts/${store.account.id}/cards` })
        cards.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleSubmit = async () => {
      try {
        const { message } = await store.axios({
          method: 'put',
          url: '/api/v1/cards/block',
          data: { cards: cards.value }
        })
        prompt.value = false
        notifySuccess(message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      cards,
      prompt,
      handleSubmit,
      handleShow
    }
  }
})
</script>
