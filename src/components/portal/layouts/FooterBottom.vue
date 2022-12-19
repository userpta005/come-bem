<template>
  <div class="bg-blue-grey-9 text-white px-responsive-xl py-responsive-xs">
    <div class="row">
      <div class="col-md-auto col-xs-12">
        <div class="text-subtitle2 text-center">CNPJ: 00.000.000/0001-00</div>
      </div>
      <q-space />
      <div class="col-md-auto col-xs-12">
        <div class="text-subtitle2 text-center"
          :class="$q.screen.lt.md ? '' : 'q-mr-sm'">Desenvolvido por</div>
      </div>
      <div class="col-md-auto col-xs-12 row items-center justify-center">
        <img src="/lanche-bem-portal/imgs/dix-digital-logo-horizontal-branca.png"
          style="max-height: 22px" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterBottom'
})
</script>
