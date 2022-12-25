<template>
  <q-page style="min-height: auto; height:auto;"
    class="row reverse-wrap items-end justify-center">
    <div class="col-lg col-xs-12 px-responsive-sm">
      <DependentHeader />
      <QCalendar v-if="store.mainContent === 'QCalendar' && !store.disableButtons" />
      <PurchaseOrder v-if="store.mainContent === 'PurchaseOrder' && !store.disableButtons" />
      <FinishPurchaseOrder v-if="store.mainContent === 'FinishPurchaseOrder' && !store.disableButtons" />
      <LimitProduts v-if="store.mainContent === 'LimitProduts' && !store.disableButtons" />
      <ConsumptionHistory v-if="store.mainContent === 'ConsumptionHistory' && !store.disableButtons" />
      <FinancialHistory v-if="store.mainContent === 'FinancialHistory' && !store.disableButtons" />
    </div>
    <SidebarActions />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import DependentHeader from 'src/components/app/dependents/DependentHeader.vue'
import SidebarActions from 'src/components/app/common/SidebarActions.vue'
import useStorageStore from 'src/stores/storage'
import QCalendar from 'src/components/app/dependents/QCalendar.vue'
import PurchaseOrder from 'src/components/app/dependents/PurchaseOrder.vue'
import FinishPurchaseOrder from 'src/components/app/dependents/FinishPurchaseOrder.vue'
import LimitProduts from 'src/components/app/dependents/LimitProducts.vue'
import ConsumptionHistory from 'src/components/app/dependents/ConsumptionHistory.vue'
import FinancialHistory from 'src/components/app/dependents/FinancialHistory.vue'
import { useRoute } from 'vue-router'

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
    const route = useRoute()
    const store = useStorageStore()

    const refreshData = async () => {
      await store.requestUser()
      store.refreshData(route.params.dependent, route.params.account)
    }

    refreshData()

    return {
      store
    }
  }
})
</script>
