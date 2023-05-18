import bcrypt from 'bcryptjs'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { collections, dbConnect } from '../../../backend/utils/dbConnect'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await dbConnect()
        const user = await collections.users?.findOne({ email: credentials?.email })

        if (!user) {
          throw new Error('Incorrect email or password')
        }

        const passwordsMatch = await bcrypt.compare(credentials?.password || '', user.password)

        if (!passwordsMatch) {
          throw new Error('Incorrect email or password')
        }

        // return user
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          bio: user.bio,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.user = user
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user as any

      return session
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
    signOut: '/',
  },
}

export default NextAuth(authOptions)
