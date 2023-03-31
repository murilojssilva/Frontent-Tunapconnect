import {createContext, ReactNode, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'

type SignInData = {
  username: string
  password: string
}


type User = {
  id: number | undefined
  name: string | undefined
  privilege: string | undefined
}


type CompanyProps = {
  id: number 
  name: string 
  cnpj: string | null
  cpf: string | null;
}

type CompanyContextType = {
  isCompany: boolean
  company: CompanyProps | null
  createCompany: (company: CompanyProps) => void
}

type CompanyProviderProps = {
  children: ReactNode 
}




export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<CompanyProps | null>(null)
  const isCompany = !!company

  const router = useRouter()

  function createCompany(newCompany: CompanyProps) {
    setCompany(newCompany)
    router.push('/service-schedules/list') 
    localStorage.setItem(process.env.NEXT_PUBLIC_APP_LOCALSTORAGE_NAME as string, JSON.stringify({ company: newCompany }))
     
  }

  useEffect(() => {
    const nameLocalStorage = process.env.NEXT_PUBLIC_APP_LOCALSTORAGE_NAME as string

    if (!company) {
      const localstorage = localStorage.getItem(nameLocalStorage) 
      if (localstorage) {
        const localstorageParse = JSON.parse(localstorage)
        if (localstorageParse.company) {
          setCompany(localstorageParse.company)
          router.push('/service-schedules/list')  
        } else {
          router.push('/company')
        }
      } else {
        router.push('/company')
      }
    }
  }, [])

  return (
    <CompanyContext.Provider value={{ isCompany, company,createCompany }}>
      {children}
    </CompanyContext.Provider>
    )
  
}