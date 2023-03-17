import {createContext, ReactNode, useState} from 'react'
import { SessionProvider, signIn as signInAuth } from "next-auth/react"
import { Session } from 'next-auth'


type SignInData = {
  username: string
  password: string
}


type User = {
  username: string
  password: string
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

export function AuthProvider ({children, session}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = false


  async function signIn(data: SignInData) {
    const resp = await signInAuth("credentials", {
      redirect: false,
      username: data.username,
      password: data.password
    })
    console.log(resp)
  }
  
  return (
    <AuthContext.Provider value={{isAuthenticated, signIn, user}}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </AuthContext.Provider>
  )
}