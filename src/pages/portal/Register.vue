<template>
  <q-page style="min-height: auto; height: auto;">
    <div class="row">
      <div class="col-md-6 col-xs-12 pa-responsive-lg">
        <p class="text-h5 text-weight-bold text-main-tertiary text-center">
          Cadastro para ativação
        </p>
        <p class="text-body1"
          :class="$q.screen.lt.md ? 'text-center' : ''">
          A equipe do Lanche Bem está pronta para atender e ajudar no uso dos nossos serviços.
        </p>
        <p class="text-body1"
          :class="$q.screen.lt.md ? 'text-center' : ''">
          Para que a ativação seja feita, preencha os campos abaixo.
        </p>
        <q-form @submit.prevent=""
          class="row">
          <q-input label="Nome completo"
            class="col-12 q-mb-md"
            outlined
            clearable
            lazy-rules="ondemand"
            v-model="form.name"
            :rules="[
              val => (val && val.length > 0) || 'Nome completo é obrigatório',
              val => (val.length <= 100) || 'Máximo 100 caracteres !',
            ]" />

          <q-input label="Email"
            class="col-12 q-mb-md"
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
            class="col-md-6 col-xs-12 q-mb-md"
            :class="$q.screen.gt.sm ? 'q-pr-xs' : ''"
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
            class="col-md-6 col-xs-12 q-mb-md"
            :class="$q.screen.gt.sm ? 'q-pl-xs' : ''"
            outlined
            clearable
            lazy-rules="ondemand"
            :rules="[val => (val && val.length > 0) || 'Dt. de nascimento é obrigatória']" />

          <q-select v-model="form.city_id"
            :class="$q.screen.gt.sm ? 'q-pr-xs' : ''"
            outlined
            class="col-md-6 col-xs-12 q-mb-md"
            label="Cidade"
            option-value="id"
            option-label="info"
            use-input
            input-debounce="500"
            :options="optionsCities"
            @filter="filterCity"
            map-options
            emit-value
            lazy-rules="ondemand"
            :rules="[val => (val && !!val) || 'Cidade é obrigatória']">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhum resultado
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="col-md-6 col-xs-12 q-mb-md row justify-center"
            :class="$q.screen.gt.sm ? 'q-pl-xs' : ''">
            <div class="q-mr-md">Você é:</div>
            <q-option-group type="radio"
              dense
              :options="[{ label: 'Pai/Tutor', value: 1, }, { label: 'Consumidor/Filho', value: 2 }]"
              v-model="form.type" />
          </div>

          <q-select v-model="form.store_id"
            outlined
            class="col-md-6 col-xs-12 q-mb-md"
            label="Qual escola/entidade"
            option-value="id"
            option-label="name"
            use-input
            input-debounce="500"
            :options="optionsStores"
            @filter="filterStore"
            map-options
            emit-value
            lazy-rules="ondemand"
            :rules="[val => (val && !!val) || 'Escola é obrigatória']">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhum resultado
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-checkbox v-model="form.terms"
            class="col-12 q-mb-md"
            label="Confirmo que li e estou de acordo com os termos de uso e a política de privacidade" />

          <div class="col-12 flex-center"
            :class="$q.screen.lt.md ? 'column' : 'row'">
            <q-btn label="Voltar"
              :class="$q.screen.lt.md ? 'order-last q-mt-md' : 'q-mr-md'"
              text-color="grey-8"
              style="width: 150px;"
              :to="{ name: 'login' }" />

            <q-btn type="submit"
              @click="handleSubmit"
              label="Confirmar"
              color="main-primary"
              style="width: 150px;" />
          </div>
        </q-form>
      </div>
      <div class="col-md-6 col-xs-12 flex flex-center"
        v-if="$q.screen.gt.sm">
        <q-img src="/imgs/31094449_bp6l_agt0_220810.jpg"
          style="max-height: 100vh;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import notify from 'src/composables/notify'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'RegisterPage',
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const { notifyError } = notify()
    const rememberMe = ref(false)
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
    const optionsCities = ref([])
    const filterCity = (val, update) => {
      if (val.length > 2) {
        update(() => {
          api.get(`/api/v1/cities?search=${val}`)
            .then((response) => {
              optionsCities.value = response.data.data
            })
        })
      }
    }
    const optionsStores = ref([])
    const filterStore = (val, update) => {
      if (val.length > 2) {
        update(() => {
          api.get(`/api/v1/stores?search=${val}`)
            .then((response) => {
              optionsStores.value = response.data.data
            })
        })
      }
    }
    const handleSubmit = async () => {
      await api.post('/api/v1/auth/users', form.value)
        .then((response) => {
          $q.dialog({
            title: 'Parabéns, cadastro concluído!',
            message: 'Agora, basta escolher o modelo de cartão na cantina e estará habilitado para o uso.'
          }).onOk(() => {
            router.push({ name: 'login' })
          })
        })
        .catch((error) => {
          const msg = error.response.status === 422 ? 'Email já foi usado' : 'Erro !'
          notifyError(msg)
        })
    }
    return {
      form,
      handleSubmit,
      rememberMe,
      filterCity,
      optionsCities,
      filterStore,
      optionsStores
    }
  }
})
</script>
