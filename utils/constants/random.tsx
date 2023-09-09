export const OFFICIAL_WORLD_ID = '6185df7a7b54baf63473a53e'
export const COUNTRY_STREAKS_ID = 'country-streaks'

export const GUEST_ACCOUNT_ID = '636ed6784ec6f85e6f18591e'

export const COUNTRY_STREAK_DETAILS = {
  _id: COUNTRY_STREAKS_ID,
  name: 'Country Streaks',
  description: 'How many countries can you guess in a row?',
  previewImg: 'official22.jpg',
  creator: 'GeoHub',
}

export const DAILY_CHALLENGE_DETAILS = {
  name: 'The Daily Challenge',
  description: 'A brand new challenge everyday. See how you compare!',
  previewImg: 'official8.jpg',
}

export const MAP_AVATAR_PATH = '/images/mapAvatars'
export const USER_AVATAR_PATH = '/images/userAvatars'

export const MAX_ALLOWED_CUSTOM_LOCATIONS = 60000

export const CUSTOM_MAP_AVATARS = Array.from({ length: 16 }).map((_, idx) => `custom${idx + 1}.jpg`)
