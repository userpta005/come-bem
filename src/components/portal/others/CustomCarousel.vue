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
  name: 'CustomCarousel',
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
