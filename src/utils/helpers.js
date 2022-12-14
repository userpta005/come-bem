const floatToMoney = (currency) => {
  const formatted = parseInt(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return formatted
}

const brDate = (timestamp) => {
  const date = new Date(timestamp)

  return date.toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export {
  floatToMoney,
  brDate
}
