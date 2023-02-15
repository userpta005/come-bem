<template>
  <q-page>

    <CustomTitle title="Informe os dados do cartão" />

    <div class="column q-mb-xl">
      <span>Valor da recarga (R$): {{ form.amount }}*</span>
      <span class="text-red q-my-sm">
        Nessa recarga será cobrada uma taxa de serviço de {{
          floatToMoney(store.account.store.card_rate).slice(3)
        }}.
      </span>
      <span>
        Valor a ser creditado na conta:
        {{ floatToMoney(((moneyToFloat(form.amount) - (moneyToFloat(form.amount) *
        parseFloat(store.account.store.card_rate)) / 100))) }}
      </span>
    </div>

    <q-form @submit.prevent="handleSubmit"
      class="row q-col-gutter-sm"
      :style="$q.screen.gt.sm ? 'max-width: 700px' : ''">

      <q-input label="Titular"
        class="col-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.card.holder"
        :rules="[
          val => !!val || 'Titular é obrigatório !',
          val => val.length <= 100 || 'Máximo 100 caracteres !',
        ]" />

      <q-input label="Número do cartão"
        class="col-12"
        outlined
        clearable
        lazy-rules="ondemand"
        mask="#### #### #### ####"
        unmasked-value
        v-model="form.card.number"
        :rules="[
          val => !!val || 'Número do cartão é obrigatório !',
          val => val.length >= 16 || 'Número do cartão incompleto !'
        ]" />

      <q-input label="CVV"
        class="col-3"
        outlined
        clearable
        lazy-rules="ondemand"
        mask="###"
        v-model="form.card.security_code"
        :rules="[
          val => !!val || 'CVV é obrigatório !',
          val => val.length === 3 || 'CVV incompleto !!'
        ]" />

      <q-input label="Mês"
        class="col-3"
        outlined
        clearable
        lazy-rules="ondemand"
        mask="##"
        v-model="form.card.exp_month"
        :rules="[
          val => !!val || 'Mês é obrigatório !',
          val => val >= 1 && val <= 12 || 'Mês inválido !'
        ]" />

      <q-input label="Ano"
        class="col-3"
        outlined
        clearable
        lazy-rules="ondemand"
        mask="####"
        v-model="form.card.exp_year"
        :rules="[
          val => !!val || 'Ano é obrigatório !',
          val => val >= 2000 && val <= 2100 || 'Ano inválido !',
        ]" />

      <div class="col-12 flex flex-center"
        :class="$q.screen.lt.sm ? 'column' : 'row'">
        <q-btn label="Sair"
          :class="$q.screen.gt.xs ? 'q-mr-lg' : 'order-last q-mt-sm'"
          text-color="grey-8"
          outline
          style="width: 150px;"
          no-caps
          @click="$router.back()" />

        <q-btn type="submit"
          label="Confirmar"
          color="main-primary"
          style="width: 150px;"
          no-caps />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import notify from 'src/composables/notify'
import { useRouter } from 'vue-router'
import useStorageStore from 'src/stores/storage'
import CustomTitle from 'src/components/app/common/CustomTitle.vue'
import { floatToMoney, moneyToFloat } from 'src/utils/helpers'

export default defineComponent({
  name: 'CreditCardPage',
  components: {
    CustomTitle
  },
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const router = useRouter()
    const form = reactive({
      amount: store.reloadCredits.amount,
      payment_method_id: store.reloadCredits.payment_method_id,
      card: {
        installments: 1,
        number: null,
        exp_month: null,
        exp_year: null,
        security_code: null,
        holder: null
      }
    })

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/accounts/${store.account.id}/credit-purchases`,
          data: form
        })
        router.back()
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      store,
      form,
      handleSubmit,
      floatToMoney,
      moneyToFloat
    }
  }
})
</script>
