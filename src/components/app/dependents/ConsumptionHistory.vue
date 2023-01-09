<template>
  <div class="row"
    :class="$q.screen.lt.md ? 'flex flex-center' : ''">
    <div class="row flex-center col-12">
      <q-table class="col-md-grow col-xs-12"
        :columns="columns"
        :rows="rows"
        :separator="[{ label: 'None', value: 'none' }]"
        row-key="id"
        flat
        v-model:pagination="pagination"
        :rows-per-page-options="[0]">
        <template v-slot:top>
          <div class="full-width">
            <h6 class="no-margin text-weight-regular q-pb-sm"
              :class="$q.screen.lt.sm ? 'column' : ''">
              Histórico de consumo:
              <span class="text-body1 text-weight-medium text-grey-8 "
                :class="$q.screen.lt.sm ? '' : 'q-pl-sm'">
                Últimos 30 dias
              </span>
            </h6>
            <div class="container"
              :class="$q.screen.lt.sm ? 'column justify-center' : 'row items-center'">
              <span class="q-pr-sm q-pb-sm">Legenda:</span>
              <div class="flex items-center q-pr-sm q-pb-sm">
                <q-badge color="grey"
                  rounded
                  style="height:15px; width: 15px;" />
                <span class="q-pl-sm">Em Análise</span>
              </div>
              <div class="flex items-center q-pr-sm q-pb-sm">
                <q-badge color="green"
                  rounded
                  style="height:15px; width: 15px;" />
                <span class="q-pl-sm">Muito nutritivo</span>
              </div>
              <div class="flex items-center q-pr-sm q-pb-sm">
                <q-badge color="yellow"
                  rounded
                  style="height:15px; width: 15px;" />
                <span class="q-pl-sm">Moderado</span>
              </div>
              <div class="flex items-center q-pr-sm q-pb-sm">
                <q-badge color="red"
                  rounded
                  style="height:15px; width: 15px;" />
                <span class="q-pl-sm">Pouco nutritivo</span>
              </div>
            </div>
          </div>
        </template>
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
            <q-td class="text-center">
              {{ parseInt(totalQuantity) }}
            </q-td>
            <q-td class="text-right">
              {{ floatToMoney(amount).substring(3) }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="col-md-shrink col-xs-12 flex flex-center q-ml-md">
        <Pie :data="chartData"
          :options="{ responsive: true }"
          style="max-width: 150px; max-height: 150px;"></Pie>
      </div>
    </div>
    <q-btn label="Sair"
      class="rounded-borders q-ma-md col-12"
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
import { defineComponent, computed, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import { floatToMoney, brDate } from 'src/utils/helpers'
// eslint-disable-next-line import/namespace
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default defineComponent({
  name: 'ConsumptionHistory',
  components: {
    Pie
  },
  setup () {
    const store = useStorageStore()

    const pagination = ref({
      rowsPerPage: 5
    })

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

    const formatToChat = computed(() => {
      const data = [0, 0, 0, 0]
      rows.value.forEach((item) => {
        if (parseInt(item.nutritional_classification) === 1) {
          data[0]++
        } else if (parseInt(item.nutritional_classification) === 2) {
          data[3]++
        } else if (parseInt(item.nutritional_classification) === 3) {
          data[2]++
        } else if (parseInt(item.nutritional_classification) === 4) {
          data[1]++
        }
      })
      return data
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
        label: 'Data consumo/Hora',
        field: 'date',
        sortable: true,
        format: val => brDate(val)
      },
      {
        name: 'product',
        align: 'left',
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
        align: 'center',
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
        format: (val, row) => floatToMoney(val).substring(3)
      }
    ]

    const chartData = {
      datasets: [
        {
          backgroundColor: ['grey', 'green', 'yellow', 'red'],
          data: formatToChat.value
        }
      ]
    }

    return {
      store,
      pagination,
      columns,
      rows,
      amount,
      totalQuantity,
      floatToMoney,
      badgeColor,
      chartData
    }
  }
})
</script>
