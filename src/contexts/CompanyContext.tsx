import { createContext, ReactNode, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

import { parseCookies, setCookie } from 'nookies'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

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
  companyList: {
    id: number
    name: string | null
    cnpj: string | null
    cpf: string | null
    active: boolean | null
  }[]
  createCompany: (value: companyProps) => void
  handleCompanySelected: (value: companyProps) => Promise<void>
}

type GeralProviderProps = {
  children: ReactNode
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: GeralProviderProps) {
  const [companyData, setCompanyData] = useState<CompanyProps | null>(null)
  const [companySelected, setCompanySelected] = useState<string | null>(null)
  const { data: session } = useSession()

  const companyList = session?.user.companies ?? []

  const router = useRouter()

  function createCompany(company: companyProps) {
    const newCompany = {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      cpf: company.cpf,
    }
    // @ts-ignore
    setCompanyData(newCompany)
    setCompanySelected(company.id)
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
  }

  async function handleCompanySelected(company: companyProps) {
    createCompany(company)
    await router.push(`/service-schedule?company_id=${companySelected}`)
  }

  useEffect(() => {
    if (companySelected === null) {
      const cookies = parseCookies()
      console.log(cookies)
      if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
        const companySelectedCookie: cookieCompany = JSON.parse(
          cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
        )
        setCompanySelected(companySelectedCookie.companySelected)
      } else {
        router.push('/company')
      }
    }
  }, [])

  useEffect(() => {
    if (router.query.company_id) {
      const isExistCompany = companyList.some(
        (company) => company.id === parseInt(router.query.company_id as string),
      )
      if (!isExistCompany) {
        router.push('/company')
      }
    }
  }, [router.query])

  return (
    <CompanyContext.Provider
      value={{
        companyData,
        companySelected,
        createCompany,
        handleCompanySelected,
        companyList,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
