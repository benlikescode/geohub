import { formatRoundTime, getMapName } from '@utils/helperFunctions'

// getMapName
test('MapId with hyphen should be split and first letters capitalized', () => {
  expect(getMapName('famous-landmarks')).toBe('Famous Landmarks')
})

test('MapId with no hypen should just capitalize the first letter', () => {
  expect(getMapName('canada')).toBe('Canada')
})

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
