<template>
  <q-page style="min-height: auto; height: auto;"
    class="q-py-md"
    :class="$q.screen.gt.md ? 'px-responsive-xl' : ($q.screen.gt.sm ? 'px-responsive-lg' : 'px-responsive-md')">
    <MainContent :content="main" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MainContent from 'components/portal/common/MainContent.vue'

export default defineComponent({
  name: 'ToParentsPage',
  components: {
    MainContent
  },
  setup () {
    const main = ref({
      title: {
        label: 'Vantagens para pais e filhos',
        selfAlignment: 'self-center',
        separator: false,
        separatorColor: 'main-primary',
        separatorSize: '0.12rem'
      },
      items: [
        {
          iconName: 'mdi-silverware-variant',
          iconSize: '4rem',
          title: 'Alimentação saudável e equilibrada',
          text: 'Você saberá o que o seu filho está comendo e com direito à relatórios nutricionais da Cantina em tempo real. Isso te deixará mais tranquila e confiante em consumir na Cantina da Escola.',
          separator: true
        },
        {
          iconName: 'mdi-safe',
          iconSize: '4rem',
          title: 'Economia',
          text: 'Controle financeiro através de saldos e parâmetros financeiros. Com isso, além de controlar a alimentação do seu filho você economiza 30% mensalmente quando se comparado a outros métodos.',
          separator: true
        },
        {
          iconName: 'mdi-calculator-variant-outline',
          iconSize: '4rem',
          title: 'Evitar prejuízos',
          text: 'Não precisará mais perder tempo adentrando a escola e pegando filas para compras de fichas.',
          separator: true
        },
        {
          iconName: 'mdi-clock-outline',
          iconSize: '4rem',
          title: 'Tempo',
          text: 'Não precisará mais perder tempo adentrando a escola e pegando filas para compras de fichas.',
          separator: true
        },
        {
          iconName: 'mdi-format-list-checks',
          iconSize: '4rem',
          title: 'Gerenciamento',
          text: 'Possibilita parametizar limites de gastos diários na Cantina, bloquear alimentos poucos nutritivos ou com restrição alimentar.',
          separator: true
        },
        {
          iconName: 'mdi-notebook-multiple',
          iconSize: '4rem',
          title: 'Educação financeira',
          text: 'A criança começa a lidar com recursos financeiros desde muito cedo, o que contribui com o desenvolvimento da capacidade de gestão financeira quando adulto.',
          separator: true
        }
      ]
    })
    return {
      main
    }
  }
})
</script>
