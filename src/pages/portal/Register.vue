<template>
  <q-page style="min-height: auto; height: auto;">
    <div class="row">
      <div class="col-md-6 col-xs-12 pa-responsive-lg">
        <p class="text-h5 text-weight-bold text-main-tertiary text-center">
          Cadastro para ativação
        </p>
        <p class="text-body1">
          A equipe do Lanche Bem está pronta para atender e ajudar no uso dos nossos serviços.
        </p>
        <p class="text-body1">
          Para que a ativação seja feita, preencha os campos abaixo.
        </p>
        <q-form @submit.prevent="handleSubmit"
          class="row q-col-gutter-sm">
          <q-input label="Nome completo"
            class="col-12"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.name"
            :rules="[
              val => (val && val.length > 0) || 'Nome completo é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Email"
            class="col-12"
            outlined
            clearable
            type="email"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[
              val => (val && val.length > 0) || 'Email é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Telefone"
            class="col-md-6 col-xs-12"
            outlined
            clearable
            v-model="form.phone"
            mask="(##) ##### - ####"
            fill-mask
            lazy-rules="ondemand"
            :rules="[val => (val && val.length > 0) || 'Telefone é obrigatório']" />

          <q-input label="Dt. de nascimento"
            stack-label
            v-model="form.birthdate"
            type="date"
            class="col-md-6 col-xs-12"
            outlined
            clearable
            lazy-rules="ondemand"
            :rules="[val => (val && val.length > 0) || 'Dt. de nascimento é obrigatória']" />

          <SelectCity class="col-md-6 col-xs-12"
            v-model="form.city_id" />

          <div class="col-md-6 col-xs-12 row justify-center q-col-gutter-x-sm">
            <div>Você é:</div>
            <q-option-group type="radio"
              dense
              :options="[{ label: 'Pai/Tutor', value: 1, }, { label: 'Consumidor/Filho', value: 2 }]"
              v-model="form.type" />
          </div>

          <SelectStore class="col-md-6 col-xs-12"
            v-model="form.store_id" />

          <q-field :value="form.terms"
            borderless
            dense
            class="col-12">
            <template v-slot:control>
              <q-checkbox v-model="form.terms"
                label="Confirmo que li e estou de acordo com os termos de uso e a política de privacidade" />
            </template>
          </q-field>

          <div class="col-12 flex-center q-gutter-sm"
            :class="$q.screen.lt.md ? 'column' : 'row'">
            <q-btn label="Voltar"
              :class="{ 'order-last': $q.screen.lt.md }"
              text-color="grey-8"
              style="width: 150px;"
              :to="{ name: 'login' }" />

            <q-btn type="submit"
              label="Confirmar"
              color="main-primary"
              style="width: 150px;" />
          </div>
        </q-form>
      </div>
      <div class="col-md-6 col-xs-12 flex flex-center"
        v-if="$q.screen.gt.sm">
        <q-img src="/lanche-bem-portal/imgs/31094449_bp6l_agt0_220810.jpg"
          style="max-height: 100vh;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import UseAuthApi from 'src/composables/UseAuthApi'
import SelectCity from 'src/components/common/SelectCity.vue'
import SelectStore from 'src/components/common/SelectStore.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: {
    SelectCity,
    SelectStore
  },
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const { notifyError } = notify()
    const { register } = UseAuthApi()

    const form = ref({
      name: '',
      email: '',
      phone: '',
      birthdate: '',
      city_id: null,
      type: 1,
      store_id: null,
      terms: false
    })

    const handleSubmit = async () => {
      try {
        await register(form.value)
        $q.dialog({
          title: 'Parabéns, cadastro concluído!',
          message: 'Agora, basta escolher o modelo de cartão na cantina e estará habilitado para o uso.'
        }).onOk(() => {
          router.push({ name: 'login' })
        })
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
