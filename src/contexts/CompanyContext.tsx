import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { useQuery } from 'react-query'
import { ApiCore } from '@/lib/api'

type CompanyProps = {
  id: number
  name: string
  cnpj: string | null
  cpf: string | null
}

type CompanyContextType = {
  company: CompanyProps | null | undefined
  createCompany: (company: CompanyProps) => void
}

type CompanyProviderProps = {
  children: ReactNode
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: CompanyProviderProps) {
  // const [company, setCompany] = useState<CompanyProps | null>(null)
  const [companyId, setCompanyId] = useState<string | null>(null)

  const router = useRouter()
  const api = new ApiCore()

  const { data: company } = useQuery<CompanyProps | null>(
    ['campanyContext', companyId],
    async () => {
      const response = await api.get(`/company/${companyId}`)
      console.log(response.data.data)
      return response.data.data
    },
    {
      enabled: companyId !== null,
    },
  )

  // console.log(data)

  async function createCompany(newCompany: CompanyProps) {
    setCompanyId(String(newCompany?.id))
    setCookie(null, '@tunapconnect:company', `${newCompany?.id}`, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    await router.push('/panel/service-schedules/list')
  }

  useEffect(() => {
    async function isCookies() {
      const cookies = parseCookies()
      if (
        !(
          cookies['@tunapconnect:company'] === 'undefined' && companyId === null
        )
      ) {
        setCompanyId(cookies['@tunapconnect:company'])
        // setCompany({
        //   id: cookies['@tunapconnect:company'],
        // })
      }
      // else {
      //   await router.push('/painel/company')
      // }
    }
    isCookies()
  }, [])

  return (
    <CompanyContext.Provider value={{ company, createCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}
