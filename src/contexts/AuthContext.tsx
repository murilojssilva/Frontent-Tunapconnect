import { createContext, ReactNode, useEffect, useState } from 'react'
import {
  getSession,
  SessionProvider,
  signIn as signInRequest,
  // signOut,
  // useSession,
} from 'next-auth/react'
import { Session } from 'next-auth'
import Router from 'next/router'

type SignInData = {
  username: string
  password: string
}

type User = {
  id: number | undefined
  name: string | undefined
  privilege: string | undefined
}

type AuthContextType = {
  isAuthenticated: boolean
  signIn: (data: SignInData) => void
  user: User | null
}

type AuthProviderProps = {
  children: ReactNode
  session: Session | undefined
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children, session }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  async function signIn(data: SignInData) {
    const resp = await signInRequest('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    })

    if (resp?.ok && resp?.status === 200) {
      console.log(resp)
      await Router.push('/company')
    }
  }

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          setUser({
            id: session?.user?.id,
            name: session?.user?.name,
            privilege: session?.user?.privilege,
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [session])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </AuthContext.Provider>
  )
}
