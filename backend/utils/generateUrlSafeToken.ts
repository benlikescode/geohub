import crypto from 'crypto'

const generateUrlSafeToken = (numBytes: number = 64) => {
  const buffer = crypto.randomBytes(numBytes)

  const token = buffer
    .toString('base64')
    .replace(/\+/g, '-') // Replace '+' with '-'
    .replace(/\//g, '_') // Replace '/' with '_'
    .replace(/=/g, '') // Remove trailing '=' characters

  return token
}

export default generateUrlSafeToken
