<template>
  <q-page style="min-height: auto; height:auto;"
    class="row justify-center">

    <div class="col-md col-xs-12 pa-responsive-sm">
      <DependentHeader />
      <QCalendar v-if="store.mainContent === 'QCalendar' && !store.disabledUser" />
      <PurchaseOrder v-if="store.mainContent === 'PurchaseOrder' && !store.disabledUser" />
      <FinishPurchaseOrder v-if="store.mainContent === 'FinishPurchaseOrder' && !store.disabledUser" />
      <LimitProduts v-if="store.mainContent === 'LimitProduts' && !store.disabledUser" />
      <ConsumptionHistory v-if="store.mainContent === 'ConsumptionHistory' && !store.disabledUser" />
      <FinancialHistory v-if="store.mainContent === 'FinancialHistory' && !store.disabledUser" />
    </div>

    <SidebarActions :style="$q.screen.gt.sm ? 'padding-top: 100px;' : ''" />

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import notify from 'src/composables/notify'
import useStorageStore from 'src/stores/storage'
import DependentHeader from 'src/components/app/dependents/DependentHeader.vue'
import SidebarActions from 'src/components/app/common/SidebarActions.vue'
import QCalendar from 'src/components/app/dependents/QCalendar.vue'
import PurchaseOrder from 'src/components/app/dependents/PurchaseOrder.vue'
import FinishPurchaseOrder from 'src/components/app/dependents/FinishPurchaseOrder.vue'
import LimitProduts from 'src/components/app/dependents/LimitProducts.vue'
import ConsumptionHistory from 'src/components/app/dependents/ConsumptionHistory.vue'
import FinancialHistory from 'src/components/app/dependents/FinancialHistory.vue'

export default defineComponent({
  name: 'DependentViewPage',
  components: {
    DependentHeader,
    SidebarActions,
    QCalendar,
    PurchaseOrder,
    FinishPurchaseOrder,
    LimitProduts,
    ConsumptionHistory,
    FinancialHistory
  },
  setup () {
    const { notifyError } = notify()
    const store = useStorageStore()

    const handleGetDependent = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: `/api/v1/dependents/${store.dependent.id}` })
        store.setDependent(data)
      } catch (error) {
        notifyError(error)
      }
    }

    handleGetDependent()

    return {
      store
    }
  }
})
</script>
