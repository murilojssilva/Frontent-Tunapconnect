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

import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useEffect, useLayoutEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, getCompanyRequest } from '@/redux';
import { useRouter } from 'next/router';
import { MainListItems, secondaryListItems } from './ListItems';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

interface DashboardContentProps {
  children: React.ReactNode
}

function DashboardContent({ children }: DashboardContentProps) {
  const [open, setOpen] = React.useState(true);
  const [companyName, setCompanyName] = useState<{name: string, cnpj: string}>()
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const router = useRouter()

  const companyState = useSelector<AppState>(state => state.company)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    
    setCompanyName({
      //@ts-ignore
      name: companyState?.company?.name,
      //@ts-ignore
      cnpj: companyState?.company?.cnpj || companyState?.company?.cpf
    })
  },[companyState])

  useEffect(() => {
    const companyLocalStorge = localStorage.getItem(process.env.NEXT_PUBLIC_APP_LOCALSTORAGE_NAME as string)

    const companyLocal = companyLocalStorge ? JSON.parse(companyLocalStorge) : ''
   

     
    if (companyLocalStorge) {
      const companyLocal = JSON.parse(companyLocalStorge)

      if (companyLocal.id) {
        dispatch(getCompanyRequest(companyLocal.id))
      }
      //@ts-ignore
    } else if (!companyState.company.cnpj || !companyLocalStorge) {
      router.push('/company')
      localStorage.removeItem(process.env.NEXT_PUBLIC_APP_LOCALSTORAGE_NAME as string)
    } 

  },[])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              color: 'white',
              backgroundColor:'#1C4961'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color='white'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {companyName?.name && `${companyName?.name} - ${companyName?.cnpj}`}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {children}
          {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
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
                    height: 240,
                  }}
                >
      
                </Paper>
              </Grid>
            </Grid>
              <Copyright sx={{ pt: 4 }} justifyContent="flex-end"/>  
          </Container> */}
        </Box>
      </Box>
    </>
  );
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
  return <DashboardContent>{children}</DashboardContent>;
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//   const session = await getSession(ctx)
// console.log(session)

//   if (!session?.user?.token) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {
//       result: ''
//     }, 
//   }
// }