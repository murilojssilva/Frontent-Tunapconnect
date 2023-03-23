import {createContext, ReactNode, useEffect, useState} from 'react'
import { getSession, SessionProvider, signIn as signInRequest, signOut, useSession } from "next-auth/react"
import { Session } from 'next-auth'
import Router from 'next/router'




type Company = {
  id: number | undefined
  name: string | undefined
}



type CompanyContextType = {
  company: Company | null
}

type AuthProviderProps = {
  children: ReactNode 
}




export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider ({children}: AuthProviderProps) {
  const [company, setCompany] = useState<Company | null>(null)
  


  useEffect(() => {
    
  }, [])
  
  return (
    <CompanyContext.Provider value={{company}}>
        {children}
    </CompanyContext.Provider>
  )
}