// Formats the round time limit (timeLimit will be in range [0, 600])
const formatTimeLimit = (timeLimit: number) => {
  const time = Math.floor(timeLimit)
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time - mins * 60)

  // replace 0:00 with "No Time Limit"
  if (timeLimit === 0) {
    return 'No Time Limit'
  }

  if (secs === 0) {
    return `${mins}:${secs}0`
  }

  return `${mins}:${secs}`
}

export default formatTimeLimit
