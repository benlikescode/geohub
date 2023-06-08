const formatOngoingScore = (rawScore: number) => {
  if (rawScore === 0) {
    return '0k pts'
  }

  return `${Math.floor(rawScore / 1000).toFixed(0)}k pts`
}

export default formatOngoingScore
