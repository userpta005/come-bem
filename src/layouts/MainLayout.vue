<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="q-py-md q-px-xl">
        <div class="row items-center justify-center q-px-xl">
          <div class="col-md-auto col-xs-12">
            <img src="/imgs/logo-horizontal.png"
              style="max-height: 50px; max-width: 250px;" />
          </div>
          <q-space />
          <div class="col-md-auto col-xs-12">
            <q-btn flat
              text-color="brown"
              class="full-width"
              label="Home" />
          </div>
          <div class="col-md-auto col-xs-12">
            <q-btn flat
              text-color="brown"
              class="full-width"
              label="Para pais" />
          </div>
          <div class="col-md-auto col-xs-12">
            <q-btn flat
              text-color="brown"
              class="full-width"
              label="Para empreendedores" />
          </div>
          <div class="col-md-auto col-xs-12">
            <q-btn flat
              text-color="brown"
              class="full-width"
              label="Contatos" />
          </div>
          <div class="col-md-auto col-xs-12">
            <q-btn color="orange-8"
              class="full-width"
              label="Minha Conta/Acessar" />
          </div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup () {
    return {}
  }
})
</script>
