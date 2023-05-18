const monthAgo = new Date()
monthAgo.setMonth(monthAgo.getMonth() - 1)

const dayAgo = new Date()
dayAgo.setDate(dayAgo.getDate() - 1)

const weekAgo = new Date()
weekAgo.setDate(weekAgo.getDate() - 7)

const todayStart = new Date()
todayStart.setHours(0, 0, 0, 0)

const todayEnd = new Date()
todayEnd.setHours(23, 59, 59, 999)

export { monthAgo, dayAgo, weekAgo, todayStart, todayEnd }
