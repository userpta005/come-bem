<template>
  <q-btn label="Limite diário"
    size="sm"
    class="bg-main-quaternary q-mb-sm"
    text-color="white"
    :disable="disableButtons"
    @click="prompt" />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'BtnDailyLimit',
  props: {
    disableButtons: {
      type: Boolean,
      required: false
    }
  },
  setup () {
    const $q = useQuasar()

    const prompt = () => {
      $q.dialog({
        title: 'Limite diário',
        message: 'Adicione o limite diário para este consumidor',
        prompt: {
          model: '',
          isValid: val => val.length > 2,
          type: 'text',
          prefix: 'R$',
          mask: '###,##'
        },
        cancel: {
          label: 'Sair',
          color: 'white',
          textColor: 'grey-8',
          outline: true
        },
        ok: {
          label: 'Confirmar',
          color: 'main-primary'
        },
        persistent: true
      }).onOk(data => {
        console.log('>>>> OK, received', data)
      })
    }

    return {
      prompt
    }
  }
})
</script>
