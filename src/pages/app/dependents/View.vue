<template>
  <q-page class="pa-responsive-md">
    <div class="row">
      <div class="col-md-9 col-xs-12 self-start q-pa-sm">
        <DependentHeader :propDependent="dependent"
          :propAccount="account"
          @refresh-local-data="refreshLocalData" />
      </div>
      <SidebarActions @refresh-local-data="refreshLocalData(false)"
        class="col-md-3 col-xs-12 self-center"
        :disableButtons="disableButtons"
        :class="{ 'order-first': $q.screen.lt.md }" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { floatToMoney, brDate } from 'src/utils/helpers'
import useApi from 'src/composables/UseApi'
import DependentHeader from 'src/components/app/DependentHeader.vue'
import SidebarActions from 'src/components/app/SidebarActions.vue'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    DependentHeader,
    SidebarActions
  },
  setup () {
    const { notifyError } = notify()
    const {
      refreshData,
      requestUser,
      getDependent,
      getAccount,
      getAccountId,
      dependentBlocked
    } = useApi()
    const dependent = ref(getDependent())
    const account = ref(getAccount())
    const accountId = ref(getAccountId())
    const disableButtons = ref(dependentBlocked())

    const refreshLocalData = async (request = true) => {
      try {
        request ? await requestUser() : refreshData()
        dependent.value = getDependent()
        account.value = getAccount()
        accountId.value = getAccountId()
        disableButtons.value = dependentBlocked()
        api.defaults.headers.common.app = account.value.store.app_token
      } catch (error) {
        notifyError(error)
      }
    }

    refreshLocalData()

    return {
      floatToMoney,
      brDate,
      dependent,
      account,
      accountId,
      refreshLocalData,
      disableButtons
    }
  }
})
</script>
