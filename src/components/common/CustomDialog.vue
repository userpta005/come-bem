<template>
  <q-dialog ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

      <q-card-section class="flex flex-center"
        v-if="warning">
        <img src="~assets/warning.png"
          style="height: 100px; width: 100px;">
      </q-card-section>

      <q-card-section class="flex flex-center"
        v-if="checked">
        <img src="~assets/verificado.png"
          style="height: 100px; width: 100px;">
      </q-card-section>

      <q-card-section v-if="title">
        <h6 class="no-margin text-center">{{ title }}</h6>
      </q-card-section>

      <q-card-section v-if="message"
        class="text-center q-pt-none"
        v-html="message">
      </q-card-section>

      <q-card-actions :class="$q.screen.gt.xs ? 'row flex-center' : 'column flex-center'">

        <q-btn :label="cancelText"
          text-color="grey-8"
          style="min-width: 120px;"
          :class="$q.screen.gt.xs ? 'q-mr-md' : 'order-last q-mt-sm'"
          outline
          no-caps
          @click="onCancelClick"
          v-if="cancel" />

        <q-btn :label="confirmText"
          color="main-primary"
          style="min-width: 120px;"
          class="no-margin"
          no-caps
          @click="onOKClick"
          v-if="confirm" />

      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    },
    warning: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: 'Fechar'
    },
    confirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: 'Confirmar'
    }
  },
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    return {
      dialogRef,
      onDialogHide,
      onOKClick () {
        onDialogOK()
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>
