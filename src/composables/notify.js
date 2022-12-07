import { useQuasar } from 'quasar'
export default function notify () {
  const $q = useQuasar()

  const success = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'Sucesso !'
    })
  }

  const error = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Erro !'
    })
  }

  return {
    success,
    error
  }
}
