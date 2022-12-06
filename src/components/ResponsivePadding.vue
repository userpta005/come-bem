<template>
  <div :class="dynamicClass">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ResponsivePadding',
  props: {
    class: {
      type: String,
      default: 'p'
    }
  },
  setup (props) {
    const dynamicClass = computed(() => ({ [props.class]: props.class }))
    return {
      dynamicClass
    }
  }
})
</script>

<style lang="scss">
$xs: 16px;
$sm: 32px;
$md: 48px;
$lg: 64px;
$xl: 80px;

.p-xs {
  padding: $xs;
}

.pt-xs {
  padding-top: $xs;
}

.pr-xs {
  padding-right: $xs;
}

.pb-xs {
  padding-bottom: $xs;
}

.pl-xs {
  padding-left: $xs;
}

.px-xs {
  padding: 0px $xs 0px $xs;
}

.py-xs {
  padding: $xs 0px $xs 0px;
}

.p-sm {
  padding: $sm;
}

.pt-sm {
  padding-top: $sm;
}

.pr-sm {
  padding-right: $sm;
}

.pb-sm {
  padding-bottom: $sm;
}

.pl-sm {
  padding-left: $sm;
}

.px-sm {
  padding: 0px $sm 0px $sm;
}

.py-sm {
  padding: $sm 0px $sm 0px;
}

.p-md {
  padding: $md;
}

.pt-md {
  padding-top: $md;
}

.pr-md {
  padding-right: $md;
}

.pb-md {
  padding-bottom: $md;
}

.pl-md {
  padding-left: $md;
}

.px-md {
  padding: 0px $md 0px $md;
}

.py-md {
  padding: $md 0px $md 0px;
}

.p-lg {
  padding: $lg;
}

.pt-lg {
  padding-top: $lg;
}

.pr-lg {
  padding-right: $lg;
}

.pb-lg {
  padding-bottom: $lg;
}

.pl-lg {
  padding-left: $lg;
}

.px-lg {
  padding: 0px $lg 0px $lg;
}

.py-lg {
  padding: $lg 0px $lg 0px;
}

.p-xl {
  padding: $xl;
}

.pt-xl {
  padding-top: $xl;
}

.pr-xl {
  padding-right: $xl;
}

.pb-xl {
  padding-bottom: $xl;
}

.pl-xl {
  padding-left: $xl;
}

.px-xl {
  padding: 0px $xl 0px $xl;
}

.py-xl {
  padding: $xl 0px $xl 0px;
}

@media (min-width: 0px) and (max-width: 599.99px) {

  .p {
    padding: $xs;
  }

  .pt {
    padding-top: $xs;
  }

  .pr {
    padding-right: $xs;
  }

  .pb {
    padding-bottom: $xs;
  }

  .pl {
    padding-left: $xs;
  }

  .px {
    padding: 0px $xs 0px $xs;
  }

  .py {
    padding: $xs 0px $xs 0px;
  }
}

@media (min-width: 600px) and (max-width: 1023.99px) {

  .p {
    padding: $sm;
  }

  .pt {
    padding-top: $sm;
  }

  .pr {
    padding-right: $sm;
  }

  .pb {
    padding-bottom: $sm;
  }

  .pl {
    padding-left: $sm;
  }

  .px {
    padding: 0px $sm 0px $sm;
  }

  .py {
    padding: $sm 0px $sm 0px;
  }
}

@media (min-width: 1024px) and (max-width: 1439.99px) {

  .p {
    padding: $md;
  }

  .pt {
    padding-top: $md;
  }

  .pr {
    padding-right: $md;
  }

  .pb {
    padding-bottom: $md;
  }

  .pl {
    padding-left: $md;
  }

  .px {
    padding: 0px $md 0px $md;
  }

  .py {
    padding: $md 0px $md 0px;
  }
}

@media (min-width: 1440px) and (max-width: 1919.99px) {

  .p {
    padding: $lg;
  }

  .pt {
    padding-top: $lg;
  }

  .pr {
    padding-right: $lg;
  }

  .pb {
    padding-bottom: $lg;
  }

  .pl {
    padding-left: $lg;
  }

  .px {
    padding: 0px $lg 0px $lg;
  }

  .py {
    padding: $lg 0px $lg 0px;
  }
}

@media (min-width: 1920px) {

  .p {
    padding: $xl;
  }

  .pt {
    padding-top: $xl;
  }

  .pr {
    padding-right: $xl;
  }

  .pb {
    padding-bottom: $xl;
  }

  .pl {
    padding-left: $xl;
  }

  .px {
    padding: 0px $xl 0px $xl;
  }

  .py {
    padding: $xl 0px $xl 0px;
  }
}
</style>
