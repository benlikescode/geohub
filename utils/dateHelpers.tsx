const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const formatMonthDayYearTime = (dateRaw: Date | undefined) => {
  if (!dateRaw) return ''

  const date = new Date(dateRaw)
  const day = date.getDate()
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  const formattedHours = hours > 12 ? hours - 12 : hours
  const meridiem = hours < 12 ? 'AM' : 'PM'
  const mins = date.getMinutes().toString().padStart(2, '0')

  return `${month} ${day}, ${year} ${formattedHours || 12}:${mins} ${meridiem}`
}

export const formatMonthDayYear = (dateRaw: Date | undefined) => {
  if (!dateRaw) return ''

  const date = new Date(dateRaw)
  const day = date.getDate().toString().padStart(2, '0')
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
