import dotenv from 'dotenv'
import fs from 'fs'

if (!fs.existsSync('.env')) {
  console.error('Missing .env file')
}

export const ENVIRONMENT = process.env.NODE_ENV
// export const IS_PROD = ENVIRONMENT === 'production'
export const IS_PROD = true

export const MONGO_URI = IS_PROD ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL
