<template>
  <q-page>

    <CustomTitle title="Pix" />

    <div class="column items-center"
      :style="$q.screen.gt.sm ? 'max-width: 700px' : ''">

      <p class="q-mb-xl">
        Abra o aplicativo que você tenha o PIX habilitado e utilize o QR Code abaixo para realizar o
        pagamento.
      </p>

      <q-img :src="store.checkout.payment_response[0].links[0].href"
        height="200px"
        width="200px"
        class="q-mb-xl" />

      <p class="q-mb-xl">
        Se preferir, copie o código abaixo e utilize o PIX Copia e cola no seu aplicativo.
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
          no-caps
          @click="copyCode" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import notify from 'src/composables/notify'
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

    const copyCode = async () => {
      try {
        await navigator.clipboard.writeText(store.checkout.payment_response[0].text)
        notifySuccess('Código copiado com sucesso !')
      } catch (error) {
        notifyError('Ocorreu algum erro ao copiar o código !')
      }
    }

    return {
      store,
      copyCode
    }
  }
})
</script>
