import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { getSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next/types'
import { ApiCore } from '@/lib/api'
import { Skeleton, Typography } from '@mui/material'
import Title from '@/components/Title'
import { ContainerItem } from './styles'

// import { useRouter } from 'next/router'
import { CompanyContext } from '@/contexts/CompanyContext'

interface companyProps {
  id: number
  name: string
  cnpj: string | null
  cpf: string | null
}

export default function DashboardContent() {
  const [company, setCompany] = useState<companyProps[] | []>()

  // eslint-disable-next-line new-cap
  const api = new ApiCore()
  // const router = useRouter()
  const { createCompany } = useContext(CompanyContext)

  function handleSelectCompany(newCompany: companyProps) {
    createCompany(newCompany)
  }

  useEffect(() => {
    api
      .get('/user/companies')
      .then((response) => {
        const { data } = response.data
        if (data.length > 0) {
          setCompany(
            data.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                cnpj: item.cnpj,
                cpf: item.cpf,
              }
            }),
          )
        }
      })
      .catch((err) => {
        setCompany([])
        console.log(err)
      })
  }, [])

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {!company && (
            <>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
            </>
          )}
          {company &&
            company.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  lg={4}
                  key={`${item.id}-${index}`}
                  onClick={() => handleSelectCompany(item)}
                >
                  <ContainerItem
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 180,
                    }}
                  >
                    <Title>{item.name || 'Não informado'}</Title>
                    <Typography>{item.cnpj || item.cpf}</Typography>
                  </ContainerItem>
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </>
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
