<template>
  <q-page>

    <CustomTitle title="Pix" />

    <q-form @submit.prevent="handleSubmit"
      class="column items-center"
      :style="$q.screen.gt.sm ? 'max-width: 700px' : ''">

      <p class="q-mb-xl">
        Abra o aplicativo que você tenha o PIX habilitado e utilize o QR Code abaixo para realizar o
        pagamento.
      </p>

      <q-img src="~assets/qrcode.png"
        height="200px"
        width="200px"
        class="q-mb-xl" />

      <p class="q-mb-xl">
        Abra o aplicativo que você tenha o PIX habilitado e utilize o QR Code abaixo para realizar o
        pagamento.
      </p>

      <div class="col-12 flex items-center justify-end"
        :class="$q.screen.lt.sm ? 'column' : 'row'">
        <q-btn label="Sair"
          :class="$q.screen.gt.xs ? 'q-mr-lg' : 'order-last q-mt-sm'"
          text-color="grey-8"
          outline
          style="width: 150px;"
          no-caps
          @click="$router.back()" />

        <q-btn label="Copiar código"
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
  name: 'PixPage',
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
      payment_method_id: store.reloadCredits.payment_method_id
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
