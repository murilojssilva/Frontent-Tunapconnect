import { createContext, ReactNode, useEffect, useState } from 'react'
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
  campanyId: number | undefined
  createCompany: (company: CompanyProps) => void
}

type CompanyProviderProps = {
  children: ReactNode
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<CompanyProps | null>(null)
  // const [companyList, setCompanyList] = useState<CompanyProps[] | null>(null)

  // const api = new ApiCore()
  // const { status } = useSession()

  // isCompanyId = () => {}

  const router = useRouter()

  // const { data } = useQuery({
  //   queryKey: ['company-page-list-company-context'],
  //   queryFn: () =>
  //     api.get(`/user/companies`).then((response) => {
  //       // setCompanyList(response.data.data)
  //       // console.log(response.data.data)
  //       return response.data.data
  //     }),
  // })

  useEffect(() => {
    // if (!company && !router?.query?.companyId) {
    //   // console.log('SEM COMPANY E ROUTE', company, router?.query?.companyId)
    //   router.push('/company')
    // }
    // if (!!router?.query?.companyId && !company) {
    //   if (data) {
    //     data.findIndex(
    //       (item: any) =>
    //         item.id === parseInt(router?.query?.companyId as string),
    //     ) < 0 && router.push('/company')
    //   } else {
    //     api
    //       .get(`/company/${router?.query?.companyId}`)
    //       .then((response) => {
    //         setCompany(response.data.data)
    //       })
    //       .catch(() => {
    //         router.push('/company')
    //       })
    //   }
    // }
  }, [router?.query?.companyId, company])

  // useEffect(() => {
  //   if (data) {
  //     data.findIndex(
  //       (item: any) => item.id === parseInt(router?.query?.companyId as string),
  //     ) < 0 && router.push('/company')
  //   }
  // }, [router?.query?.companyId])

  async function createCompany(newCompany: CompanyProps) {
    setCompany(newCompany)
    await router.push(`/${newCompany.id}/service-schedules/list`)
  }

  return (
    <CompanyContext.Provider
      value={{ campanyId: company?.id, company, createCompany }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
