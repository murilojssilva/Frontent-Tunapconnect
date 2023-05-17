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

type DataGeralProps = {
  company: companyProps
  empresaSelecionada: string
  outras?: any[]
} | null

type GeralContextType = {
  dataGeral: DataGeralProps | null
  createDataGeral: (value: DataGeralProps) => Promise<void>
}

type GeralProviderProps = {
  children: ReactNode
}

export const geralContext = createContext({} as GeralContextType)

export function GeralProvider({ children }: GeralProviderProps) {
  const [dataGeral, setDataGeral] = useState<DataGeralProps | null>(null)

  const router = useRouter()

  async function createDataGeral(data: DataGeralProps) {
    console.log(data)
    if (data) {
      const newDataGeral = {
        company: data.company,
        empresaSelecionada: data.empresaSelecionada,
      }
      // @ts-ignore
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
    }
    // await router.push(`/service-schedule?company=${companyId}`)
  }

  useEffect(() => {
    if (dataGeral === null) {
      const cookies = parseCookies()
      if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
        const newDataGeral = JSON.parse(
          cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
        )
        setDataGeral(newDataGeral)
      } else {
        router.push('/company')
      }
    }
  }, [])

  return (
    <geralContext.Provider value={{ dataGeral, createDataGeral }}>
      {children}
    </geralContext.Provider>
  )
}
