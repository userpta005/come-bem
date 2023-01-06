<template>
  <q-header reveal
    elevated
    class="bg-main-senary row items-center justify-end q-py-md"
    :class="$q.screen.gt.md ? 'px-responsive-xl' : ($q.screen.gt.sm ? 'px-responsive-lg' : 'px-responsive-sm justify-center')">
    <img src="imgs/logo-horizontal.png"
      style="max-height: 60px;"
      :class="{ 'q-mb-md': $q.screen.lt.sm }" />
    <q-space v-if="$q.screen.gt.xs" />
    <q-btn v-show="$q.screen.gt.sm"
      v-for="(link, index) in linksList"
      :key="index"
      :label="link.label"
      :class="{ active: $route.name === link.route }"
      :flat="link.flat"
      :color="link.color"
      :text-color="link.textColor"
      :to="{ name: link.route }"
      no-caps>
    </q-btn>
    <q-btn-dropdown v-if="$q.screen.lt.md"
      label="Menu"
      :class="{ 'col-12': $q.screen.lt.sm }"
      color="main-primary">
      <q-list>
        <q-item v-for="(link, index) in linksList"
          :key="index"
          clickable
          v-close-popup
          exact
          :to="{ name: link.route }">
          <q-item-section>
            <q-item-label>{{ link.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-header>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PortalHeader',
  setup () {
    const linksList = ref([
      {
        label: 'Home',
        flat: true,
        textColor: 'main-tertiary',
        route: 'home'
      },
      {
        label: 'Para pais',
        flat: true,
        textColor: 'main-tertiary',
        route: 'to-parents'
      },
      {
        label: 'Para empreendedores',
        flat: true,
        textColor: 'main-tertiary',
        route: 'to-entrepreneurs'
      },
      {
        label: 'Contatos',
        flat: true,
        textColor: 'main-tertiary',
        route: 'contacts'
      },
      {
        label: 'Minha Conta',
        flat: false,
        color: 'main-primary',
        textColor: 'white',
        route: 'login'
      }
    ])
    return {
      linksList
    }
  }
})
</script>
