<template>
  <q-page :class="{ 'column items-center': $q.screen.lt.sm }">

    <CustomTitle title="Escolha seu perfil" />

    <q-btn class="text-weight-regular"
      style="height: 250px; width: 250px;"
      flat
      dense
      :class="$q.screen.gt.sm ? 'q-mr-md' : 'q-mb-md'"
      :disable="store.isDependent && !store.isResponsibleDependent"
      :to="responsibleRoute">
      <q-img src="~assets/pais-tutores.png"
        height="250px"
        width="250px" />
    </q-btn>

    <q-btn class="text-weight-regular"
      style="height: 250px; width: 250px;"
      flat
      dense
      :disable="store.isResponsible && !store.isResponsibleDependent"
      :to="dependentRoute">
      <q-img src="~assets/filho-consumidor.png"
        height="250px"
        width="250px" />
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
      store.disabledUser = parseInt(store.account.status) === 2
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
