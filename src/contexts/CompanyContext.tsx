import { createContext, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
// import { parseCookies, setCookie } from 'nookies'

// import { ApiCore } from '@/lib/api'
// import { useQuery } from '@tanstack/react-query'
// import { useSession } from 'next-auth/react'
// import { useQuery } from '@tanstack/react-query'

type CompanyProps = {
  id: number
  name: string
  cnpj: string | null
  cpf: string | null
}

type CompanyContextType = {
  company: CompanyProps | null | undefined
  companyId: number | undefined
  createCompany: (company: CompanyProps) => void
}

type CompanyProviderProps = {
  children: ReactNode
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<CompanyProps | null>(null)
  const [companyId, setCompanyId] = useState<number>()

  const router = useRouter()

  async function createCompany(newCompany: CompanyProps) {
    setCompany(newCompany)
    setCompanyId(newCompany.id)
    await router.push(`/${newCompany.id}/service-schedules/list`)
  }

  return (
    <CompanyContext.Provider value={{ companyId, company, createCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}
