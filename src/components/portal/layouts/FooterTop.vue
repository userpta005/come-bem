<template>
  <div class="bg-blue-grey-8 text-white px-responsive-xl q-py-lg row">
    <div class="col-md-3 col-xs-12 column flex-center">
      <img src="/imgs/logo-vertical.png"
        style="max-height: 150px" />
      <div class="text-body2 text-center pa-responsive-sm">
        O Lanche Bem foi criado par ajudar você no controle da alimentação do seu filho,
        e com isso, incentivá-lo desde muito cedo aos princípios da educação financeira.
      </div>
    </div>
    <div class="col-md-9 col-xs-12 row pt-responsive-md"
      :class="$q.screen.lt.md ? '' : 'pl-responsive-xl'">
      <div class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md ? 'column flex-center' : ''">
        <div class="text-subtitle1 text-weight-bold">FAQ</div>
        <div class="text-body2">Dúvidas frequentes</div>
      </div>
      <div class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md ? 'column flex-center' : ''">
        <div class="text-subtitle1 text-weight-bold">Mapa do site</div>
        <div class="text-body2">Home</div>
        <div class="text-body2">Para pais</div>
        <div class="text-body2">Para empreendedores</div>
        <div class="text-body2">Contatos</div>
      </div>
      <div class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md ? 'column flex-center' : ''">
        <div class="text-subtitle1 text-weight-bold">Acesso interno</div>
        <div class="text-body2">Webmail</div>
        <div class="text-body2">Painel administrativo</div>
      </div>
      <div class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md ? 'column flex-center' : ''">
        <div class="text-subtitle1 text-weight-bold">Transparência</div>
        <div class="text-body2">Política de privacidade</div>
        <div class="text-body2">Termos de uso</div>
      </div>
      <div class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md ? 'column flex-center' : ''">
        <div class="text-subtitle1 text-weight-bold">Compra segura</div>
        <q-btn flat
          dense
          color="white"
          icon="mdi-shield-check-outline" />
      </div>
      <div class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md ? 'column flex-center' : ''">
        <div class="text-subtitle1 text-weight-bold">Redes Sociais</div>
        <q-btn flat
          dense
          color="white"
          icon="mdi-instagram" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterTop'
})
</script>
