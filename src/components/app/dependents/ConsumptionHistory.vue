<template>
  <div class="row q-pa-sm">
    <div class="col-12"
      :class="$q.screen.lt.md ? 'column flex-center' : 'row items-center'">
      <span class="q-pa-sm">Legenda:</span>
      <div class="flex flex-center">
        <q-badge color="grey"
          rounded
          class="q-pa-xs"
          style="height:15px; width: 15px;" />
        <span class="q-pa-sm">Em Análise</span>
      </div>
      <div class="flex flex-center">
        <q-badge color="green"
          rounded
          class="q-pa-sm"
          style="height:15px; width: 15px;" />
        <span class="q-pa-sm">Muito nutritivo</span>
      </div>
      <div class="flex flex-center">
        <q-badge color="yellow"
          rounded
          class="q-pa-sm"
          style="height:15px; width: 15px;" />
        <span class="q-pa-sm">Moderado</span>
      </div>
      <div class="flex flex-center">
        <q-badge color="red"
          rounded
          class="q-pa-sm"
          style="height:15px; width: 15px;" />
        <span class="q-pa-sm">Pouco nutritivo</span>
      </div>
    </div>
    <q-table title="Histórico de consumo: Últimos 30 dias"
      class="col-12"
      :columns="columns"
      :rows="rows"
      :separator="[{ label: 'None', value: 'none' }]"
      row-key="id"
      flat>
      <template v-slot:body-cell-nutritional_classification="props">
        <q-td :props="props">
          <q-badge :color="badgeColor(props.row.nutritional_classification)"
            style="height:15px; width: 15px;"
            rounded />
        </q-td>
      </template>
      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="4">
            <b>Total:</b>
          </q-td>
          <q-td class="text-right">
            {{ parseInt(totalQuantity) }}
          </q-td>
          <q-td class="text-right">
            {{ floatToMoney(amount) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-btn label="Sair"
      class="rounded-borders q-ma-md col-12"
      text-color="grey-8"
      outline
      no-caps
      style="width: 150px;"
      :class="{ 'self-center': $q.screen.lt.md }"
      @click="store.mainContent = 'QCalendar'" />
  </div>
</template>

<style>
.q-table th,
.q-table tbody td,
.q-table__bottom {
  font-size: 16px;
}
</style>

<script>
import { defineComponent, computed } from 'vue'
import useStorageStore from 'src/stores/storage'
import { floatToMoney, brDate } from 'src/utils/helpers'

export default defineComponent({
  name: 'ConsumptionHistory',
  setup () {
    const store = useStorageStore()

    const rows = computed(() => {
      const arr = []
      store.account.orders.forEach((order) => {
        if (parseInt(order.status) === 2) {
          order.order_items.forEach((orderItem) => {
            const obj = {
              date: order.date
            }
            obj.id = orderItem.id
            obj.nutritional_classification = orderItem.product.nutritional_classification
            obj.product = orderItem.product.name
            obj.um = orderItem.product.um.name
            obj.quantity = orderItem.quantity
            obj.total = orderItem.total
            arr.push(obj)
          })
        }
      })
      return arr
    })

    const amount = computed(() => {
      let total = 0
      rows.value.forEach((item) => {
        total += parseInt(item.total)
      })
      return total
    })

    const totalQuantity = computed(() => {
      let quantity = 0
      rows.value.forEach((item) => {
        quantity += parseInt(item.quantity)
      })
      return quantity
    })

    const badgeColor = (nutritionalClassification) => {
      if (parseInt(nutritionalClassification) === 1) {
        return 'grey'
      } else if (parseInt(nutritionalClassification) === 2) {
        return 'red'
      } else if (parseInt(nutritionalClassification) === 3) {
        return 'yellow'
      } else if (parseInt(nutritionalClassification) === 4) {
        return 'green'
      }
    }

    const columns = [
      {
        name: 'nutritional_classification',
        align: 'left',
        label: '#',
        field: 'nutritional_classification',
        sortable: true
      },
      {
        name: 'date',
        align: 'center',
        label: 'Data',
        field: 'date',
        sortable: true,
        format: val => brDate(val)
      },
      {
        name: 'product',
        align: 'center',
        label: 'Produto',
        field: 'product',
        sortable: true
      },
      {
        name: 'um',
        align: 'center',
        label: 'UM',
        field: 'um',
        sortable: true
      },
      {
        name: 'quantity',
        align: 'right',
        label: 'Quantidade',
        field: 'quantity',
        sortable: true,
        format: (val, row) => parseInt(val)
      },
      {
        name: 'total',
        align: 'right',
        label: 'Vl.Total(R$)',
        field: 'total',
        sortable: true,
        format: (val, row) => floatToMoney(val)
      }
    ]
    return {
      store,
      columns,
      rows,
      amount,
      totalQuantity,
      floatToMoney,
      badgeColor
    }
  }
})
</script>
