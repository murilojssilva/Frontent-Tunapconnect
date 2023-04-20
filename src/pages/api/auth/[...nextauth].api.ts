import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24 hour
  },
  jwt: {
    secret: process.env.JWT_SIGNIN_PRIVATE_KEY,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.username && !credentials?.password) {
          throw new Error('error')
        }

        let res

        try {
          res = await fetch(`${process.env.APP_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          })
        } catch (error) {
          console.log(error)
        }

        const user = await res?.json()
        if (res?.ok && user) {
          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      return {
        ...token,
        ...user,
      }
    },
    async session({ session, token, user }) {
      session.user = token as any
      // session.expires = token.exp as string
      return session
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // }
  },
}

export default NextAuth(authOptions)
