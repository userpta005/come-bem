<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <q-header reveal
    elevated
    class="bg-main-senary">
    <div class="px-responsive-xl q-py-md">
      <div class="row">
        <div class="col-md-auto col-xs-12 flex flex-center">
          <img src="/imgs/logo-horizontal.png"
            style="max-height: 30px;" />
        </div>
        <q-space />
        <div class="col-md-shrink col-xs-12"
          v-if="$q.screen.gt.sm"
          v-for="(link, index) in linksList"
          :key="index">
          <q-btn :flat="link.flat"
            :color="link.color"
            :text-color="link.textColor"
            :class="[link.class, { active: $route.name === link.route }]"
            :label="link.label"
            :to="{ name: link.route }">
          </q-btn>
        </div>
        <div class="col-md-shrink col-xs-12 q-pt-md"
          v-if="$q.screen.lt.md">
          <q-btn-dropdown color="main-primary"
            class="full-width"
            label="Menu">
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
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomHeader',
  setup () {
    const linksList = ref([
      {
        flat: true,
        textColor: 'main-tertiary',
        class: 'full-width',
        label: 'Home',
        route: 'home'
      },
      {
        flat: true,
        textColor: 'main-tertiary',
        class: 'full-width',
        label: 'Para pais',
        route: 'to-parents'
      },
      {
        flat: true,
        textColor: 'main-tertiary',
        class: 'full-width',
        label: 'Para empreendedores',
        route: 'to-entrepreneurs'
      },
      {
        flat: true,
        textColor: 'main-tertiary',
        class: 'full-width',
        label: 'Contatos',
        route: 'contacts'
      },
      {
        flat: false,
        color: 'main-primary',
        textColor: 'white',
        class: 'full-width',
        label: 'Minha Conta/Acessar',
        route: 'login'
      }
    ])
    return {
      linksList
    }
  }
})
</script>
