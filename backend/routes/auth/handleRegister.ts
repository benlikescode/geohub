import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'
import { registerUserSchema } from '@backend/validations/userValidations'
import { getRandomAvatar } from '@utils/helpers'

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = registerUserSchema.parse(req.body)

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
