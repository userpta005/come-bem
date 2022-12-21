<template>
  <q-responsive :ratio="16 / 6">
    <q-carousel v-model="slide"
      animated
      control-color="black"
      navigation
      infinite
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      :autoplay="autoplay">
      <q-carousel-slide v-for="(item, index) in slides"
        :key="index"
        :name="index"
        :img-src="item.img_url" />
    </q-carousel>
  </q-responsive>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PortalCarousel',
  props: {
    slides: Array
  },
  setup () {
    return {
      slide: ref(0),
      autoplay: ref(true)
    }
  }
})
</script>
