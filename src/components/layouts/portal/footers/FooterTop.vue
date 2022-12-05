<template>
  <div class="bg-blue-grey-8 text-white"
    :class="dynamicSpacing">
    <div class="q-py-md"
      :class="dynamicSpacing">
      <div class="row">
        <div class="col-md-3 col-xs-12 flex justify-center">
          <img src="/imgs/logo-vertical.png"
            class="q-mb-md"
            style="max-height: 150px" />
          <div class="text-body2 text-center">
            O Lanche Bem foi criado par ajudar você no controle da alimentação do seu filho,
            e com isso, incentivá-lo desde muito cedo aos princípios da educação financeira.
          </div>
        </div>
        <div class="col-md-9 col-xs-12">
          <div class="row"
            :class="{
              'q-ml-xl': $q.platform.is.desktop,
              'q-pl-xl': $q.platform.is.desktop
            }">
            <div class="col-md-4 col-xs-12">
              <div class="text-subtitle1 text-weight-bold"
                :class="dynamicTextCenter">FAQ</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Dúvidas frequentes</div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="text-subtitle1 text-weight-bold"
                :class="dynamicTextCenter">Mapa do site</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Home</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Para pais</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Para empreendedores</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Contatos</div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="text-subtitle1 text-weight-bold"
                :class="dynamicTextCenter">Acesso interno</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Webmail</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Painel administrativo</div>
            </div>
          </div>
          <div class="row"
            :class="{
              'q-mt-xl': $q.platform.is.desktop,
              'q-ml-xl': $q.platform.is.desktop,
              'q-pl-xl': $q.platform.is.desktop
            }">
            <div class="col-md-4 col-xs-12">
              <div class="text-subtitle1 text-weight-bold"
                :class="dynamicTextCenter">Transparência</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Política de privacidade</div>
              <div class="text-body2"
                :class="dynamicTextCenter">Termos de uso</div>
            </div>
            <div class="col-md-4 col-xs-12"
              :class="dynamicTextCenter">
              <div class="text-subtitle1 text-weight-bold"
                :class="dynamicTextCenter">Compra segura</div>
              <q-btn flat
                dense
                color="white"
                icon="mdi-shield-check-outline" />
            </div>
            <div class="col-md-4 col-xs-12"
              :class="dynamicTextCenter">
              <div class="text-subtitle1 text-weight-bold"
                :class="dynamicTextCenter">Redes Sociais</div>
              <q-btn flat
                dense
                color="white"
                icon="mdi-instagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FooterTop',
  props: {},
  setup () {
    const $q = useQuasar()
    const dynamicSpacing = computed(() => ({
      'q-px-xl': $q.platform.is.desktop,
      'q-px-md': $q.platform.is.mobile
    }))
    const dynamicTextCenter = computed(() => ({
      'text-center': $q.platform.is.mobile
    }))
    return {
      dynamicSpacing,
      dynamicTextCenter
    }
  }
})
</script>
