import * as React from 'react'
import { useQuery } from 'react-query'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Router from 'next/router'

import { ApiCore } from '@/lib/api'
import { Box, Skeleton, Typography, CircularProgress } from '@mui/material'
import Title from '@/components/Title'
import { ContainerItem } from './styles'

// import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { formatCPF } from '@/ultis/formatCPF'
import { formatCNPJ } from '@/ultis/formatCNPJ'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Link from 'next/link'

interface companyProps {
  id: string
  name: string
  cnpj: string | null
  cpf: string | null
}
export default function CompanyList() {
  const { data, isSuccess, isLoading } = useQuery<companyProps[] | null>(
    ['company-page-list-company'],
    () =>
      api.get(`/user/companies`).then((response) => {
        console.log(response.data.data)

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
  // const router = useRouter()

  // const { data, isSuccess, isLoading, isFetching, isFetched } = useQuery<
  //   companyProps[] | null
  // >(['company-page-list-company'],
  //   queryFn: async () => {
  //     let resp
  //     console.log('entrou')
  //     try {
  //       resp = await api.get(`/user/companies`)
  //       console.log(resp.data.data)

  //       return resp.data.data
  //     } catch (error) {
  //       console.log(error)
  //       return error
  //     }
  //   },
  //   // initialData: [],
  // refetchOnWindowFocus: false,
  // retry: false,
  // })

  // useEffect(() => {
  //   api
  //     .get(`/user/companies`)
  //     .then((response) => {
  //       console.log(response.data.data)

  //       return response.data.data
  //     })
  //     .catch((error) => console.error(error))
  // }, [])

  // console.log(data)
  // console.log(isSuccess)
  // console.log(isLoading)

  // if (error) return <p>erro</p>

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

// function useQuery<T>(arg0: {
//   queryKey: string[]
//   queryFn: () => Promise<any>
//   // initialData: [],
//   refetchOnWindowFocus: boolean
//   retry: boolean
// }): {
//   data: any
//   isSuccess: any
//   isLoading: any
//   isFetching: any
//   isFetched: any
// } {
//   throw new Error('Function not implemented.')
// }
