import { parseISO, format } from 'date-fns'

const floatToMoney = (currency) => {
  const formatted = parseInt(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return formatted
}

const brDate = (timestamp) => {
  const date = parseISO(timestamp)
  return format(date, 'dd/MM/yyyy')
}

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export {
  floatToMoney,
  brDate,
  getRandomColor
}
