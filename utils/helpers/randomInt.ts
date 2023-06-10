// Generates between min (inclusive) and max (exclusive)
const randomInt = (min = 0, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export default randomInt
