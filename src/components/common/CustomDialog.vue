<template>
  <q-dialog ref="dialogRef"
    :persistent="persistent"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin column justify-between q-py-lg"
      style="max-width: 800px; min-height: 500px;"
      :style="$q.screen.gt.xs ? 'min-width: 600px; padding-left: 80px; padding-right: 80px;' : 'min-width: 300px;'">

      <div class="container">
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

        <q-card-section class="text-center q-pt-none"
          v-html="message">
        </q-card-section>
      </div>

      <q-card-actions align="center"
        class="text-primary q-pa-md"
        :class="$q.screen.gt.xs ? 'row' : 'column'">

        <q-btn v-if="cancel"
          @click="onCancelClick"
          :label="cancelText"
          :class="$q.screen.gt.xs ? 'q-mr-lg' : 'q-mt-md'"
          style="min-width: 120px;"
          text-color="grey-8"
          outline
          no-caps />

        <q-btn v-if="confirm"
          @click="onOKClick"
          :label="confirmText"
          :class="$q.screen.gt.xs ? '' : 'order-first'"
          style="min-width: 120px;"
          color="main-primary"
          class="no-margin"
          no-caps />

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
    },
    persistent: {
      type: Boolean,
      default: true
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
