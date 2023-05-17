import { createContext, ReactNode, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

import { parseCookies, setCookie } from 'nookies'

// import { ApiCore } from '@/lib/api'
// import { useQuery } from '@tanstack/react-query'
// import { useSession } from 'next-auth/react'
// import { useQuery } from '@tanstack/react-query'

type DataGeralProps = {
  companyId: string
}

type GeralContextType = {
  dataGeral: DataGeralProps | null | undefined
  createDataGeral: (value: DataGeralProps) => Promise<void>
}

type GeralProviderProps = {
  children: ReactNode
}

export const geralContext = createContext({} as GeralContextType)

export function GeralProvider({ children }: GeralProviderProps) {
  const [dataGeral, setDataGeral] = useState<DataGeralProps | null>(null)

  // const router = useRouter()

  async function createDataGeral({ companyId }: DataGeralProps) {
    // setCompany(newCompany)
    const newDataGeral: DataGeralProps = {
      companyId,
    }
    setDataGeral(newDataGeral)
    setCookie(
      null,
      process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string,
      JSON.stringify(newDataGeral),
      {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      },
    )

    // await router.push(`/service-schedule?company=${companyId}`)
  }

  useEffect(() => {
    const cookies = parseCookies()
    console.log(
      cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
    )
    // console.log(Object.hasOwn(cookies, 'companyId'))
    // console.log(
    // JSON.parse(
    //   cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
    // ),
    // )
  }, [])

  // useEffect(() => {
  // if (!isCompanyId) {
  //   if (router?.query?.companyId) {
  //     const regex = /[1-9]+/
  //     regex.test(router?.query?.companyId as string)
  //       ? setCompanyId(router?.query?.companyId as string)
  //       : router.push('/company')
  //   }
  // }
  // }, [router?.query?.companyId])

  return (
    <geralContext.Provider value={{ dataGeral, createDataGeral }}>
      {children}
    </geralContext.Provider>
  )
}
