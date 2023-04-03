import * as React from 'react';
import { useForm } from "react-hook-form";
import { useContext, useEffect, useMemo, useState } from 'react';

import Container from '@mui/material/Container';

import { GridColDef, GridRenderCellParams, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid';


import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { ButtonAdd, ButtonIcon } from '@/styles/pages/service-schedules/styles';
import { ServiceSchedulesListProps } from '@/types/service-schedule';
import { apiCore } from '@/lib/api';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ActionDeleteConfirmations } from '@/helpers/ActionConfirmations';
import { useRouter } from 'next/router';
import { TableApp } from '@/components/TableApp';
import Title from '@/components/Title';
import { CompanyContext } from '@/contexts/CompanyContext';
import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types';
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb';
import Stack from '@mui/material/Stack';
import { formatMoneyPt_BR } from '@/ultis/formatMoneyPtBR';



type SearchFormProps = {
  search: string
}

// type PagesProps = {
//   search: string
// }

const api = new apiCore()

const HeaderBreadcrumbData:listBreadcrumb[] = [
  {
    label: 'Tunap',
    href: '/company'
  },
  {
    label: 'Lista de agendamentos',
    href: '/service-schedules/list'
  },
  
]

export default function ServiceSchedulesList() {
  const [rows, setRows] = useState<ServiceSchedulesListProps[]>([])
  const [pages, setPages] = useState<{current: number, next: boolean, previous: boolean}>
  ({current: 1, next: false, previous: false})
  const [loadingData, setLoadingData] = useState(false)

  const {company} = useContext(CompanyContext)

  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      search: ''
    }
  });

  function onSubmitSearch(data: SearchFormProps) {
    router.push('/service-schedules/list?search=' + data.search)
  }


  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id))
  }


  function handlePages(nextPage: string): void {
    // console.log('func handlePages', nextPage)
  }


  // const formatNumber = new Intl.NumberFormat('pt-BR', {
  //   style: 'currency',
  //   currency: 'BRL',
  //   minimumFractionDigits: 2, maximumFractionDigits: 2
  // })

  const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Número',
    headerClassName: 'super-app-theme--header',
    width: 90,
    type: 'number',
    align: 'center',
    sortable: false
  },
  {
    field: 'client',
    headerName: 'Cliente',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    maxWidth: 230,
     minWidth: 120,
    align: 'left',
    sortable: false
  },
  {
    field: 'plate',
    headerName: 'Placa',
    headerClassName: 'super-app-theme--header',
    width: 90,
    sortable: false
  },
  {
    field: 'chassis',
    headerName: 'Chassis',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    maxWidth: 200,
    minWidth: 120,
    sortable: false
  },
  {
    field: 'technical_consultant',
    headerName: 'Responsavél',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    maxWidth: 120,
    minWidth: 80,
    sortable: false
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
      `${formatMoneyPt_BR(params.row.totalDiscount) || ''}`
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
      `${formatMoneyPt_BR(params.row.total) || ''}`
  },
  {
    field: 'action',
    headerName: 'Ação',
    headerClassName: 'super-app-theme--header',
    sortable: false,
    width: 80,
    align: 'left',
    renderCell: (params: GridRenderCellParams) => {
      const onClick = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation(); 
        const id = params.id;
        ActionDeleteConfirmations(id as number, handleDelete)
      }
      return (
        <IconButton aria-label="search" color="warning" onClick={onClick} sx={{ marginLeft: 1, color: 'red' }}>
          <Delete />
        </IconButton>
      ) 
    },
  },
  ];


  useEffect(() => { 
    if (!!company?.id) {
      setLoadingData(true)
      api.get(`/service-schedule?company_id=${company?.id}&limit=2&page=2`)
      .then((response) => {
        const resp = response.data.data
        setRows(resp.map((data: any) => ({
          id: data?.id  ?? 'Não informado',
          client: data?.client?.name  ?? 'Não informado',  
          plate: data?.client_vehicle?.plate ?? 'Não informado',
          chassis: data?.client_vehicle?.chasis  ?? 'Não informado',
          technical_consultant: data?.technical_consultant?.name ?? 'Não informado',
          typeEstimate: 'não definido',
          totalDiscount: 0,
          total: 0
        })))
      }).catch((error) => { 
        console.error(error)
        setRows([])
      }).finally(() => { setLoadingData(false)})
    }
  }, [router,company?.id])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
       <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={8} sx={{display: 'flex', alignItems: 'center'}}>
                <Box
                  component='form'
                  onSubmit={handleSubmit(onSubmitSearch)}
                  sx={{ flexWrap: "nowrap", display: 'flex', flex: 1 }}
                >
                <TextField
                  label="Procura"
                  id="outlined-size-small"
                  // defaultValue="Pro"
                  size="small"
                    sx={{ flex: 1, width: '100%' }}
                    {...register("search")}
                  />
                  
                  <ButtonIcon
                    type='submit'
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
            <Grid item xs={12} md={12} lg={4} sx={{display: 'flex', flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}>
                <ButtonAdd
                  size="large"
                  variant="contained"
                  sx={{ alignSelf: 'flex-end' }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    router.push('/service-schedules/create')
                  }}
                >
                  
                
                  Adicionar novo
                </ButtonAdd>
              </Grid>
            </Grid>  
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <HeaderBreadcrumb data={HeaderBreadcrumbData} title='Lista de Agendamentos'/> 
        </Grid>
 
          <Grid item xs={12}>
          <TableApp columns={columns} rowsData={rows} handlePages={handlePages} pages={pages} loading={loadingData} />
          </Grid>
        </Grid>
    </Container>
    
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

const session = await getSession(ctx)

  if (!session?.user?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {
    }, 
  }
}