import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { useContext } from 'react'
import { ApiCore } from '@/lib/api'
import { Skeleton, Typography } from '@mui/material'
import Title from '@/components/Title'
import { ContainerItem } from './styles'

// import { useRouter } from 'next/router'
import { CompanyContext } from '@/contexts/CompanyContext'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

interface companyProps {
  id: number
  name: string
  cnpj: string | null
  cpf: string | null
}

export default function CompanyList() {
  // eslint-disable-next-line no-unused-vars
  const { data: session } = useSession()

  // eslint-disable-next-line new-cap
  const api = new ApiCore()
  // const router = useRouter()
  const { createCompany } = useContext(CompanyContext)

  function handleSelectCompany(newCompany: companyProps) {
    createCompany(newCompany)
  }

  const { data, isSuccess, isLoading } = useQuery<companyProps[] | null>({
    queryKey: ['company-page-list-company'],
    queryFn: () =>
      api.get(`/user/companies`).then((response) => response.data.data),
  })

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {isLoading && (
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
          {isSuccess &&
            data?.map((item, index) => {
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

CompanyList.auth = true
