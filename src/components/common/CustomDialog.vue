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
        class="text-center q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions class="column flex-center">
        <q-btn label="Confirmar"
          color="main-primary"
          style="width: 120px;"
          class="q-mb-sm"
          no-caps
          @click="onOKClick"
          v-if="confirm" />
        <q-btn label="Fechar"
          text-color="grey-8"
          style="width: 120px;"
          class="no-margin"
          outline
          no-caps
          @click="onCancelClick"
          v-if="cancel" />
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
    confirm: {
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
