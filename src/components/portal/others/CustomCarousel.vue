<template>
  <q-carousel animated
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true">
    <q-carousel-slide :name="1"
      img-src="https://cdn.quasar.dev/img/mountains.jpg" />
    <q-carousel-slide :name="2"
      img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
    <q-carousel-slide :name="3"
      img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
    <q-carousel-slide :name="4"
      img-src="https://cdn.quasar.dev/img/quasar.jpg" />
  </q-carousel>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomCarousel',
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
})
</script>
