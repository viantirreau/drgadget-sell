const currencyFormat = amount => {
  amount += '' // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, '')) // elimino cualquier cosa que no sea numero o punto

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(0)

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = '' + amount.toFixed(0)

  var amount_parts = amount.split('.'),
    regexp = /(\d+)(\d{3})/

  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, '$1' + '.' + '$2')

  return '$' + amount_parts.join(',')
}
export default currencyFormat
