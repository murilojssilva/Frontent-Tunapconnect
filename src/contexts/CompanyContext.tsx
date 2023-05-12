import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// import { parseCookies, setCookie } from 'nookies'

// import { ApiCore } from '@/lib/api'
// import { useQuery } from '@tanstack/react-query'
// import { useSession } from 'next-auth/react'
// import { useQuery } from '@tanstack/react-query'

type CompanyProps = {
  id: string
  name: string
  cnpj: string | null
  cpf: string | null
}

type CompanyContextType = {
  company: CompanyProps | null | undefined
  companyId: string | undefined
  createCompany: (company: CompanyProps) => Promise<void>
}

type CompanyProviderProps = {
  children: ReactNode
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<CompanyProps | null>(null)
  const [companyId, setCompanyId] = useState<string>()

  const router = useRouter()

  const isCompanyId = !!companyId

  async function createCompany(newCompany: CompanyProps) {
    setCompany(newCompany)
    setCompanyId(newCompany.id)
    await router.push(`/service-schedules?company=${newCompany.id}`)
  }

  useEffect(() => {
    if (!isCompanyId) {
      if (router?.query?.companyId) {
        const regex = /[1-9]+/
        regex.test(router?.query?.companyId as string)
          ? setCompanyId(router?.query?.companyId as string)
          : router.push('/company')
      }
    }
  }, [router?.query?.companyId])

  return (
    <CompanyContext.Provider value={{ companyId, company, createCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}
