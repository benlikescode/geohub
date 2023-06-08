const ONE_MINUTE = 60
const ONE_HOUR = 3600

// Takes in a time value (in seconds) and returns a formatted string
const formatRoundTime = (time: number) => {
  if (time < ONE_MINUTE) {
    return `${time} sec`
  }

  if (time < ONE_HOUR) {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time - mins * 60)

    if (secs < 10) {
      return `${mins}:0${secs} min`
    }

    return `${mins}:${secs} min`
  }

  const hours = Math.floor(time / 3600)
  return `${hours} hr`
}

export default formatRoundTime
