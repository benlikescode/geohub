const randomRange = (min = 0, max = 100, precision = 10) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision))
}

export default randomRange
