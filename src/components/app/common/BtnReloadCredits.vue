<template>
  <q-btn class="text-weight-regular bg-main-quaternary q-mb-sm"
    text-color="white"
    no-caps
    align="left"
    :disable="store.disabledUser"
    @click="prompt = true">
    <q-img src="~assets/recarregar.png"
      height="20px"
      width="20px"
      style="margin-right: 12px;" />
    Recarregar créditos
  </q-btn>

  <q-dialog @show="handlePaymentMethod"
    @hide="clearInputs"
    v-model="prompt"
    persistent>

    <q-card class="q-py-lg column justify-between"
      style="max-width: 800px; min-height: 500px;"
      :style="$q.screen.gt.xs ? 'min-width: 600px; padding-left: 80px; padding-right: 80px;' : 'min-width: 300px;'">

      <q-card-section class="column flex-center">
        <h5 class="no-margin text-center">
          Recarregar créditos
          <q-separator color="main-primary" />
        </h5>
      </q-card-section>

      <q-form class="col column justify-between"
        @submit.prevent="handleSubmit">

        <q-card-section class="q-pt-none column">

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
              val => !!val || 'Valor da recarga é obrigatório !',
              val => parseFloat(val.replace(',', '.')) >= 1 || 'Valor da recarga miníno é R$1,00 !'
            ]" />

          <div class="no-margin">Formas de pagamento:</div>
          <q-radio class="no-margin"
            v-for="(item, index) in paymentMethods"
            :key="index"
            v-model="form.payment_method_id"
            :val="item.id"
            :label="item.name" />

        </q-card-section>

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
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'BtnReloadCredits',
  setup () {
    const { notifyError } = notify()
    const router = useRouter()
    const route = useRoute()
    const store = useStorageStore()
    const prompt = ref(store.openReloadCredits)
    const paymentMethods = ref([])
    const form = reactive(
      {
        amount: '1,00' ,
        payment_method_id: null
      })

    const clearInputs = () => {
      form.amount = '1,00'
      form.payment_method_id = paymentMethods.value[0].id
      store.openReloadCredits = false
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

    const handleSubmit = async () => {
      store.reloadCredits = form
      let name = null
      let params = null

      if (parseInt(form.payment_method_id) === 3) {
        name = route.name === 'responsible-dependent' ? 'responsible-credit-card' : 'dependent-credit-card'
        params = { responsible: route.params.responsible, dependent: route.params.dependent, account: route.params.account }
      } else if (parseInt(form.payment_method_id) === 4) {
        try {
          const { data } = await store.axios({
            method: 'post',
            url: `/api/v1/accounts/${store.account.id}/credit-purchases`,
            data: form
          })
          store.checkout = data.checkout
          name = route.name === 'responsible-dependent' ? 'responsible-pix' : 'dependent-pix'
          params = { dependent: route.params.dependent, account: route.params.account }
        } catch (error) {
          notifyError(error)
        }
      }
      router.push({ name, params })
    }

    return {
      store,
      prompt,
      form,
      paymentMethods,
      handleSubmit,
      clearInputs,
      handlePaymentMethod
    }
  }
})
</script>
