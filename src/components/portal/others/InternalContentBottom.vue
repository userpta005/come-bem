<template>
  <div class="row">
    <div class="col-12 flex"
      :class="content.title.justifyContent ?? 'justify-center'">
      <div class="text-h5 text-weight-bold text-main-tertiary text-center pa-responsive-md">
        {{ content.title.label }}
        <q-separator :color="content.title.separatorColor"
          :size="content.title.separatorSize"
          v-if="content.title.separator" />
      </div>
    </div>
    <div class="col-12">
      <q-carousel v-model="slide"
        animated
        padding
        control-color="black"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true">
        <q-carousel-slide v-for="(slides, index) in content.items"
          :key="index"
          :name="index">

          <div class="row no-wrap fit">
            <div class="col-xs-12 pa-responsive-xs"
              style="min-width: 230px;"
              :class="`col-md-${12 / slides.slice(0, 4).length}`"
              v-for="(item, index) in slides.slice(0, 4)"
              :key="index">

              <div class="column rounded-borders fit"
                :style="item.border === false ? '' : 'border: 0.15rem solid var(--orange)'">
                <div :class="item.title ? 'col-6' : 'col-12'">
                  <q-img :src="item.img_url"
                    class="fit rounded-borders"
                    :ratio="(1 / 2)" />
                </div>
                <div class="col-6 column"
                  v-if="item.title">
                  <div class="col-grow text-subtitle2 text-center q-pa-xs flex flex-center">{{ item.title }}
                  </div>
                  <div class="col-shrink text-caption text-center q-pa-xs">{{ item.description }}</div>
                </div>
              </div>

            </div>
          </div>

        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'InternalContentBottom',
  props: {
    content: {
      type: Object
    }
  },
  setup () {
    return {
      slide: ref(0),
      autoplay: ref(true)
    }
  }
})
</script>
