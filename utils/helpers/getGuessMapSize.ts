// Gets dimensions of guess map based on users preferred size
const getGuessMapSize = (size: number) => {
  const SIZES = [
    { width: 15, height: 18 },
    { width: 30, height: 40 },
    { width: 40, height: 55 },
    { width: 65, height: 80 },
  ]

  return SIZES[size - 1]
}

export default getGuessMapSize
