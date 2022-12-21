<template>
  <div class="row">
    <h6 class="no-margin text-weight-bold text-main-tertiary q-py-md"
      :class="content.title.selfAlignment ?? 'self-center'">
      {{ content.title.label }}
      <q-separator :color="content.title.separatorColor"
        :size="content.title.separatorSize"
        v-if="content.title.separator" />
    </h6>
    <div class="col-12">
      <q-carousel v-model="slide"
        animated
        padding
        navigation
        infinite
        control-color="black"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = false"
        :autoplay="false">
        <q-carousel-slide v-for="(slides, index) in content.items"
          :key="index"
          :name="index">
          <div class="row no-wrap fit">
            <div class="q-pa-sm"
              style="min-width: 250px;"
              :class="`col-md-${12 / slides.slice(0, 4).length}`"
              v-for="(item, index) in slides.slice(0, 4)"
              :key="index">

              <div class="column rounded-borders fit"
                :style="!item.border || 'border: 0.15rem solid var(--orange)'">
                <div :class="item.title ? 'col-6' : 'col-12'">
                  <q-img :src="item.img_url"
                    class="fit rounded-borders" />
                </div>
                <div class="col-6 column"
                  v-if="item.title">
                  <span class="col text-subtitle2 text-center q-pa-xs flex flex-center">
                    {{ item.title }}
                  </span>
                  <span class="col-shrink text-caption text-center q-pa-xs">
                    {{ item.description }}
                  </span>
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
