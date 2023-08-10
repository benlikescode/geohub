// Calculates the points based on distance away (assumes distance is in km)
const calculateRoundScore = (distance: number, scoreFactor?: number) => {
  if (distance * 1000 < 25) {
    return 5000
  }

  const mapFactor = scoreFactor || 2000

  const power = (distance * -1) / mapFactor
  const score = 5000 * Math.pow(Math.E, power)

  if (score < 0) {
    return 0
  }

  return Math.round(score)
}

export default calculateRoundScore
