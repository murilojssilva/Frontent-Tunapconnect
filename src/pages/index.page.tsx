import { getServerSession } from 'next-auth/next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { authOptions } from './api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SignIn() {
  const { data: session } = useSession()
  const router = useRouter()
  if (typeof window === 'undefined') return null

  if (session) {
    router.push('/company')
  }

  router.push('/auth/login')
}
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  return {
    props: {
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  }
}
