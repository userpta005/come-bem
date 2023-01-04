import { parseISO, format } from 'date-fns'

const floatToMoney = (currency) => {
  const formatted = parseFloat(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return formatted
}

const brDate = (timestamp) => {
  const date = parseISO(timestamp)
  return format(date, 'dd/MM/yyyy')
}

function getRandomColor () {
  const color = Math.floor(Math.random() * 0x1000000).toString(16)
  return '#' + ('000000' + color).slice(-6)
}

function getRandomDarkColor () {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

export {
  floatToMoney,
  brDate,
  getRandomColor,
  getRandomDarkColor
}
