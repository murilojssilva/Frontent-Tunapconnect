import * as React from 'react';
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


import { AuthContext } from '@/contexts/AuthContext';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '@/redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { MultipleSelectCheckmarks } from '@/components/MultipleSelectCheckmarks';
import { ButtonIcon } from '@/styles/pages/service-schedules/styles';
import { ServiceSchedulesListProps } from '@/types/service-schedule';
import { apiCore } from '@/lib/api';

type SignInDataProps = {
  username: string
  password: string
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Número',
    headerClassName: 'super-app-theme--header',
    width: 90,
    type: 'number',
    align: 'center',
  },
  {
    field: 'client',
    headerName: 'Cliente',
    headerClassName: 'super-app-theme--header',
    width: 210,
    align: 'left',
  },
  {
    field: 'plate',
    headerName: 'Placa',
    headerClassName: 'super-app-theme--header',
    width: 90,
  },
  {
    field: 'chassis',
    headerName: 'Chassis',
    headerClassName: 'super-app-theme--header',
    width: 200,
  },
  {
    field: 'technical_consultant',
    headerName: 'Responsavél',
    headerClassName: 'super-app-theme--header',
    // type: 'number',
    width: 110,
  },
  {
    field: 'typeEstimate',
    headerName: 'Tipo Orçamento',
    headerClassName: 'super-app-theme--header',
    // type: 'number',
    width: 120,
  },
  {
    field: 'totalDiscount',
    headerName: 'Tipo Desconto',
    headerClassName: 'super-app-theme--header',
    // type: 'number',
    width: 110,
    align: 'center',
  },
  {
    field: 'total',
    headerName: 'Total Geral',
    headerClassName: 'super-app-theme--header',
    // type: 'number',
    width: 110,
    align: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Ação',
    headerClassName: 'super-app-theme--header',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const api = new apiCore()

export default function SignIn() {
  const [data, setData] = useState<ServiceSchedulesListProps[]>([])
  const [filterChecked, setFilterChecked] = useState<string[]>([
    'teste 1',
    'teste 2',
    'teste 3',
    'teste 4'
  ])
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      searchText: '',
    }
  });
  const { signIn } = useContext(AuthContext)

  const companyState = useSelector<AppState>(state => state.company)
  const dispatch = useDispatch<AppDispatch>()


  function handleSignIn(data: SignInDataProps) {
    
    
    signIn(data);
  }

  function handleChecked(checked: string[] | []) {
    setFilterChecked(checked)
      
    
  }

  useEffect(() => {
    api.get('/service-schedule?company_id=2&limit=1&page=1')
      .then((response) => {
        const resp = response.data.data
        setData(resp.map((data: any) => ({
              id: data.id,
              client: data.client.name,  
              plate: data.client_vehicle.plate,
              chassis: data.client_vehicle.chasis,
              technical_consultant: data.technical_consultant.name,
              typeEstimate: 'não definido',
              totalDiscount: 0,
              total: 0
        })))

      })
  },[])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={3}>
              <Grid item xs={8} md={8} lg={8} sx={{display: 'flex', alignItems: 'center'}}>
              <Box sx={{flexWrap: "nowrap", display: 'flex', flex: 1}}>
                <TextField
                  label="Procura"
                  id="outlined-size-small"
                  // defaultValue="Pro"
                  size="small"
                  sx={{flex: 1, width: '100%'}}
                />
        
                {/* <IconButton aria-label="search" color="primary" sx={{marginLeft: 1}}>
                  <SearchIcon />
                </IconButton> */}
                <ButtonIcon aria-label="search" color="primary" sx={{marginLeft: 1}}>
                  <SearchIcon />
                </ButtonIcon>
              </Box>
                <Box>
                  <MultipleSelectCheckmarks checkNames={filterChecked} handleChecked={handleChecked} />
                </Box>
              </Grid>
            <Grid item xs={12} md={4} lg={4} sx={{display: 'flex', flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}>
                <Button size="large" variant="contained" onClick={() => console.log('click')} sx={{ alignSelf: 'flex-end' }}>
                  Adicionar novo
                </Button>
              </Grid>
            </Grid>  
          </Paper>
        </Grid>
       
        

          <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
          
            <Box sx={{
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: '#1c4961',
                color: 'white',
                '& svg': {
                  color: 'white',
                }  
              },}}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  autoHeight
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  loading={false}
                  onRowClick={(id) => console.log(id)}
                  pageSizeOptions={[10]}
                  disableRowSelectionOnClick
                
                />
              </Box>
            </Paper>
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