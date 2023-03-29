import * as React from 'react';
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from 'react';

import Container from '@mui/material/Container';

import { GridColDef, GridRenderCellParams, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid';


import { getSession } from 'next-auth/react';
import next, { GetServerSideProps } from 'next/types';


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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '@/redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

type SearchFormProps = {
  search: string
}

type PagesProps = {
  search: string
}

const api = new apiCore()


export default function ServiceSchedulesCreate() {
  const [rows, setRows] = useState<ServiceSchedulesListProps[]>([])
  const [pages, setPages] = useState<{current: number, next: boolean, previous: boolean}>({current: 1, next: false, previous: false})
  // const [filterChecked, setFilterChecked] = useState<string[]>([
  //   'teste 1',
  //   'teste 2',
  //   'teste 3',
  //   'teste 4'
  // ])

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
    console.log('func handlePages', nextPage)
  }

  useEffect(() => {
      api.get(`/service-schedule?company_id=${2}&limit=2&page=2`)
        .then((response) => {
          console.log(response.data);
          // setPages(prevState => {
          //   const {total_results, total_pages, current_page } = response.data
   
              
          //   return {
          //     current: response.data.current, 
          //     next: response.data.total_results > response.data.total_pages
          //   }
          // })
          const resp = response.data.data
          setRows(resp.map((data: any) => ({
            id: data.id,
            client: data.client.name,  
            plate: data.client_vehicle.plate,
            chassis: data.client_vehicle.chasis,
            technical_consultant: data.technical_consultant.name,
            typeEstimate: 'não definido',
            totalDiscount: 0,
            total: 0
          })))
  
        }).catch((err) => { 
          setRows([])
        })
    
  },[])

  useEffect(() => {

      api.get(`/service-schedule?company_id=${2}&limit=2&page=2`, router.query)
      .then((response) => {
        // console.log(response);
        const resp = response.data.data
        setRows(resp.map((data: any) => ({
          id: data.id,
          client: data.client.name,  
          plate: data.client_vehicle.plate,
          chassis: data.client_vehicle.chasis,
          technical_consultant: data.technical_consultant.name,
          typeEstimate: 'não definido',
          totalDiscount: 0,
          total: 0
        })))
      }).catch((error) => { 
        setRows([])
      })
  }, [router.query])


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Stack direction='row'>
            <Title>Agenda de Serviços</Title>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
           <Stack spacing={3}>
                <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                      }}
                    >
              </Paper>
              <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    
            </Paper>
            </Stack>
          </Grid>
        
        <Grid item xs={12} md={5} lg={5}>
            <Stack spacing={2}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
                    
              </Paper>
            </Stack>
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