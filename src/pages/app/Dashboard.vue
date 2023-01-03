<template>
  <q-page :class="{ 'column items-center': $q.screen.lt.sm }">

    <CustomTitle title="Escolha seu perfil" />

    <q-btn flat
      no-caps
      class="text-weight-regular"
      style="height: 150px; width: 150px;"
      :class="$q.screen.gt.sm ? 'q-mr-md' : 'q-mb-md'"
      :disable="store.isDependent && !store.isResponsibleDependent"
      :to="responsibleRoute">
      <div class="column flex-center">
        <q-img src="~assets/familia.png"
          height="100px"
          width="100px" />
        Pais/Tutor
      </div>
    </q-btn>

    <q-btn flat
      no-caps
      class="text-weight-regular"
      style="height: 150px; width: 150px;"
      :disable="store.isResponsible && !store.isResponsibleDependent"
      :to="dependentRoute">
      <div class="column flex-center">
        <q-img src="~assets/aluna.png"
          height="100px"
          width="100px" />
        Consumidor/Filho
      </div>
    </q-btn>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import CustomTitle from 'src/components/app/common/CustomTitle.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    CustomTitle
  },
  setup () {
    const store = useStorageStore()

    const responsibleRoute = ref({ name: 'dashboard' })
    if (store.isResponsible || store.isResponsibleDependent) {
      responsibleRoute.value = {
        name: 'responsible',
        params: { responsible: store.userClient.id }
      }
    }

    const dependentRoute = ref({ name: 'dashboard' })
    if (store.isDependent || store.isResponsibleDependent) {
      store.dependent = store.userDependent
      store.account = store.dependent.accounts[0]
      store.hasUser = !!store.dependent.people.user
      store.disableButtons = parseInt(store.account.status) === 2
      store.mainContent = 'QCalendar'
      store.purchaseDate = null
      store.cart = []
      store.app_token = store.account.store.app_token
      dependentRoute.value = {
        name: 'dependent',
        params: { dependent: store.dependent.id, account: store.account.id }
      }
    }

    return {
      store,
      dependentRoute,
      responsibleRoute
    }
  }
})
</script>
