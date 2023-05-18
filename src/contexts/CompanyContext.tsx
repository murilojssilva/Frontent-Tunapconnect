import { createContext, ReactNode, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

import { parseCookies, setCookie } from 'nookies'
import { useRouter } from 'next/router'

// import { ApiCore } from '@/lib/api'
// import { useQuery } from '@tanstack/react-query'
// import { useSession } from 'next-auth/react'
// import { useQuery } from '@tanstack/react-query'

interface companyProps {
  id: string
  name: string
  cnpj: string | null
  cpf: string | null
}

type CompanyProps = {
  company: companyProps
  companySelected: string
} | null

type cookieCompany = {
  companySelected: string
}

type CompanyContextType = {
  companyData: CompanyProps | null
  companySelected: string | null
  createCompany: (value: companyProps) => Promise<void>
}

type GeralProviderProps = {
  children: ReactNode
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: GeralProviderProps) {
  const [companyData, setCompanyData] = useState<CompanyProps | null>(null)
  const [companySelected, setCompanySelected] = useState<string | null>(null)

  const router = useRouter()

  async function createCompany(company: companyProps) {
    console.log(company)
    const newCompany = {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      cpf: company.cpf,
    }
    // @ts-ignore
    setCompanyData(newCompany)
    console.log(newCompany)
    setCompanySelected(newCompany.id)
    setCookie(
      null,
      process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string,
      JSON.stringify({
        companySelected,
      }),
      {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      },
    )
    console.log(companySelected)
    console.log(newCompany)
    await router.push(`/service-schedule?company_id=${companySelected}`)
  }

  useEffect(() => {
    console.log(companySelected)
    if (companySelected === null) {
      const cookies = parseCookies()
      console.log(cookies)
      if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
        const companySelectedCookie: cookieCompany = JSON.parse(
          cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
        )
        console.log(companySelectedCookie.companySelected)
        setCompanySelected(companySelectedCookie.companySelected)
      } else {
        router.push('/company')
      }
    }
  }, [])

  return (
    <CompanyContext.Provider
      value={{ companyData, companySelected, createCompany }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
