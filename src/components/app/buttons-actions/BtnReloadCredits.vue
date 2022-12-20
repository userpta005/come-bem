<template>
  <q-btn label="Recarregar créditos"
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
        <div class="text-h6 text-center">Recarregar créditos</div>
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
  name: 'BtnReloadCredits',
  setup () {
    const { notifySuccess, notifyError } = notify()
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
          url: `/api/v1/accounts/${store.accountId}/credit-purchases`,
          data: form
        })
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
      paymentMethods,
      handleSubmit,
      clearInputs
    }
  }
})
</script>
