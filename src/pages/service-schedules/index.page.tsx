'use client'
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
import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
import { formatMoneyPtBR } from '@/ultis/formatMoneyPtBR'
import { useQuery } from 'react-query'
import Skeleton from '@mui/material/Skeleton'
import { AuthContext } from '@/contexts/AuthContext'

type SearchFormProps = {
  search: string
  current_page: number
  limit: number
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
    href: '/service-schedules',
  },
]

export default function ServiceSchedulesList() {
  const [pages, setPages] = useState<{
    current: number
    next: boolean
    previous: boolean
  }>({ current: 1, next: false, previous: false })

  const { companyId, user } = useContext(AuthContext)

  const [filteredRows, setFilteredRows] = useState<ServiceSchedulesListProps[]>(
    [],
  )

  const [totalPages, setTotalPages] = useState(1)

  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(2)

  const router = useRouter()

  const [searchText, setSearchText] = useState<string>(
    router.asPath
      .replace('/service-schedules?company=1', '')
      .replace(`&limit=${limit}&current_page=${currentPage}&search=`, ''),
  )

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: searchText,
      limit,
      currentPage,
    },
  })

  async function onSubmitSearch(data: SearchFormProps) {
    const totalItems = await api.get(
      `/service-schedule?company_id=${companyId}`,
    )

    setTotalPages(totalItems.data.data.length / limit)
    const response = data.search
      ? await api
          .get(
            `/service-schedule?company_id=${companyId}&limit=${data.limit}&page=${data.current_page}&search=${data.search}`,
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
          .catch(() => [])
      : await api
          .get(
            `/service-schedule?company_id=${companyId}&limit=${data.limit}&page=${data.current_page}`,
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
          .catch(() => [])

    router.asPath.match('search') && setSearchText(data.search)
    router.asPath.match('current_page') && setSearchText(data.search)
    router.asPath.match('limit') && setSearchText(data.search)

    searchText === `${data.search}&search=${data.search}` &&
      setSearchText(data.search)
    setFilteredRows(
      response?.filter(
        (row: any) =>
          row.chassis.includes(data.search) ||
          row.client.includes(data.search) ||
          row.plate.includes(data.search) ||
          row.technical_consultant.includes(data.search) ||
          row.total === Number(data.search) ||
          row.totalDiscount === Number(data.search) ||
          row.id === Number(data.search),
      ) as ServiceSchedulesListProps[],
    )

    router.push(
      searchText === ''
        ? data.search === ''
          ? `/service-schedules?company=${companyId}&limit=${limit}&current_page=${currentPage}`
          : `/service-schedules?company=${companyId}&limit=${limit}&current_page=${currentPage}&search=${data.search}`
        : `/service-schedules?company=${companyId}&limit=${limit}&current_page=${currentPage}&search=${data.search}`.replace(
            `&search=${searchText}`,
            '',
          ),
    )
  }

  const handleDelete = (id: number) => {
    console.log(id)
  }

  async function handlePages(nextPage: any) {
    if (nextPage === 'next') {
      if (currentPage < totalPages) {
        setValue('currentPage', currentPage + 1)
        setCurrentPage(currentPage + 1)
        setPages({ current: currentPage, next: true, previous: false })
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
        setValue('currentPage', currentPage - 1)
        setPages({ current: currentPage, next: false, previous: true })
      }
    }

    router.push(
      `/service-schedules?company=${companyId}&limit=${limit}&current_page=${currentPage}`,
    )
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

  const {
    data: rows,
    isSuccess,
    // isInitialLoading,
    // isLoading,
    // isFetched,
    isFetching,
  } = useQuery<ServiceSchedulesListProps[] | []>(
    ['service-scheduler-list', companyId],
    () =>
      api
        .get(
          `/service-schedule?company_id=${companyId}&limit=${limit}&page=${currentPage}`,
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
    { enabled: !!companyId, refetchOnWindowFocus: false },
  )

  useEffect(() => {
    if (rows) {
      setFilteredRows(rows as ServiceSchedulesListProps[])
    }
  }, [rows])

  useEffect(() => {
    if (currentPage > totalPages) {
      setValue('currentPage', 1)
      setCurrentPage(1)
      router.push(`/company`).then(() => router.reload())
    }
    const companyIdNumeric = String(companyId).replace(/[^\d]/g, '')
    user
      ? !companyIdNumeric && router.push('/company')
      : router.push(
          `/service-schedules?company=${companyId}&limit=${limit}&current_page=${currentPage}`,
        )
  }, [])

  useEffect(() => {
    setLimit(2)
    searchText
      ? searchText === '/service-schedules?company=/'
        ? user
          ? router.push('/company')
          : router.push('/')
        : searchText === '' &&
          router.push(`/service-schedules?company=${companyId}`)
      : onSubmitSearch({
          search: searchText,
          current_page: currentPage,
          limit,
        })
  }, [searchText])

  useEffect(() => {
    const route = router.asPath.toLowerCase()
    if (router.asPath.includes('&')) {
      if (
        route.match('search') ||
        route.match('limit') ||
        route.match('current_page')
      ) {
        console.log(route)
      } else {
        router
          .push(router.asPath.substr(0, router.asPath.indexOf('&')))
          .then(() => router.reload())
      }
    }
  }, [router.asPath])

  useEffect(() => {
    if (Number(router.query.current_page) > totalPages) {
      setValue('currentPage', 1)
      setCurrentPage(1)
      router.push(router.pathname).then(() => router.reload())
    }
    if (router.query.search) {
      setValue('search', router.query.search as string)
    } else {
      setValue('search', '')
    }
    if (router.query.search) {
      setValue('currentPage', Number(router.query.current_page))
    } else {
      setValue('currentPage', currentPage)
    }
    if (router.query.search) {
      setValue('limit', Number(router.query.limit))
    } else {
      setValue('limit', limit)
    }
  }, [router.query])

  useEffect(() => {
    setLimit(2)
    onSubmitSearch({
      search: searchText,
      current_page: currentPage,
      limit,
    })
  }, [pages])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {!isFetching ? (
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
                    onSubmit={handleSubmit(() => onSubmitSearch)}
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
                      await router.push(`/checklist/create/${companyId}`)
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
          {!isFetching ? (
            <TableApp
              columns={columns}
              rowsData={isSuccess ? filteredRows : []}
              handlePages={handlePages}
              pages={pages}
              loading={isFetching}
              companyId={companyId}
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

ServiceSchedulesList.auth = true
