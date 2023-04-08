import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { DashboardContent } from './DashboardContent'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession()

  const router = useRouter()

  console.log(status)
  console.log(session)

  useEffect(() => {
    const redirectRouter = async (pathname = '/') => {
      await router.push(pathname)
    }

    if (status === 'unauthenticated') {
      console.log('Unauthenticated')
      redirectRouter('/')
    }
  }, [session])

  return <>{session && <DashboardContent>{children}</DashboardContent>}</>
}
