const getQueryLimit = (customCount: string | number, defaultLimit: number, hardLimit: number = 50) => {
  if (customCount) {
    return Math.min(Number(customCount), hardLimit)
  }

  return defaultLimit
}

export default getQueryLimit
