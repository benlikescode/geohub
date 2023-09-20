const getQueryLimit = (customCount: any, defaultLimit: number, hardLimit: number = 50) => {
  if (customCount && isValidNumber(customCount)) {
    return Math.min(Number(customCount), hardLimit)
  }

  return defaultLimit
}

const isValidNumber = (customCount: any) => {
  const asNumber = Number(customCount)

  return !isNaN(asNumber) && typeof asNumber === 'number'
}

export default getQueryLimit
