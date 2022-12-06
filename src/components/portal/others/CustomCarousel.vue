<template>
  <q-responsive :ratio="16 / 6">
    <q-carousel animated
      v-model="slide"
      control-color="black"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true">
      <q-carousel-slide :name="1"
        img-src="/imgs/banner-1.jpg" />
      <q-carousel-slide :name="2"
        img-src="/imgs/banner-2.jpg" />
      <q-carousel-slide :name="3"
        img-src="/imgs/banner-3.jpg" />
    </q-carousel>
  </q-responsive>
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
