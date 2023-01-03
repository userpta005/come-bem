<template>
  <q-btn label="Bloquear dispositivos"
    class="text-weight-regular bg-main-quaternary q-mb-sm"
    text-color="white"
    no-caps
    :disable="store.disableButtons"
    @click="handleOpen" />

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
          <q-toggle v-for="(card, index) in cards"
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
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BtnDisableDevice',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const cards = ref([])
    const prompt = ref(false)

    const handleOpen = () => {
      cards.value = store.account.cards.map((value) => {
        const obj = {}
        obj.id = value.id
        obj.uuid = value.uuid
        obj.status = value.status
        obj.account = {}
        obj.account.store_id = value.account.store_id
        return obj
      })
      prompt.value = true
    }

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'put',
          url: '/api/v1/cards/block',
          data: { cards: cards.value }
        })
        prompt.value = false
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      cards,
      prompt,
      handleSubmit,
      handleOpen
    }
  }
})
</script>
