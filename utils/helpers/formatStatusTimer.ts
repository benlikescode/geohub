const formatStatusTimer = (time: number) => {
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time - mins * 60)

  if (secs < 10) {
    return `${mins}:0${secs}`
  }

  return `${mins}:${secs}`
}

export default formatStatusTimer
