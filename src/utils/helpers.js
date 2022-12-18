import { parseISO, format } from 'date-fns'

const floatToMoney = (currency) => {
  const formatted = parseInt(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return formatted
}

const brDate = (timestamp) => {
  const date = parseISO(timestamp)
  return format(date, 'dd/MM/yyyy')
}

export {
  floatToMoney,
  brDate
}
