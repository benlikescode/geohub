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

export const formatMonthDay = (dateRaw: Date | undefined) => {
  if (!dateRaw) return ''

  const utcDate = new Date(dateRaw).toUTCString()
  const date = new Date(utcDate)
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getUTCDate()

  return `${month} ${day}`
}

export const formatMonthYear = (dateRaw: Date | undefined) => {
  if (!dateRaw) return ''

  const utcDate = new Date(dateRaw).toUTCString()
  const date = new Date(utcDate)
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()

  return `${month} ${year}`
}

export const formatTimeAgo = (dateRaw: Date | undefined) => {
  if (!dateRaw) return ''

  const date = new Date(dateRaw)
  const now = new Date()
  const timeDifferenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const minutes = Math.floor(timeDifferenceInSeconds / 60)
  const hours = Math.floor(timeDifferenceInSeconds / 3600)
  const days = Math.floor(timeDifferenceInSeconds / 86400)
  const weeks = Math.floor(timeDifferenceInSeconds / 604800)

  // If 4+ weeks -> show "month/day/year"
  if (weeks >= 4) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  // If 7+ days -> show "x weeks ago"
  else if (days >= 7) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  }

  // If 1+ days -> show "x days ago"
  else if (days >= 1) {
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  // If 1+ hours -> show "x hours ago"
  else if (hours >= 1) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  // If 1+ minutes -> show "x minutes ago"
  else if (minutes >= 1) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }

  return 'just now'
}
