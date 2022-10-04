import { formatLargeNumber, formatRoundTime } from '@utils/helperFunctions'

// formatRoundTime
test('Round time less than 60 should return the time in seconds', () => {
  expect(formatRoundTime(59)).toBe('59 sec')
})

test('Round time of 60 should return 1:00 min', () => {
  expect(formatRoundTime(60)).toBe('1:00 min')
})

test('Round time of 80 should return 1:20 min', () => {
  expect(formatRoundTime(80)).toBe('1:20 min')
})

test('Round time of 125 should return 2:05 min', () => {
  expect(formatRoundTime(125)).toBe('2:05 min')
})

test('Round time of 3600 should return 1 hr', () => {
  expect(formatRoundTime(3600)).toBe('1 hr')
})

// formatLargeNumber
test('Score of 20000 should return 20,000', () => {
  expect(formatLargeNumber(20000)).toBe('20,000')
})

test('Score of 9999 should return 9,999', () => {
  expect(formatLargeNumber(9999)).toBe('9,999')
})

test('Score of 600 should return 600', () => {
  expect(formatLargeNumber(600)).toBe('600')
})
