import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

export default function SignIn() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { 'next-auth.session-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
