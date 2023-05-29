<template>
  <q-page style="min-height: auto; height: auto;"
    class="row">
    <div class="col-md-6 col-xs-12 q-py-xl flex flex-center"
      :class="$q.screen.gt.md ? 'px-responsive-lg' : ($q.screen.gt.sm ? 'px-responsive-md' : 'px-responsive-sm')">
      <div style="width: 100%;">
        <h5 class="no-margin text-weight-bold text-main-tertiary text-center">
          Cadastro para ativação
        </h5>
        <p class="q-mt-md q-mx-md"
          align="justify">
          A equipe do Come Bem está pronta para atender e ajudar no uso dos nossos serviços.
        </p>
        <p class="q-mx-md"
          align="justify">
          Para que a ativação seja feita, preencha os campos abaixo.
        </p>
        <q-form @submit.prevent="handleSubmit"
          class="row">
          <q-input label="Nome completo*"
            class="col-12 q-pa-md"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.name"
            :rules="[
              val => (!!val && val.length > 0) || 'Nome completo é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <div class="col-12 flex flex-center">
            <div class="q-pa-md">Você é:</div>
            <q-option-group type="radio"
              dense
              inline
              :options="[{ label: 'Pai/Tutor', value: 1, }, { label: 'Consumidor/Filho', value: 2 }]"
              v-model="form.type" />
          </div>

          <q-input label="Email*"
            class="col-12 q-pa-md"
            outlined
            clearable
            type="email"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[
              val => (!!val && val.length > 0) || 'Email é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Telefone*"
            class="col-md-6 col-xs-12 q-pa-md"
            outlined
            clearable
            fill-mask
            mask="(##) ##### - ####"
            lazy-rules="ondemand"
            v-model="form.phone"
            :rules="[val => (!!val && val.length > 0) || 'Telefone é obrigatório']" />

          <q-input label="Dt. de nascimento*"
            class="col-md-6 col-xs-12 q-pa-md"
            stack-label
            type="date"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.birthdate"
            :rules="[val => (!!val && val.length > 0) || 'Dt. de nascimento é obrigatória']" />

          <SelectCity class="col-xs-12 q-pa-md"
            :class="form.type !== 1 ? 'col-md-6' : ''"
            v-model="form.city_id" />

          <SelectStore class="col-md-6 col-xs-12 q-pa-md"
            v-if="form.type !== 1"
            :city_id="form.city_id"
            v-model="form.store_id" />

          <q-input :type="isPwd ? 'password' : 'text'"
            class="col-md-6 col-xs-12 q-pa-md"
            label="Senha*"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => (val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length >= 8) || 'Minímo 8 caracteres !',
            ]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-input :type="isPwdConfirm ? 'password' : 'text'"
            class="col-md-6 col-xs-12 q-pa-md"
            label="Confirmar senha*"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.password_confirmation"
            :rules="[
              val => (val && val.length > 0) || 'Senha é obrigatório',
              val => (val.length >= 8) || 'Minímo 8 caracteres !',
              val => (val === form.password) || 'A senha não corresponde !',
            ]">
            <template v-slot:append>
              <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm" />
            </template>
          </q-input>

          <q-field :value="form.terms"
            class="col-12 q-pa-md"
            borderless
            dense>
            <template v-slot:control>
              <q-checkbox v-model="form.terms"
                label="Confirmo que li e estou de acordo com os termos de uso e a política de privacidade" />
            </template>
          </q-field>

          <div class="col-12 flex flex-center">
            <q-btn label="Voltar"
              class="q-ma-sm"
              text-color="grey-8"
              outline
              style="width: 150px;"
              :to="{ name: 'login' }"
              no-caps />

            <q-btn type="submit"
              label="Confirmar"
              class="q-ma-sm"
              color="main-primary"
              style="width: 150px;"
              no-caps />
          </div>
        </q-form>
      </div>
    </div>
    <img src="imgs/31094449_bp6l_agt0_220810.jpg"
      class="col-6"
      style="height: 80vh;"
      v-if="$q.screen.gt.sm" />
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'
import SelectCity from 'src/components/common/SelectCity.vue'
import SelectStore from 'src/components/common/SelectStore.vue'
import CustomDialog from 'src/components/common/CustomDialog.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: {
    SelectCity,
    SelectStore
  },
  setup () {
    const { notifyError } = notify()
    const $q = useQuasar()
    const router = useRouter()
    const store = useStorageStore()
    const isPwd = ref(true)
    const isPwdConfirm = ref(true)

    const form = reactive({
      name: null,
      email: null,
      phone: null,
      birthdate: null,
      city_id: null,
      type: 1,
      store_id: null,
      password: null,
      password_confirmation: null,
      terms: false
    })

    const handleSubmit = async () => {
      try {
        if (!form.terms) {
          notifyError('Termos de uso e política de privacidade obrigatórios !')
          return
        }
        await store.register(form)
        $q.dialog({
          component: CustomDialog,
          componentProps: {
            title: 'Parabéns, cadastro concluído!',
            message: 'Agora, basta escolher o modelo de cartão na cantina e estará habilitado para o uso.',
            cancel: false,
            confirm: true,
            confirmText: 'Acessar minha conta',
            warning: false,
            checked: true
          }
        }).onOk(() => {
          router.push({ name: 'login' })
        }).onCancel(() => {
          router.push({ name: 'login' })
        })
      } catch (error) {
        notifyError(error)
      }
    }
    return {
      form,
      handleSubmit,
      isPwd,
      isPwdConfirm
    }
  }
})
</script>
