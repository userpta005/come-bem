import { parseISO, format } from 'date-fns'

const floatToMoney = (currency) => {
  const formatted = parseFloat(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return formatted
}

const moneyToFloat = (str) => {
  return parseFloat(str.replace('.', '').replace(',', '.'))
}

const brDate = (timestamp) => {
  const date = parseISO(timestamp)
  return format(date, 'dd/MM/yyyy')
}

const brDatetime = (timestamp) => {
  const date = parseISO(timestamp)
  return format(date, 'dd/MM/yyyy HH:mm')
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

function limitString (str, num) {
  if (str.length > num) {
    return str.substring(0, num) + '...'
  }
  return str
}

export {
  floatToMoney,
  moneyToFloat,
  brDate,
  brDatetime,
  getRandomColor,
  getRandomDarkColor,
  limitString
}
