<template>
  <q-page>

    <CustomTitle title="Informe os dados do cartão" />

    <q-form @submit.prevent="handleSubmit"
      class="row q-col-gutter-sm"
      :style="$q.screen.gt.sm ? 'max-width: 700px' : ''">

      <q-input label="Titular"
        class="col-12"
        outlined
        clearable
        lazy-rules="ondemand"
        v-model="form.name"
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
        v-model="form.card_number"
        :rules="[
          val => !!val || 'Número do cartão é obrigatório !',
          val => val.length === 19 || 'Número do cartão incompleto !'
        ]" />

      <q-input label="CVV"
        class="col-3"
        outlined
        clearable
        lazy-rules="ondemand"
        mask="###"
        v-model="form.cvv"
        :rules="[
          val => !!val || 'CVV é obrigatório !',
          val => val.length === 3 || 'CVV incompleto !!'
        ]" />

      <q-input label="Mês/Ano"
        class="col-3"
        outlined
        clearable
        lazy-rules="ondemand"
        mask="##/####"
        v-model="form.expiration_date"
        :rules="[
          val => !!val || 'Mês/Ano é obrigatório !',
          val => (parseInt(val.substring(0, 2)) >= 1 && parseInt(val.substring(0, 2)) <= 12) || 'Mês inválido !',
          val => (parseInt(val.substring(3, 7)) >= 2000 && parseInt(val.substring(3, 7)) <= 2100) || 'Ano inválido !',
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
import { useRoute, useRouter } from 'vue-router'
import useStorageStore from 'src/stores/storage'
import CustomTitle from 'src/components/app/common/CustomTitle.vue'

export default defineComponent({
  name: 'CreditCardPage',
  components: {
    CustomTitle
  },
  setup () {
    const { notifySuccess, notifyError } = notify()
    const store = useStorageStore()
    const route = useRoute()
    const router = useRouter()
    const form = reactive({
      amount: store.reloadCredits.amount,
      payment_method_id: store.reloadCredits.payment_method_id,
      name: null,
      card_number: null,
      cvv: null,
      expiration_date: null
    })

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/accounts/${store.account.id}/credit-purchases`,
          data: form
        })
        store.setUser(data.data)
        store.refreshData(route.params.dependent, route.params.account)
        router.back()
        notifySuccess(data.message)
      } catch (error) {
        notifyError(error)
      }
    }

    return {
      form,
      handleSubmit
    }
  }
})
</script>
