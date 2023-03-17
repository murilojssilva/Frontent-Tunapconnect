import { APICore } from "@/lib/axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.JWT_SIGNIN_PRIVATE_KEY, 
    maxAge: 60 * 60 * 2 // 2 horas
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { },
        password: { },
      },
      async authorize(credentials, req) {
        if(!credentials?.username && !credentials?.password) {
          throw new Error("error")
        }

        const res = await fetch(`${process.env.APP_API_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          }),
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })

        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {

      if (token.sub) {
        return token
      } else {
        throw new Error('Usuário inválido')
      }
      
    },
    async session({ session, token, user }) {
      // console.log("session",session)
      // console.log('token',token)
      // console.log('user',user)

      if(!token.sub) {
        throw new Error('Sessão inválida')
      }

      
      return {...session, accessToken: token.sub}
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  debug: false,
})