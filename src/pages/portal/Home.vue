<template>
  <q-page>
    <div class="px-responsive-xl q-py-md">
      <ArticleContent :content="article" />
      <MainContent :content="main" />
      <SectionContent :content="topSectionContent" />
      <SectionContent :content="bottomSectionContent" />
    </div>
    <NewsLetter />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ArticleContent from 'src/components/portal/common/ArticleContent.vue'
import MainContent from 'src/components/portal/common/MainContent.vue'
import SectionContent from 'src/components/portal/common/SectionContent.vue'
import NewsLetter from 'components/portal/common/NewsLetter.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    ArticleContent,
    MainContent,
    SectionContent,
    NewsLetter
  },
  setup () {
    const article = ref([
      {
        iconName: 'mdi-cart-check',
        iconSize: '2rem',
        text: 'Compra antecipada e sem filas!'
      },
      {
        iconName: 'mdi-silverware',
        iconSize: '2rem',
        text: 'Escolha o seu cardápio!'
      },
      {
        iconName: 'mdi-cash-multiple',
        iconSize: '2rem',
        text: 'Pagamento com pix ou cartão.'
      },
      {
        iconName: 'mdi-shield-check-outline',
        iconSize: '2rem',
        text: 'Compra segura com pulseira ou cartão personalizado!'
      }
    ])
    const main = ref({
      title: {
        label: 'Como funciona?',
        selfAlignment: 'self-start',
        separator: true,
        separatorColor: 'main-primary',
        separatorSize: '0.12rem'
      },
      items: [
        {
          iconName: 'mdi-reload',
          iconSize: '4rem',
          title: 'Recarga',
          text: 'Recaregando pelo site do app é cobrado uma taxa de serviço de 4,99% por recarga, o que é facilmente revertido com as vantagens apresentadas. Recarregando na cantina ou via transferência bancária não será cobrado uma taxa de serviço.',
          separator: false
        },
        {
          iconName: 'mdi-credit-card-multiple-outline',
          iconSize: '4rem',
          title: 'Cartão',
          text: 'Todo aluno receberá um Cartão NFC do Lanche Bem personalizado e gratuito. Nessa etapa, cuidaremos para que seu filho receba todas as informações necessárias (cartilha) para que não tenha dificuldades de utilização do Token de Auto Atendimento.',
          separator: false
        },
        {
          iconName: 'mdi-watch',
          iconSize: '4rem',
          title: 'Pulseira',
          text: 'As pulseirinhas com chip serão vendidas nas Cantinas parceiras. A pulseirinha é indicada para crianças menores com possibilidade de perda do cartão NFC.',
          separator: false
        },
        {
          iconName: 'mdi-map-search-outline',
          iconSize: '4rem',
          title: 'Perda',
          text: 'Em caso de perda, basta comunicar imediatamente o cancelamento à Cantina. Nesse caso, será emitido um novo cartão e cobrado uma taxa de R$ 5,00 reais. O saldo do antigo cartão será transferido para esse novo cartão.',
          separator: false
        }
      ]
    })
    const topSectionContent = ref({
      title: {
        label: 'Depoimentos',
        selfAlignment: 'self-start',
        separator: true,
        separatorColor: 'main-primary',
        separatorSize: '0.12rem'
      },
      items: [
        [
          {
            img_url: 'https://cdn.quasar.dev/img/mountains.jpg',
            title: '"A melhor escolha que a cantina já fez"',
            description: 'Bárbara Costa - Mãe, 25 anos.',
            border: true
          },
          {
            img_url: 'https://cdn.quasar.dev/img/parallax1.jpg',
            title: '"Não preciso mais me preocupar com a alimentação dos meus filhos, graças ao lanche bem"',
            description: 'Geovana Silva - Mãe, 38 anos.',
            border: true
          },
          {
            img_url: 'https://cdn.quasar.dev/img/parallax2.jpg',
            title: '"Fico bem mais tranquilo com a alimentação do meu filho agora"',
            description: 'Jorge Rodrigues - Pai, 40 anos.',
            border: true
          },
          {
            img_url: 'https://cdn.quasar.dev/img/quasar.jpg',
            title: '"Posso controlar a alimentação do meu filho de casa!"',
            description: 'Rodrigo Barros - Pai, 32 anos.',
            border: true
          }
        ],
        [
          {
            img_url: 'https://cdn.quasar.dev/img/cat.jpg',
            title: '"A melhor escolha que a cantina já fez"',
            description: 'Bárbara Costa - Mãe, 25 anos.',
            border: true
          },
          {
            img_url: 'https://cdn.quasar.dev/img/linux-avatar.png',
            title: '"Não preciso mais me preocupar com a alimentação dos meus filhos, graças ao lanche bem"',
            description: 'Geovana Silva - Mãe, 38 anos.',
            border: true
          },
          {
            img_url: 'https://cdn.quasar.dev/img/material.png',
            title: '"Fico bem mais tranquilo com a alimentação do meu filho agora"',
            description: 'Jorge Rodrigues - Pai, 40 anos.',
            border: true
          },
          {
            img_url: 'https://cdn.quasar.dev/img/donuts.png',
            title: '"Posso controlar a alimentação do meu filho de casa!"',
            description: 'Rodrigo Barros - Pai, 32 anos.',
            border: true
          }
        ]
      ]
    })
    const bottomSectionContent = ref({
      title: {
        label: 'Instagram: Últimos posts',
        selfAlignment: 'self-start',
        separator: true,
        separatorColor: 'main-primary',
        separatorSize: '0.12rem'
      },
      items: [
        [
          {
            img_url: 'https://cdn.quasar.dev/img/mountains.jpg',
            border: false
          },
          {
            img_url: 'https://cdn.quasar.dev/img/parallax1.jpg',
            border: false
          },
          {
            img_url: 'https://cdn.quasar.dev/img/parallax2.jpg',
            border: false
          }
        ],
        [
          {
            img_url: 'https://cdn.quasar.dev/img/cat.jpg',
            border: false
          },
          {
            img_url: 'https://cdn.quasar.dev/img/linux-avatar.png',
            border: false
          },
          {
            img_url: 'https://cdn.quasar.dev/img/material.png',
            border: false
          }
        ]
      ]
    })
    return {
      main,
      article,
      topSectionContent,
      bottomSectionContent
    }
  }
})
</script>
