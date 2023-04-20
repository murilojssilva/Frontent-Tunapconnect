import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useContext, useState, useMemo } from 'react'

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
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSidePropsContext } from 'next/types'
// import { Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

type SearchFormProps = {
  search: string
}

// type PagesProps = {
//   search: string
// }

// eslint-disable-next-line new-cap
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
  const [pages, setPages] = useState<{
    current: number
    next: boolean
    previous: boolean
  }>({ current: 1, next: false, previous: false })

  const { campanyId } = useContext(CompanyContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: '',
    },
  })

  function onSubmitSearch(data: SearchFormProps) {
    router.push(
      `/${router?.query?.id}/service-schedules/list?search=${data.search}`,
    )
  }

  const handleDelete = (id: number) => {
    // setRows(rows.filter((row) => row.id !== id))
  }

  function handlePages(nextPage: any): void {
    setPages(nextPage)
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

  const {
    data: rows,
    isSuccess,
    isLoading,
  } = useQuery<ServiceSchedulesListProps[] | []>({
    queryKey: ['service-scheduler-list'],
    queryFn: () =>
      api
        .get(
          `/service-schedule?company_id=${router?.query?.companyId}&limit=2&page=2`,
        )
        .then((response) => {
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
        .catch(() => []),
    enabled: !!router?.query?.companyId,
  })

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
                    await router.push(`/${campanyId}/service-schedules/create`)
                  }}
                >
                  Adicionar novo
                </ButtonAdd>
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
          {/* {(isSuccess || isFetched) && ( */}
          <TableApp
            columns={columns}
            // rowsData={rows || []}
            rowsData={isSuccess ? rows : []}
            handlePages={handlePages}
            pages={pages}
            loading={isLoading}
          />
          {/* )} */}
        </Grid>
      </Grid>
    </Container>
  )
}

// export default React.memo(ServiceSchedulesList)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session?.user?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}
