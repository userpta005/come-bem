<template>
  <q-header reveal
    :reveal-offset="50"
    elevated
    class="bg-amber-1">
    <div class="q-py-md"
      :class="dynamicSpacing">
      <div class="row items-center justify-center"
        :class="dynamicSpacing">
        <div class="col-md-auto col-xs-12 text-center">
          <img src="/imgs/logo-horizontal.png"
            style="max-height: 30px; max-width: 250px;" />
        </div>
        <q-space />
        <div class="col-md-auto col-xs-12">
          <q-btn flat
            text-color="brown"
            class="full-width"
            label="Home"
            :class="{ active: $route.name === 'home' }"
            :to="{ name: 'home' }">
          </q-btn>
        </div>
        <div class="col-md-auto col-xs-12">
          <q-btn flat
            text-color="brown"
            class="full-width"
            label="Para pais"
            :class="{ active: $route.name === 'to-parents' }"
            :to="{ name: 'to-parents' }" />
        </div>
        <div class="col-md-auto col-xs-12">
          <q-btn flat
            text-color="brown"
            class="full-width"
            label="Para empreendedores"
            :class="{ active: $route.name === 'to-entrepreneurs' }"
            :to="{ name: 'to-entrepreneurs' }" />
        </div>
        <div class="col-md-auto col-xs-12">
          <q-btn flat
            text-color="brown"
            class="full-width"
            label="Contatos"
            :class="{ active: $route.name === 'contacts' }"
            :to="{ name: 'contacts' }" />
        </div>
        <div class="col-md-auto col-xs-12">
          <q-btn color="orange-8"
            class="full-width"
            label="Minha Conta/Acessar"
            :class="{ active: $route.name === 'accesses' }"
            :to="{ name: 'accesses' }" />
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CustomHeader',
  props: {},
  setup () {
    const $q = useQuasar()
    const dynamicSpacing = computed(() => ({
      'q-px-xl': $q.platform.is.desktop,
      'q-px-md': $q.platform.is.mobile
    }))
    return {
      dynamicSpacing
    }
  }
})
</script>
