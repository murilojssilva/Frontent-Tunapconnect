import * as React from 'react'
import { useQuery } from 'react-query'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Router from 'next/router'

import { ApiCore } from '@/lib/api'
import { Box, Skeleton, Typography, CircularProgress } from '@mui/material'
import Title from '@/components/Title'
import { ContainerItem } from './styles'

import { useSession } from 'next-auth/react'

import { formatCPF } from '@/ultis/formatCPF'
import { formatCNPJ } from '@/ultis/formatCNPJ'
import Link from 'next/link'
import { saveCookies } from '@/contexts/SaveCookie'

interface companyProps {
  id: string
  name: string
  cnpj: string | null
  cpf: string | null
}
export default function CompanyList() {
  const contexto = saveCookies()

  contexto.empresaSelecionada && delete contexto.empresaSelecionada

  saveCookies(contexto)

  const { data, isSuccess, isLoading } = useQuery<companyProps[] | null>(
    ['company-page-list-company'],
    () =>
      api.get(`/user/companies`).then((response) => {
        contexto.empresas = response.data.data

        saveCookies(contexto)

        return response.data.data
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  )
  // eslint-disable-next-line no-unused-vars
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.replace('/auth/login')
    },
  })
  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <CircularProgress size={150} />
      </Box>
    )
  }

  // eslint-disable-next-line new-cap
  const api = new ApiCore()

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
                <Grid key={`${item.id}-${index}`} item xs={12} md={4} lg={4}>
                  <Link
                    href={`/service-schedule?company_id=${item.id}`}
                    style={{
                      textDecoration: 'none',
                      padding: '16px',
                    }}
                    onClick={() => {
                      contexto.empresaSelecionada = {
                        id: item.id,
                        corporate_name: item.name,
                      }
                      saveCookies(contexto)
                    }}
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
                      <Typography>
                        {formatCNPJ(String(item.cnpj)) ||
                          formatCPF(String(item.cpf))}
                      </Typography>
                    </ContainerItem>
                  </Link>
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </>
  )
}

CompanyList.auth = true
