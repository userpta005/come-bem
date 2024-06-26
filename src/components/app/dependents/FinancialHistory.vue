<template>
  <div class="row"
    :class="$q.screen.lt.sm ? 'justify-center' : ''">

    <div class="col-12" >

      <q-table title="Histórico financeiro: Últimos 30 dias"
        style="max-width: 800px;"
        :columns="columns"
        :rows="rows"
        separator="none"
        row-key="name"
        flat
        v-model:pagination="pagination"
        :rows-per-page-options="[0]">

        <template v-slot:top>
          <h6 class="no-margin text-weight-regular"
            :class="$q.screen.lt.sm ? 'column' : ''">
            Histórico financeiro:
            <span class="text-body1 text-weight-medium text-grey-8"
              :class="$q.screen.lt.sm ? '' : 'q-pl-sm'">
              Últimos 30 dias
            </span>
          </h6>
        </template>

        <template v-slot:bottom-row>
          <q-tr>
            <q-td colspan="2">
              <b>Total:</b>
            </q-td>
            <q-td class="text-right">
              {{ floatToMoney(totalCredits).substring(3) }}
            </q-td>
            <q-td class="text-right">
              {{ floatToMoney(totalDebts).substring(3) }}
            </q-td>
          </q-tr>
        </template>

      </q-table>

    </div>

    <q-btn label="Sair"
      class="rounded-borders q-ma-md"
      text-color="grey-8"
      outline
      no-caps
      style="width: 150px;"
      @click="store.mainContent = 'QCalendar'" />
  </div>
</template>

<style>
.q-table th,
.q-table tbody td,
.q-table__bottom {
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
}
</style>

<script>
import { defineComponent, ref, computed } from 'vue'
import useStorageStore from 'src/stores/storage'
import { floatToMoney, brDate } from 'src/utils/helpers'
import notify from 'src/composables/notify'

export default defineComponent({
  name: 'FinancialHistory',
  setup () {
    const { notifyError } = notify()
    const store = useStorageStore()
    const rows = ref([])
    const totalCredits = computed(() => total(1))
    const totalDebts = computed(() => total(2))
    const pagination = ref({
      rowsPerPage: 5
    })

    const handleGetCreditPurchases = async () => {
      try {
        const { data } = await store.axios({ method: 'get', url: `/api/v1/accounts/${store.account.id}/credit-purchases` })
        rows.value = data
      } catch (error) {
        notifyError(error)
      }
    }

    handleGetCreditPurchases()

    const total = (type) => {
      let credits = 0
      let debts = 0
      rows.value.forEach((item) => {
        if (parseInt(item.type) === 1) {
          credits += parseInt(item.amount)
        } else if (parseInt(item.type) === 2) {
          debts += parseInt(item.amount)
        }
      })
      if (type === 1) {
        return credits
      } else if (type === 2) {
        return debts
      }
    }

    const columns = [
      {
        name: 'created_at',
        align: 'left',
        label: 'Data',
        field: 'created_at',
        sortable: true,
        format: val => brDate(val)
      },
      {
        name: 'description',
        align: 'left',
        label: 'Tipo movimento',
        field: 'description',
        sortable: true
      },
      {
        name: 'amount',
        align: 'right',
        label: 'Crédito(R$)',
        field: 'amount',
        sortable: true,
        format: (val, row) => {
          if (parseInt(row.type) === 1) {
            return floatToMoney(val).substring(3)
          }
          return null
        }
      },
      {
        name: 'amount',
        align: 'right',
        label: 'Débito(R$)',
        field: 'amount',
        sortable: true,
        format: (val, row) => {
          if (parseInt(row.type) === 2) {
            return floatToMoney(val).substring(3)
          }
          return null
        }
      }
    ]
    return {
      store,
      pagination,
      columns,
      rows,
      totalCredits,
      totalDebts,
      floatToMoney
    }
  }
})
</script>
