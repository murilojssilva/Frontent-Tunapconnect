import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, secondaryListItems } from '@/components/dashboard/ListItems'
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next/types';
import { apiCore } from '@/lib/api';
import { apiCoreClient } from '@/lib/apiClient';


export default function DashboardContent() {
  const [company,setCompany] = useState()
  // const session = useSession()
  
  const api = new apiCore()
  
  useEffect(() => {
    api.get('/company/2').then((response) => {
      console.log(response)
    })
    // api.get('/company/2')
  }, [])

  

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 180,
              }}
            >
  
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 180,
              }}
            >
  
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
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