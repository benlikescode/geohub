import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'
import { getRandomAvatar } from '@utils/helpers'

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body

  if (!name) {
    return throwError(res, 400, 'Name can not be blank')
  }

  const EMAIL_REGEX = /\S+@\S+\.\S+/

  if (!EMAIL_REGEX.test(email)) {
    return throwError(res, 400, 'Invalid email address')
  }

  if (password.length < 6) {
    return throwError(res, 400, 'Password must be atleast 6 characters')
  }

  const findUserWithEmail = await collections.users?.findOne({ email: email })

  if (findUserWithEmail) {
    return throwError(res, 400, 'An account with that email already exists')
  }

  const findUserWithName = await collections.users?.findOne({ name: name })

  if (findUserWithName) {
    return throwError(res, 400, `The name ${name} is already taken`)
  }

  // Values are unique, so create user
  const hashPassword = bcrypt.hashSync(password, 10)

  const newUser = {
    name,
    email,
    password: hashPassword,
    avatar: getRandomAvatar(),
    createdAt: new Date(),
    onNewDomain: req.headers.host === 'www.geohub.gg',
  }

  await collections.users?.insertOne(newUser)

  res.status(201).json({ ...newUser, password: '' })
}

export default handleRegister
