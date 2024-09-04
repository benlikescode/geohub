export const realMap: { [key: string]: string } = {
  fo: 'dk',
  gl: 'dk',
  hk: 'cn',
}

export const getRealCountryCode = (countryCode: string | undefined) => {
  if (!countryCode) return ''

  return realMap[countryCode] ?? countryCode
}
