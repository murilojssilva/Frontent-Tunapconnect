// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      name: string
      sub: 1
      msg: string
      token: string
      privilege: string
      id: number
      iat: number
      exp: number
      jti: string
    }
  }
}
