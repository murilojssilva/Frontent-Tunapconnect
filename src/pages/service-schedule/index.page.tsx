import * as React from 'react'

import Container from '@mui/material/Container'

import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import { useRouter } from 'next/router'

import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Box } from '@mui/system'
import {
  CircularProgress,
  IconButton,
  Paper,
  Skeleton,
  TextField,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { ButtonAdd, ButtonIcon } from './style'
import { Delete } from '@mui/icons-material'
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { formatMoneyPtBR } from '@/ultis/formatMoneyPtBR'
import { ActionDeleteConfirmations } from '@/helpers/ActionConfirmations'
import { ServiceSchedulesListProps } from '@/types/service-schedule'
import { TableApp } from '@/components/TableApp'
// import { geralContext } from '@/contexts/GeralContext'

type SearchFormProps = {
  search: string
  current_page: number
  limit: number
}

const HeaderBreadcrumbData: listBreadcrumb[] = [
  {
    label: 'Tunap',
    href: '/company',
  },
  {
    label: 'Lista de agendamentos',
    href: '/service-schedule',
  },
]

export default function ServiceSchedulesList() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  // const { dataGeral } = React.useContext(geralContext)

  const [pages, setPages] = React.useState<{
    current: number
    next: boolean
    previous: boolean
  }>({ current: currentPage, next: false, previous: false })

  const [rows, setRows] = React.useState([] as ServiceSchedulesListProps[])
  const [totalPages, setTotalPages] = React.useState<number>(1)

  const { company_id, limit, current_page, search } = router.query

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: '',
      limit: 50,
      current_page: 1,
    },
  })

  const handleDelete = (id: number) => {
    fetchCompany()
  }

  async function handlePages(nextPage: 'next' | 'previous') {
    if (nextPage === 'next') {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
        setPages({ current: currentPage, next: true, previous: false })
        const newUrl = createNewUrl(
          router.query.search as string,
          currentPage + 1,
          router.query.limit as string,
        )

        router.push(newUrl)
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
        setPages({ current: currentPage, next: false, previous: true })
        const newUrl = createNewUrl(
          router.query.search as string,
          currentPage - 1,
          router.query.limit as string,
        )

        router.push(newUrl)
      }
    }
  }

  const columns: GridColDef[] = React.useMemo(
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
        width: 220,
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
        width: 90,
        sortable: false,
      },
      {
        field: 'technical_consultant',
        headerName: 'Responsavél',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        width: 220,
        sortable: false,
      },
      {
        field: 'typeEstimate',
        headerName: 'Tipo Orçamento',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        width: 150,
        sortable: false,
      },
      {
        field: 'totalDiscount',
        headerName: 'Tipo Desconto',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        // type: 'number',
        width: 180,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatMoneyPtBR(params.row.totalDiscount) || ''}`,
      },
      {
        field: 'total',
        headerName: 'Total Geral',
        headerClassName: 'super-app-theme--header',
        // type: 'number',
        flex: 1,
        width: 110,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatMoneyPtBR(params.row.total) || ''}`,
      },
      {
        field: 'action',
        headerName: 'Ação',
        headerClassName: 'super-app-theme--header',
        sortable: false,
        flex: 1,
        width: 180,
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
              sx={{ color: 'red' }}
            >
              <Delete />
            </IconButton>
          )
        },
      },
    ],
    [],
  )

  !company_id && router.reload()

  let url = `/service-schedule?company_id=${company_id}`

  if (limit) {
    url += `&limit=${limit}`
  }

  if (current_page) {
    url += `&current_page=${current_page}`
  }

  if (search) {
    url += `&search=${search}`
  }

  async function fetchCompany() {
    const response = await api
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
      .catch(() => [])

    setRows(response)
  }

  async function onSubmitSearch(data: SearchFormProps) {
    const newUrl = createNewUrl(data.search)

    router.push(newUrl)

    fetchCompany()
  }

  function createNewUrl(
    search?: string | null,
    current_page?: number | null,
    limit?: string | null,
  ) {
    const newUrl = `/service-schedule?company_id=${company_id}${
      search ? '&search=' + search : ''
    }${current_page ? '&current_page=' + current_page : ''}${
      limit ? '&limit=' + limit : ''
    }`

    return newUrl
  }

  React.useEffect(() => {
    fetchCompany()
    setValue('search', router.query.search as string)
  }, [router, currentPage])

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/login')
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {rows ? (
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
                      await router.push(`/checklist/create/${company_id}`)
                    }}
                  >
                    Adicionar novo
                  </ButtonAdd>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={140} />
          </Grid>
        )}
        <Grid item xs={12}>
          <HeaderBreadcrumb
            data={HeaderBreadcrumbData}
            title="Lista de Agendamentos"
          />
        </Grid>

        <Grid item xs={12}>
          {rows ? (
            <TableApp
              columns={columns}
              rowsData={rows || []}
              // @ts-ignore
              handlePages={handlePages}
              loading={!rows}
              pages={pages}
              companyId={company_id as string}
            />
          ) : (
            <Grid>
              <Skeleton
                variant="rounded"
                sx={{ width: '100%' }}
                height={70}
                style={{ marginBottom: 8 }}
              />
              <Skeleton variant="rounded" sx={{ width: '100%' }} height={150} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  )
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

ServiceSchedulesList.auth = true
