<template>
  <q-page>
    <CustomTitle title="Edição de consumidor" />

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
        maxlength="50"
        v-model="form.name"
        :rules="[
          val => !!val || 'Nome completo é obrigatório !',
          val => val.length <= 50 || 'Máximo 50 caracteres !',
        ]" />

      <q-input label="Dt. de nascimento*"
        stack-label
        v-model="form.birthdate"
        type="date"
        class="col-sm-4 col-xs-12"
        outlined
        clearable
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Dt. de nascimento é obrigatório !']" />

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

      <SelectCity ref="cityRef"
        class="col-sm-4 col-xs-12"
        :optionsCities="optionsCities"
        v-model="form.city_id" />

      <div class="col-12 row q-pb-md q-col-gutter-sm"
        v-if="store.dependent.access_key">

        <q-input label="Usuário*"
          class="col-md-2 col-sm-4 col-xs-12"
          outlined
          disable
          v-model="form.access_key.email"
          :rules="[val => true]" />

        <q-input :type="isPwd ? 'password' : 'text'"
          class="col-md-3 col-sm-4 col-xs-12"
          label="Senha*"
          outlined
          clearable
          lazy-rules="ondemand"
          v-model="form.access_key.password"
          :rules="[
            val => !!val || 'Senha é obrigatória !',
            val => val.length >= 4 || 'Minímo 4 caracteres !',
          ]">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-input :type="isPwdConfirm ? 'password' : 'text'"
          class="col-md-3 col-sm-4 col-xs-12"
          label="Confirmar senha*"
          outlined
          clearable
          lazy-rules="ondemand"
          v-model="form.access_key.password_confirmation"
          :rules="[
            val => !!val || 'Confirmação da senha é obrigatória !',
            val => val.length >= 4 || 'Minímo 4 caracteres !',
            val => val === form.access_key.password || 'A senha não corresponde !',
          ]">
          <template v-slot:append>
            <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdConfirm = !isPwdConfirm" />
          </template>
        </q-input>

      </div>

      <CustomTitle title="Escola"
        class="col-12"
        size="text-h6" />

      <div class="col-12 row q-col-gutter-sm"
        v-for="(item, index) in form.accounts"
        :key="index">

        <div class="row no-wrap col-md-6 col-sm-8 col-xs-12">
          <q-btn @click="handleRemoveStore(index)"
            :disable="index === 0 || !!item.store"
            class="col-auto no-padding"
            style="height: 56px; width: 56px;"
            icon="delete"
            :color="index === 0 || !!item.store ? 'grey' : 'red'"
            size="xl"
            flat
            dense />

          <SelectStore class="col"
            :accounts="form.accounts"
            :city_id="form.city_id"
            :disable="!!item.store"
            :optionsStores="item.store ? [{ id: item.store.id, name: item.store.people.name }] : optionsStores"
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
          class="col-md-2 col-sm-6  col-xs-12"
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

export default defineComponent({
  name: 'DependentCreatePage',
  components: {
    CustomTitle,
    SelectCity,
    SelectStore
  },
  setup () {
    const { notifyError, notifySuccess } = notify()
    const store = useStorageStore()
    const router = useRouter()
    const form = reactive({
      name: store.dependent.people.name,
      full_name: store.dependent.people.full_name,
      gender: store.dependent.people.gender,
      birthdate: store.dependent.people.birthdate,
      city_id: store.dependent.people.city_id,
      type: store.dependent.type,
      access_key: null,
      accounts: store.dependent.accounts
    })

    if (store.dependent.access_key) {
      const accessKey = [store.dependent.access_key.slice(0, 3), store.dependent.access_key.slice(3)]
      form.access_key = {
        email: accessKey[0],
        password: accessKey[1],
        password_confirmation: accessKey[1]
      }
    }

    const optionsCities = ref([{ id: store.dependent.people.city_id, info: store.dependent.people.city.info }])
    const isPwd = ref(true)
    const isPwdConfirm = ref(true)
    const accountsLength = ref(form.accounts.length)
    const optionsStores = ref([])

    const handleGetStores = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: '/api/v1/stores', params: { city_id: form.city_id } })
        optionsStores.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    handleGetStores()

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

    const handleSubmit = async () => {
      try {
        const data = await store.axios({
          method: 'put',
          url: `/api/v1/dependents/${store.dependent.id}`,
          data: form
        })

        notifySuccess(data.message)
        router.push({ name: 'responsible' })
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
      optionsCities,
      isPwd,
      isPwdConfirm,
      optionsStores
    }
  }
})
</script>
