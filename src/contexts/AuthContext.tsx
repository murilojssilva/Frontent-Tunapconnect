import { createContext, ReactNode, useEffect, useState } from 'react'
import { signIn as signInRequest, useSession } from 'next-auth/react'

import Router, { useRouter } from 'next/router'

type SignInData = {
  username: string
  password: string
}

type User = {
  id: string | undefined
  name: string | undefined
  privilege: string | undefined
}

type AuthContextType = {
  isAuthenticated: boolean
  signIn: (data: SignInData) => void
  user: User | null

  company: CompanyProps | null | undefined
  companyId: string | undefined
  createCompany: (company: CompanyProps) => Promise<void>

  fetchCompany: () => void
}

type CompanyProps = {
  id: string
  name: string
  cnpj: string | null
  cpf: string | null
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [company, setCompany] = useState<CompanyProps | null>(null)
  const [companyId, setCompanyId] = useState<string>("")

  const isCompanyId = !!companyId
  const isAuthenticated = !!user

  const router = useRouter()

  async function createCompany(newCompany: CompanyProps) {
    setCompany(newCompany)
    setCompanyId(newCompany.id)
    await Router.push(`/service-schedules/list?company=${newCompany.id}`)
  }

  function fetchCompany() {
    return router.asPath.replace("/service-schedules/list?company=","")
  }

  async function signIn(data: SignInData) {
    const resp = await signInRequest('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    })

    if (resp?.ok && resp?.status === 200) {
      setUser({
        id: session?.user.id,
        name: session?.user.name,
        privilege: session?.user.privilege,
      })
      await Router.push('/company')
    }
  }

 
  useEffect(() => {
    const path = Router.asPath
    
    if (session) {
      if (!user){
        setUser({
          id: session?.user.id,
          name: session?.user.name,
          privilege: session?.user.privilege,
        })
        path === "/" ? Router.push("/company") : Router.push(path)
      }
    }
  },[session])

  useEffect(() => {
    if (!isCompanyId) {
      if (router?.query?.companyId) {
        const regex = /[1-9]+/
        regex.test(router?.query?.companyId as string)
          ? setCompanyId(router?.query?.companyId as string)
          : router.push('/company')
      }
      setCompanyId(fetchCompany())
    }
  }, [router?.query?.companyId])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, companyId, company, createCompany, fetchCompany }}>
      {children}
    </AuthContext.Provider>
  )
}
    

      

