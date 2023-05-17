import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useContext, useState, useMemo, useEffect } from 'react'

import Container from '@mui/material/Container'

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import { ButtonAdd, ButtonIcon } from './style'
import { ServiceSchedulesListProps } from '@/types/service-schedule'
import { ApiCore } from '@/lib/api'
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { ActionDeleteConfirmations } from '@/helpers/ActionConfirmations'
import { useRouter } from 'next/router'
import { TableApp } from '@/components/TableApp'
import { CompanyContext } from '@/contexts/CompanyContext'
import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
import { formatMoneyPtBR } from '@/ultis/formatMoneyPtBR'
import { useQuery } from 'react-query'
import Skeleton from '@mui/material/Skeleton'

type SearchFormProps = {
  search: string
}

// type PagesProps = {
//   search: string
// }

const api = new ApiCore()

const HeaderBreadcrumbData: listBreadcrumb[] = [
  {
    label: 'Tunap',
    href: '/company',
  },
  {
    label: 'Lista de agendamentos',
    href: '/service-schedules/list',
  },
]

export default function ServiceSchedulesList() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1000)
>>>>>>> e9b7652 (Remove line)
  const [pages, setPages] = useState<{
=======
  let contexto: any = {}
  const cookies = parseCookies()
  //   JSON.parse(
  //   cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
  // ),

  if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
    contexto = JSON.parse(
      cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
    )
  }

  delete contexto.empresaSelecionada

  const cookiesResult = parseCookies()

  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  // const { dataGeral } = React.useContext(geralContext)

  const [pages, setPages] = React.useState<{
>>>>>>> 580c85f (Fix Context)
=======
  const [pages, setPages] = useState<{
>>>>>>> 355a774 (Fix)
    current: number
    next: boolean
    previous: boolean
  }>({ current: currentPage, next: false, previous: false })

  const { companySelected } = useContext(CompanyContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: '',
    },
  })

  function onSubmitSearch(data: SearchFormProps) {
    // setSearch(data.search)
    router.push(
      `/service-schedule?company_id=${companySelected}${
        data.search ? '&search=' + data.search : ''
      }${
        router.query.current_page
          ? '&current_page=' + router.query.current_page
          : ''
      }`,
    )
  }

  const handleDelete = (id: number) => {
    // setRows(rows.filter((row) => row.id !== id))
  }

  async function handlePages(nextPage: any) {
    if (nextPage === 'next') {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
        setPages({ current: currentPage, next: true, previous: false })
        router.push(url)
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
        setPages({ current: currentPage, next: false, previous: true })
        router.push(url)
      }
    }
  }

  let url = `/service-schedule?company_id=${companySelected}`

  if (router.query.limit) {
    url += `&limit=${router.query.limit}`
  }

  if (currentPage > 1) {
    url += `&current_page=${currentPage}`
  }

  if (router.query.search) {
    url += `&search=${router.query.search}`
  }

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Número',
        headerClassName: 'super-app-theme--header',
        width: 90,
        type: 'number',
        align: 'center',
        sortable: false,
      },
      {
        field: 'client',
        headerName: 'Cliente',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        maxWidth: 230,
        minWidth: 120,
        align: 'left',
        sortable: false,
      },
      {
        field: 'plate',
        headerName: 'Placa',
        headerClassName: 'super-app-theme--header',
        width: 90,
        sortable: false,
      },
      {
        field: 'chassis',
        headerName: 'Chassis',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        maxWidth: 200,
        minWidth: 120,
        sortable: false,
      },
      {
        field: 'technical_consultant',
        headerName: 'Responsavél',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        maxWidth: 120,
        minWidth: 80,
        sortable: false,
      },
      {
        field: 'typeEstimate',
        headerName: 'Tipo Orçamento',
        headerClassName: 'super-app-theme--header',
        width: 120,
        sortable: false,
      },
      {
        field: 'totalDiscount',
        headerName: 'Tipo Desconto',
        headerClassName: 'super-app-theme--header',
        // type: 'number',
        width: 110,
        align: 'center',
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatMoneyPtBR(params.row.totalDiscount) || ''}`,
      },
      {
        field: 'total',
        headerName: 'Total Geral',
        headerClassName: 'super-app-theme--header',
        // type: 'number',
        width: 110,
        align: 'center',
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatMoneyPtBR(params.row.total) || ''}`,
      },
      {
        field: 'action',
        headerName: 'Ação',
        headerClassName: 'super-app-theme--header',
        sortable: false,
        width: 80,
        align: 'left',
        renderCell: (params: GridRenderCellParams) => {
          const onClick = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            const id = params.id
            ActionDeleteConfirmations(id as number, handleDelete)
          }
          return (
            <IconButton
              aria-label="search"
              color="warning"
              onClick={onClick}
              sx={{ marginLeft: 1, color: 'red' }}
            >
              <Delete />
            </IconButton>
          )
        },
      },
    ],
    [],
  )

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 355a774 (Fix)
  const {
    data: rows,
    isSuccess,
    // isInitialLoading,
    // isLoading,
    // isFetched,
    refetch,
    isFetching,
  } = useQuery<ServiceSchedulesListProps[] | []>(
    ['service-scheduler-list', companySelected],
    () =>
      api
        .get(url)
        .then((response) => {
          setTotalPages(response.data.total_pages)
          const resp = response.data.data.map((data: any) => ({
            id: data?.id ?? 'Não informado',
            client: data?.client?.name ?? 'Não informado',
            plate: data?.client_vehicle?.plate ?? 'Não informado',
            chassis: data?.client_vehicle?.chasis ?? 'Não informado',
            technical_consultant:
              data?.technical_consultant?.name ?? 'Não informado',
            typeEstimate: 'não definido',
            totalDiscount: 0,
            total: 0,
          }))
          return resp
        })
        .catch((err) => {
          console.log(err)
          return []
        }),
    { enabled: !!companySelected, refetchOnWindowFocus: false },
  )
<<<<<<< HEAD
=======
  // !company_id// && router.reload()
>>>>>>> 580c85f (Fix Context)
=======
>>>>>>> 355a774 (Fix)

  useEffect(() => {
    async function refetchUrl() {
      if (router.query.search) {
        setValue('search', router.query.search as string)
      } else {
        setValue('search', '')
      }

      await refetch()
    }
    refetchUrl()
  }, [router])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={12}
                lg={8}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmitSearch)}
                  sx={{ flexWrap: 'nowrap', display: 'flex', flex: 1 }}
                >
                  <TextField
                    label="Procura"
                    id="outlined-size-small"
                    size="small"
                    sx={{ flex: 1, width: '100%' }}
                    {...register('search')}
                  />

                  <ButtonIcon
                    type="submit"
                    aria-label="search"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                  >
                    <SearchIcon />
                  </ButtonIcon>
                </Box>
                {/* <Box>
                  <MultipleSelectCheckmarks checkNames={filterChecked} handleChecked={handleChecked} />
                </Box> */}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ButtonAdd
                  size="large"
                  variant="contained"
                  sx={{ alignSelf: 'flex-end' }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={async () => {
                    router.push(`/service-schedules/create`)
                  }}
                >
<<<<<<< HEAD
<<<<<<< HEAD
                  Adicionar novo
                </ButtonAdd>
=======
                  <ButtonAdd
                    size="large"
                    variant="contained"
                    sx={{ alignSelf: 'flex-end' }}
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={async () => {
                      await router.push(`/checklist/create/${company_id}`)

                      const newContext = JSON.parse(
                        cookies[
                          process.env
                            .NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string
                        ],
                      )
                      contexto = {
                        ...newContext,
                        empresaSelecionada: company_id,
                      }
                      setCookie(
                        null,
                        process.env
                          .NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string,
                        JSON.stringify(contexto),
                        {
                          maxAge: 30 * 24 * 60 * 60,
                          path: '/',
                        },
                      )
                    }}
                  >
                    Adicionar novo
                  </ButtonAdd>
                </Grid>
>>>>>>> 580c85f (Fix Context)
=======
                  Adicionar novo
                </ButtonAdd>
>>>>>>> 355a774 (Fix)
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <HeaderBreadcrumb
            data={HeaderBreadcrumbData}
            title="Lista de Agendamentos"
          />
        </Grid>

        <Grid item xs={12}>
          {!isFetching ? (
            <TableApp
              columns={columns}
              rowsData={isSuccess ? rows : []}
              handlePages={handlePages}
              pages={pages}
              loading={isFetching}
              companyId={companySelected as string}
            />
          ) : (
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={150} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

ServiceSchedulesList.auth = true
