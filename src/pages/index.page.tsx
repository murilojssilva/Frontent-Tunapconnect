// import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { authOptions } from './api/auth/[...nextauth].api'

export default function SignIn() {
  const { data: session } = useSession()
  const router = useRouter()

  if (typeof window === 'undefined') return null

  if (session) {
    router.push('/company')
  }
  router.push('/auth/login')

  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  return {
    props: {
      session,
    },
  }
}
