<template>
  <div class="row bg-blue-grey-8 text-white q-py-md"
    :class="$q.screen.gt.md ? 'px-responsive-xl' : ($q.screen.gt.sm ? 'px-responsive-lg' : 'px-responsive-md')">
    <div class="col-md-3 col-xs-12 column flex-center">
      <img src="imgs/logo-vertical.png"
        style="max-height: 200px" />
      <span class="text-center q-pa-md">
        O Lanche Bem foi criado par ajudar você no controle da alimentação do seu filho,
        e com isso, incentivá-lo desde muito cedo aos princípios da educação financeira.
      </span>
    </div>
    <div class="col-md-9 col-xs-12 row q-pa-md">
      <div class="col-md-4 col-xs-12">
        <div class="column"
          :class="$q.screen.lt.md ? 'flex-center' : 'q-pl-xl q-pt-md'">
          <span class="text-h6 text-weight-bold">FAQ</span>
          <span>Dúvidas frequentes</span>
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="column"
          :class="$q.screen.lt.md ? 'flex-center' : 'q-pl-xl q-pt-md'">
          <span class="text-h6 text-weight-bold">Mapa do site</span>
          <a class="cursor-pointer"
            @click="$router.push('home')">Home</a>
          <a class="cursor-pointer"
            @click="$router.push('to-parents')">Para pais</a>
          <a class="cursor-pointer"
            @click="$router.push('to-entrepreneurs')">Para empreendedores</a>
          <a class="cursor-pointer"
            @click="$router.push('contacts')">Contatos</a>
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="column"
          :class="$q.screen.lt.md ? 'flex-center' : 'q-pl-xl q-pt-md'">
          <span class="text-h6 text-weight-bold">Acesso interno</span>
          <span>Webmail</span>
          <a class="text-white"
            href="https://local360.com.br/lanche-bem/public/login">Painel administrativo</a>
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="column"
          :class="$q.screen.lt.md ? 'flex-center' : 'q-pl-xl q-pt-md'">
          <span class="text-h6 text-weight-bold">Transparência</span>
          <span>Política de privacidade</span>
          <span>Termos de uso</span>
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="column items-start"
          :class="$q.screen.lt.md ? 'flex-center' : 'q-pl-xl q-pt-md'">
          <span class="text-h6 text-weight-bold">Compra segura</span>
          <q-btn flat
            dense
            color="white"
            icon="mdi-shield-check-outline" />
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="column items-start"
          :class="$q.screen.lt.md ? 'flex-center' : 'q-pl-xl q-pt-md'">
          <span class="text-h6 text-weight-bold">Redes Sociais</span>
          <q-btn flat
            dense
            color="white"
            icon="mdi-instagram"
            href="https://www.instagram.com/tiodacantina_/" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a:link {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopContent'
})
</script>
