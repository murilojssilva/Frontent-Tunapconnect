import * as React from 'react'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import { useRouter } from 'next/router'

export default function CompanuId() {
  const router = useRouter()

  const param = router.query.id

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="body2" color="text.secondary" align="center">
        company {param}
      </Typography>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session?.user?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
