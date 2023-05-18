import NextAuth, { DefaultSession } from 'next-auth'
import { UserType } from './'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      avatar: { emoji: string; color: string }
      bio: string
      isAdmin: boolean
    } & DefaultSession['user']
  }
}
