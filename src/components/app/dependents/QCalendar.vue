<template>
  <div class="subcontent q-pa-sm">
    <h6 class="no-margin q-pb-sm">Pedir Lanche</h6>
    <div class="row justify-between q-pb-sm">
      <span>Selecione uma data para agendamento de lanches:</span>
      <span>{{ title }}</span>
    </div>
    <div class="flex content-center items-center no-wrap">
      <div class="flex"
        style="width: 100%;">
        <q-calendar-month ref="calendar"
          v-model="selectedDate"
          :weekdays="[1, 2, 3, 4, 5, 6, 0]"
          :day-min-height="80"
          animated
          bordered
          locale="pt-br"
          :disabled-before="disabledBefore"
          @click-day="onClickDay">
          <template #day="{ scope: { timestamp } }">
            <template v-for="(event) in eventsMap[timestamp.date]"
              :key="event.id">
              <div class="flex flex-center">
                <div class="title q-calendar__ellipsis"
                  :style="{ color: getRandomColor() }">
                  {{ event.time.slice(0, 5) }}
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
  <PurchaseOrders v-model="showOrders"
    :orders="orders"
    @close-modal="showOrders = false" />
</template>

<style lang="scss">
.q-calendar-month__day.q-disabled-day,
.q-calendar-month__day.q-outside {
  background-color: #ededed !important;
  color: black !important;
}

.q-calendar-month__head--weekday {
  background-color: grey !important;
  color: white !important;
}

.q-calendar-month__day {
  cursor: pointer !important;
}

.q-calendar-month__day:hover:not(.q-disabled-day, .q-outside) {
  background-color: var(--calendar-active-date-background) !important;
}
</style>

<script>
import { QCalendarMonth, today, parseTimestamp, addToDate } from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

import { defineComponent, computed, ref } from 'vue'
import useStorageStore from 'src/stores/storage'
import { getRandomColor } from 'src/utils/helpers'
import PurchaseOrders from 'src/components/app/dependents/PurchaseOrders.vue'

export default defineComponent({
  name: 'MiniModeFirstDayMonday',
  components: {
    QCalendarMonth,
    PurchaseOrders
  },
  setup () {
    const store = useStorageStore()
    const orders = ref()
    const showOrders = ref(false)
    const selectedDate = today()
    const date = new Date()
    const title = date.toLocaleDateString('pt-BR',
      {
        year: 'numeric',
        month: 'long',
        timeZone: 'America/Sao_Paulo'
      })

    const eventsMap = computed(() => {
      const map = {}
      if (store.account.orders.length > 0) {
        store.account.orders.forEach(event => {
          (map[event.date] = (map[event.date] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[timestamp.date]) {
                map[timestamp.date] = []
              }
              map[timestamp.date].push(event)
            } while (--days > 1)
          }
        })
      }
      return map
    })

    const disabledBefore = computed(() => {
      let ts = parseTimestamp(today())
      ts = addToDate(ts, { day: -1 })
      return ts.date
    })

    function onClickDay (data) {
      store.purchaseDate = data.scope.timestamp.date
      orders.value = store.account.orders.filter(value => value.date === data.scope.timestamp.date)
      if (orders.value.length) {
        showOrders.value = true
      } else if (!data.scope.timestamp.disabled) {
        store.mainContent = 'PurchaseOrder'
      }
    }

    return {
      disabledBefore,
      onClickDay,
      selectedDate,
      title,
      eventsMap,
      getRandomColor,
      showOrders,
      orders
    }
  }
})
</script>
