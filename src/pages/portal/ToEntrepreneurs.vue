<template>
  <q-page class="pa">
    <InternalContent :content="content" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import InternalContent from 'components/portal/others/InternalContent.vue'

export default defineComponent({
  name: 'ToEntrepreneursPage',
  components: {
    InternalContent
  },
  setup () {
    const content = ref({
      title: {
        label: 'Vantagens para empreendedores'
      },
      items: [
        {
          iconName: 'mdi-timer-sand',
          iconSize: '4rem',
          title: 'Diminuição das filas',
          text: 'As Cantinas geralmente tem problemas com filas devido ao curto espaço de tempo de intervalo para atender a todos os alunos.'
        },
        {
          iconName: 'mdi-finance',
          iconSize: '4rem',
          title: 'Aumento das vendas',
          text: 'Menos filas com certeza refletirão em aumentos das vendas ao longo do ano letivo.'
        },
        {
          iconName: 'mdi-calculator-variant-outline',
          iconSize: '4rem',
          title: 'Gestão financeira',
          text: 'As Cantinas e ou Escolas não precisarão de outro sistemana Cantina (economia) caso possuem e ainda possibilitará a redução de pelo menos um funcionário, o que resulta no aumento da lucratividade.'
        },
        {
          iconName: 'mdi-cash-register',
          iconSize: '4rem',
          title: 'Menor movimentação em dinheiro',
          text: 'Grande parte dos gestores de Cantinas relatam insegurança com relação a funcionários e fluxo de caixa. Com o Lanche Bem sua segurança vai aumentar e te deixar muito mais tranquilo.'
        },
        {
          iconName: 'mdi-certificate-outline',
          iconSize: '4rem',
          title: 'Credibilidade',
          text: 'Melhoria na imagem e da relação da Cantina junto à Escola e principalmente com os pais.'
        },
        {
          iconName: 'mdi-account-multiple-check-outline',
          iconSize: '4rem',
          title: 'Consultoria em melhoria do cardápio',
          text: 'Oferecemos aos nossos parceiros consultoria na revisão e implantação de cardápios mais saudáveis e rentáveis caso haja necessidade.'
        },
        {
          iconName: 'mdi-account-cash-outline',
          iconSize: '4rem',
          title: 'Melhor custo benefício',
          text: 'Como somos Cantineiros conhecemos de perto as vantagens, desvantagens, dificuldades e desafios dessa atividade.'
        },
        {
          iconName: 'mdi-laptop',
          iconSize: '4rem',
          title: 'Tecnologia',
          text: 'Temos a melhor tecnologia e os melhores equipamentos do mercado.'
        }
      ]
    })
    return {
      content
    }
  }
})
</script>
