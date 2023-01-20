<template>
  <q-page>
    <CustomTitle title="Cadastro de consumidor" />

    <CustomTitle title="Dados gerais"
      class="col-12"
      size="text-h6" />

    <q-form @submit.prevent="handleSubmit"
      class="row q-col-gutter-sm"
      :style="$q.screen.gt.sm ? 'max-width: 900px;' : ''">

      <q-input label="Nome completo*"
        class="col-sm-8 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        maxlength="100"
        v-model="form.name"
        :rules="[
          val => !!val || 'Nome completo é obrigatório !',
          val => val.length <= 100 || 'Máximo 100 caracteres !',
        ]" />

      <q-input label="Dt. de nascimento*"
        stack-label
        v-model="form.birthdate"
        type="date"
        class="col-sm-4 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Dt. de nascimento é obrigatória !']" />

      <q-input label="Nome social*"
        class="col-sm-8 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        maxlength="30"
        v-model="form.full_name"
        :rules="[
          val => !!val || 'Nome social é obrigatório !',
          val => val.length <= 30 || 'Máximo 30 caracteres !',
        ]" />

      <q-select v-model="form.gender"
        outlined
        class="col-sm-4 col-xs-12"
        label="Sexo*"
        option-value="id"
        option-label="label"
        :options="optionsGender"
        map-options
        emit-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Sexo é obrigatório !']" />

      <SelectCity class="col-sm-4 col-xs-12"
        v-model="form.city_id" />

      <q-input label="Limite diário"
        class="col-sm-4 col-xs-12"
        outlined
        clearable
        prefix="R$"
        mask="#,##"
        fill-mask="0"
        reverse-fill-mask
        lazy-rules="ondemand"
        v-model="form.daily_limit"
        :rules="[val => true]" />

      <CustomTitle title="Escola"
        class="col-12"
        size="text-h6" />

      <div class="col-12 row q-col-gutter-sm"
        v-for="(item, index) in form.accounts"
        :key="index">

        <div class="row no-wrap col-md-6 col-sm-8 col-xs-12">
          <q-btn @click="handleRemoveStore(index)"
            :disable="index === 0"
            class="col-auto no-padding"
            style="height: 56px; width: 56px;"
            icon="delete"
            :color="index === 0 ? 'grey' : 'red'"
            size="xl"
            flat
            dense />

          <SelectStore class="col"
            :accounts="form.accounts"
            :city_id="form.city_id"
            :optionsStores="optionsStores"
            v-model="item.store_id" />
        </div>

        <q-input label="Série*"
          class="col-md-2 col-sm-4 col-xs-12"
          outlined
          clearable
          lazy-rules="ondemand"
          maxlength="10"
          v-model="item.school_year"
          :rules="[
            val => !!val || 'Série é obrigatória !',
            val => val.length <= 10 || 'Máximo 10 caracteres !',
          ]" />

        <q-input label="Turma*"
          class="col-md-2 col-sm-6 col-xs-12"
          outlined
          clearable
          lazy-rules="ondemand"
          maxlength="10"
          v-model="item.class"
          :rules="[
            val => !!val || 'Turma é obrigatória !',
            val => val.length <= 10 || 'Máximo 10 caracteres !',
          ]" />

        <q-select v-model="item.turn"
          outlined
          class="col-md-2 col-sm-6 col-xs-12"
          label="Turno*"
          option-value="id"
          option-label="label"
          :options="optionsTurn"
          map-options
          emit-value
          lazy-rules="ondemand"
          :rules="[val => !!val || 'Turno é obrigatório !']" />

      </div>

      <div class="col-12 row">
        <q-btn label="Adicionar nova escola"
          :class="$q.screen.gt.xs ? 'q-mr-sm' : 'q-mb-sm'"
          color="main-primary"
          no-caps
          style="width: 200px; background: #00a443;"
          @click="handleAddNewStore" />
      </div>

      <div class="col-12 flex flex-center q-mt-xl">
        <q-btn label="Cancelar"
          class="q-ma-xs"
          text-color="grey-8"
          outline
          style="width: 150px;"
          @click="$router.back()"
          no-caps />
        <q-btn type="submit"
          label="Confirmar"
          class="q-ma-xs"
          color="main-primary"
          style="width: 150px;"
          no-caps />
      </div>
    </q-form>

  </q-page>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import notify from 'src/composables/notify'
import { useRouter } from 'vue-router'
import SelectCity from 'src/components/common/SelectCity.vue'
import SelectStore from 'src/components/common/SelectStore.vue'
import useStorageStore from 'src/stores/storage'
import CustomTitle from 'src/components/app/common/CustomTitle.vue'
import { useQuasar } from 'quasar'
import CustomDialog from 'src/components/common/CustomDialog.vue'

export default defineComponent({
  name: 'DependentCreatePage',
  components: {
    CustomTitle,
    SelectCity,
    SelectStore
  },
  setup () {
    const { notifyError } = notify()
    const $q = useQuasar()
    const store = useStorageStore()
    const router = useRouter()
    const form = reactive({
      name: null,
      full_name: null,
      gender: null,
      birthdate: null,
      city_id: null,
      type: 1,
      daily_limit: 0,
      accounts: [
        {
          store_id: null,
          school_year: null,
          class: null,
          turn: null
        }
      ]
    })
    const isPwd = ref(true)
    const isPwdConfirm = ref(true)
    const accountsLength = ref(form.accounts.length)
    const optionsStores = ref([])

    watch(() => form.city_id, (newValue, oldValue) => {
      if (!!newValue) {
        handleGetStores()
      }
    })

    const optionsGender = reactive([
      { label: 'Masculino', id: 'M' },
      { label: 'Feminino', id: 'F' }
    ])

    const optionsTurn = reactive([
      { label: 'Matutino', id: 1 },
      { label: 'Vespertino', id: 2 },
      { label: 'Noturno', id: 3 }
    ])

    const handleGetStores = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: '/api/v1/stores', params: { city_id: form.city_id } })
        optionsStores.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'post',
          url: `/api/v1/clients/${store.userClient.id}/dependents`,
          data: form
        })

        const accessKey = [data.data.access_key.slice(0, 3), data.data.access_key.slice(3)]

        $q.dialog({
          component: CustomDialog,
          componentProps: {
            title: 'Parabéns, consumidor adicionado!',
            message: `
            <h6 class="no-margin q-pb-sm">Código de acesso !</h6>
            <b>${data.data.people.name}</b> use o código para acessar.
            <p class="no-margin">Usuário: <b class="text-h6">${accessKey[0]}</b></p>
            <p class="no-margin">Senha: <b class="text-h6">${accessKey[1]}</b></p>
            <p class="no-margin text-body2 q-pb-lg">Use o usuário e senha para fazer o pedido e consumir de forma fácil.</p>
            <h6 class="no-margin">Créditos</h6>
            Aproveite e insira o crédito para evitar filas.
            `,
            cancel: false,
            confirm: true,
            confirmText: 'Comprar créditos',
            warning: false,
            checked: true
          }
        }).onOk(() => {
          store.dependent = data.data
          store.account = store.dependent.accounts[0]
          store.disabledUser = parseInt(store.account.status) === 2
          store.app_token = store.account.store.app_token
          store.openReloadCredits = true
          store.mainContent = 'QCalendar'
          router.push({
            name: 'responsible-dependent',
            params: { client: store.userClient.id, dependent: store.dependent.id, account: store.account.id }
          })
        })
      } catch (error) {
        notifyError(error)
      }
    }

    const handleAddNewStore = () => {
      const lastElement = form.accounts[form.accounts.length - 1]
      let isEmpty = false

      Object.entries(lastElement).forEach(item => {
        if (['store_id', 'school_year', 'class', 'turn'].includes(item[0]) && !item[1]) {
          isEmpty = true
        }
      })

      if (isEmpty) {
        notifyError('Preencha todos os campos obrigatórios da última escola !')
        return
      }

      form.accounts.push({
        store_id: null,
        school_year: null,
        class: null,
        turn: null
      })
    }

    const handleRemoveStore = (index) => {
      form.accounts = form.accounts.filter((val, key) => key !== index)
    }

    return {
      store,
      form,
      optionsGender,
      optionsTurn,
      handleSubmit,
      handleAddNewStore,
      handleRemoveStore,
      accountsLength,
      isPwd,
      isPwdConfirm,
      optionsStores
    }
  }
})
</script>
