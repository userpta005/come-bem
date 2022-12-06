<template>
  <q-page>
    <div class="row">
      <div class="col-md-6 col-xs-12"
        :class="[dynamicHeightSpacing, dynamicWidthSpacing]">
        <div class="q-gutter-y-md"
          :class="dynamicWidthSpacing">
          <p class="text-h5 text-weight-bold text-brown-7 text-center">Contato</p>
          <p class="text-body1 text-center">
            Informe os dados no formulário para contatarmos e entendermos como ajudar
            ou somar mais para você e a sua empresa.
          </p>
          <q-form class="q-gutter-y-md text-center">
            <q-input label="Nome"
              outlined
              clearable
              v-model="form.name"
              :rules="[
                val => (val && val.length > 0) || 'Nome é obrigatório !',
                val => (val.length <= 100) || 'Máximo 100 caracteres !',
              ]" />

            <q-input label="Email"
              outlined
              clearable
              type="email"
              v-model="form.email"
              :rules="[
                val => (val && val.length > 0) || 'Email é obrigatório',
                val => (val.length <= 100) || 'Máximo 100 caracteres !',
              ]" />

            <q-input label="Telefone"
              outlined
              clearable
              v-model="form.phone"
              mask="(##) ##### - ####"
              fill-mask
              :rules="[val => (val && val.length > 0) || 'Telefone é obrigatório']" />

            <q-input label="Mensagem"
              autogrow
              outlined
              clearable
              v-model="form.message" />

            <q-btn label="Enviar"
              color="orange-8"
              style="width: 150px;" />
          </q-form>
        </div>
      </div>
      <div class="col-md-6 col-xs-12"
        v-if="$q.platform.is.desktop">
        <q-img src="/imgs/front-view-people-having-meeting-office.jpg"
          style="height: 100vh;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ContactsPage',
  setup () {
    const $q = useQuasar()
    const dynamicHeightSpacing = computed(() => ({
      'q-py-xl': $q.platform.is.desktop,
      'q-py-md': $q.platform.is.mobile
    }))
    const dynamicWidthSpacing = computed(() => ({
      'q-px-xl': $q.platform.is.desktop,
      'q-px-md': $q.platform.is.mobile
    }))
    const form = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    return {
      form,
      dynamicHeightSpacing,
      dynamicWidthSpacing
    }
  }
})
</script>
