import { useQuasar } from 'quasar'
export default function notify () {
  const $q = useQuasar()

  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'Sucesso !'
    })
  }

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Erro !'
    })
  }

  const notifyInfo = (message) => {
    $q.notify({
      type: 'info',
      message: message || 'Erro !'
    })
  }

  const notifyWarning = (message) => {
    $q.notify({
      type: 'warning',
      message: message || 'Erro !'
    })
  }

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning
  }
}
