import * as React from 'react';
import { useForm } from "react-hook-form";
import { useContext, useEffect, useMemo, useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { DataGrid, GridApi, GridColDef, GridRenderCellParams, GridValueGetterParams,GridKeyValue, useGridApiRef } from '@mui/x-data-grid';


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
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import ActionAlerts from '@/components/ActionAlerts';
import { ActionDeleteConfirmations } from '@/helpers/ActionConfirmations';
import { useRouter } from 'next/router';
import { TableDataGrid } from './styles';
import { Stack } from '@mui/material';
import { maxWidth } from '@mui/system';
import { CustomNoRowsOverlay } from './NoRows';
import { CustomFooterStatusComponent } from './FooterPaginate';

type SignInDataProps = {
  username: string
  password: string
}

interface TableAppProps {
  columns: GridColDef[]
  rowsData: ServiceSchedulesListProps[]
  handlePages: (nextPage: string) => void
  pages:{current: number, next: boolean, previous: boolean}
}

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    handlePages: (nextPage: string) => void
    nextPage: boolean
    previousPage: boolean
  }
}

export function TableApp({columns, rowsData, handlePages, pages}: TableAppProps) {
  const [rows, setRows] = useState<ServiceSchedulesListProps[]>([])

  // const [filterChecked, setFilterChecked] = useState<string[]>([
  //   'teste 1',
  //   'teste 2',
  //   'teste 3',
  //   'teste 4'
  // ])

  const router = useRouter()

  const apiRef = useGridApiRef();


  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id))
  }



  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      searchText: '',
    }
  });



  // function handleChecked(checked: string[] | []) {
  //   setFilterChecked(checked)
      
    
  // }

  useEffect(() => { 
    setRows(rowsData)
  },[rowsData])

  return (
    <>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop: 9 }}>
                
            <Box sx={{
              width: '100%',
              marginTop: '-105px',
          
          '& .super-app-theme--header': {
                border: 'none',
                backgroundColor: '#1c4961',
                color: 'white',
              },
              
              
            }}>
                <TableDataGrid
                  rows={rows}
                  columns={columns}
                  autoHeight
                  columnHeaderHeight={70}
                  disableColumnMenu
                  slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                    footer: CustomFooterStatusComponent
                  }}
                  slotProps={{
                    footer: { nextPage: pages?.next, previousPage: pages?.previous, handlePages } 
                  }}
                  apiRef={apiRef}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 7,
                        },
                      },
                    }}
                    loading={rows.length === 0}
                    onRowClick={(id) => {
                    router.push(`/service-schedules/${id.id}`)
                  }}
                pageSizeOptions={[7]}
                disableRowSelectionOnClick
                disableColumnFilter
                getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                />
              </Box>
      </Paper>  
      </>
  );
}