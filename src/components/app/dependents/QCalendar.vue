<template>
  <div class="subcontent">
    <h6 class="no-margin">Pedir Lanche</h6>
    <div class="row items-center justify-between q-pb-sm">
      <span class="text-weight-light"
        style="text-indent: 15px;">Selecione uma data para agendamento de lanches:</span>
      <div class="flex items-center"
        :class="$q.screen.lt.md ? 'col-12 justify-end' : ''">
        <q-btn flat
          icon="mdi-chevron-left"
          size="md"
          @click="onPrev" />
        <h6 class="no-margin text-weight-regular">{{ title.replace(/^\w/, c => c.toUpperCase()) }}</h6>
        <q-btn flat
          icon="mdi-chevron-right"
          size="md"
          @click="onNext" />
      </div>
    </div>
    <div class="flex content-center items-center no-wrap">
      <div class="flex"
        style="width: 100%;">
        <q-calendar-month ref="calendar"
          v-model="selectedDate"
          :weekdays="[1, 2, 3, 4, 5, 6, 0]"
          :day-min-height="100"
          animated
          bordered
          locale="pt-br"
          :disabled-before="disabledBefore"
          @click-day="onClickDay"
          @moved="onMoved">
          <template #day="{ scope: { timestamp } }">
            <template v-for="(event) in eventsMap[timestamp.date]"
              :key="event.id">
              <div class="flex flex-center">
                <div class="title q-calendar__ellipsis">
                  #{{ event.id.toString().padStart(3, '0') }}
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
.q-calendar__ellipsis::first-letter {
  text-transform: uppercase;
}

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

import { defineComponent } from 'vue'
import useStorageStore from 'src/stores/storage'
import PurchaseOrders from 'src/components/app/dependents/PurchaseOrders.vue'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export default defineComponent({
  name: 'MiniModeFirstDayMonday',
  components: {
    QCalendarMonth,
    PurchaseOrders
  },
  data () {
    return {
      store: useStorageStore(),
      orders: null,
      showOrders: false,
      selectedDate: today(),
      title: (new Date()).toLocaleDateString('pt-BR',
        {
          year: 'numeric',
          month: 'long',
          timeZone: 'America/Sao_Paulo'
        })
    }
  },
  computed: {
    eventsMap () {
      const map = {}
      if (this.store.account.orders.length > 0) {
        this.store.account.orders.forEach(event => {
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
    },

    disabledBefore () {
      let ts = parseTimestamp(today())
      ts = addToDate(ts, { day: -1 })
      return ts.date
    }
  },
  methods: {
    onClickDay (data) {
      this.store.purchaseDate = data.scope.timestamp.date
      this.store.turn = null
      this.store.order_id = null
      this.store.cart = []
      this.orders = this.store.account.orders.filter(value => value.date === data.scope.timestamp.date)
      if (this.orders.length && !data.scope.timestamp.disabled && !data.scope.outside) {
        this.showOrders = true
      } else if (!data.scope.timestamp.disabled && !data.scope.outside) {
        this.store.mainContent = 'PurchaseOrder'
      }
    },

    onPrev () {
      this.$refs.calendar.prev()
    },

    onNext () {
      this.$refs.calendar.next()
    },

    onMoved (data) {
      const date = parseISO(data.date)
      this.title = format(date, 'MMMM yyyy', { locale: pt })
    }
  }
})
</script>
