// Primarily used for displaying round points & number of locations
const formatLargeNumber = (number: number | undefined) => {
  if (typeof number === 'undefined') return

  const numberAsString = number.toString()

  if (number >= 1000000) {
    return '1M +'
  }

  if (number >= 100000) {
    return '100K +'
  }

  if (number >= 10000) {
    return numberAsString.substring(0, 2) + ',' + numberAsString.substring(2, 5)
  }

  if (number >= 1000) {
    return numberAsString.substring(0, 1) + ',' + numberAsString.substring(1, 5)
  }

  return numberAsString
}

export default formatLargeNumber
