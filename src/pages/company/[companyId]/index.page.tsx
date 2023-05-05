import * as React from 'react'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function CompanuId() {
  const router = useRouter()

  const param = router.query.companyId

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="body2" color="text.secondary" align="center">
        company {param}
      </Typography>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {['']: token} = parseCookies(ctx)

  if(!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
