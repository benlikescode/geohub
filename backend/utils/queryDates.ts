const monthAgo = new Date()
monthAgo.setMonth(monthAgo.getMonth() - 1)

const dayAgo = new Date()
dayAgo.setDate(dayAgo.getDate() - 1)

const weekAgo = new Date()
weekAgo.setDate(weekAgo.getDate() - 7)

export { monthAgo, dayAgo, weekAgo }
