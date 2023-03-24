import * as React from 'react';
import { useForm } from "react-hook-form";
import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


import { AuthContext } from '@/contexts/AuthContext';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, getCompaniesListRequest, getCompanyRequest } from '@/redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SignInDataProps = {
  username: string
  password: string
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function SignIn() {
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }} justifyContent="space-between" >
              <Box>
                <TextField
                  label="Procura"
                  id="outlined-size-small"
                  defaultValue="Small"
                  size="small"
                />
              </Box>
              <Box>
                <Button size="large" variant="contained" onClick={() => console.log('click')} sx={{alignSelf: 'flex-end'}}>
                  novo
                </Button>
              </Box>

              </Stack>
              <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
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