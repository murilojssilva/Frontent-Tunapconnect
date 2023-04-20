// import { authOptions } from '@/pages/api/auth/[...nextauth].api'
// import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
// import { GetServerSidePropsContext } from 'next/types'
import { ReactNode } from 'react'
import { DashboardContent } from './DashboardContent'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()

  // const router = useRouter()

  // useEffect(() => {
  //   const redirectRouter = async (pathname = '/') => {
  //     await router.push(pathname)
  //   }

  //   // if (status === 'unauthenticated') {
  //   //   redirectRouter('/')
  //   // }
  // }, [])

  return <>{session && <DashboardContent>{children}</DashboardContent>}</>
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions)
//   if (!session?.user?.token) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: {
//       session,
//     },
//   }
// }
