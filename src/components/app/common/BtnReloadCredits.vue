<template>
  <q-btn label="Recarregar créditos"
    class="bg-main-quaternary q-ma-sm"
    text-color="white"
    no-caps
    :disable="store.disableButtons"
    @click="prompt = true" />

  <q-dialog @hide="clearInputs"
    v-model="prompt"
    persistent>
    <q-card class="q-pa-sm"
      style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <h6 class="no-margin text-center">Recarregar créditos</h6>
      </q-card-section>
      <q-form @submit.prevent="handleSubmit">

        <q-card-section class="q-pt-none q-gutter-xs column">
          <q-input label="Valor da recarga"
            outlined
            clearable
            prefix="R$"
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            lazy-rules="ondemand"
            v-model="form.amount"
            :rules="[
              val => (!!val && val.length > 0) || 'Valor da recarga é obrigatório'
            ]" />

          <div>Formas de pagamento:</div>
          <q-radio v-for="(item, index) in paymentMethods"
            :key="index"
            v-model="form.payment_method_id"
            :val="item.id"
            :label="item.name" />

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
import { defineComponent, ref, reactive } from 'vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BtnReloadCredits',
  setup () {
    const { notifySuccess, notifyError } = notify()
    const route = useRoute()
    const store = useStorageStore()
    const prompt = ref(false)
    const paymentMethods = ref([])
    const form = reactive(
      {
        amount: 0,
        payment_method_id: null
      })

    const clearInputs = () => {
      form.amount = 0
      form.payment_method_id = paymentMethods.value[0].id
    }

    const handlePaymentMethod = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: '/api/v1/payment-methods' })
        paymentMethods.value = data
        form.payment_method_id = paymentMethods.value[0].id
      } catch (error) {
        notifyError(error)
      }
    }
    handlePaymentMethod()

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/accounts/${store.account.id}/credit-purchases`,
          data: form
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
      prompt,
      form,
      paymentMethods,
      handleSubmit,
      clearInputs
    }
  }
})
</script>
