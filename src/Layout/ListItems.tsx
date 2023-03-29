import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { signOut} from 'next-auth/react';
import { useRouter } from 'next/router';

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { ListItemButton } from './styles';

const routerMenu = [
  {
    name: 'company',
    path: '/company',
    children: [],
  }
]

type memuListProps = Array<{
  path: string
  href: string
  component: React.ReactNode
  title: string
}>

const memuList:memuListProps = [
  {
    path:'/company',
    href: '/company',
    component: <DashboardIcon />,
    title: 'Empresas'
  },
  {
    path: '/service-schedules',
    href: '/service-schedules/list',
    component: <AccessTimeFilledOutlinedIcon />,
    title: 'Agendamento'
  },
]


export const MainListItems = () => {
  const [routeActual, setRouteActual] = useState('')
  const router = useRouter()

  console.log('menu', router.pathname.includes('/service-schedules'))

  useEffect(() => {
    setRouteActual(router.pathname)
  },[router])

  return (
    <React.Fragment>
      
      {memuList.map((menu,index )=> {
        return (
          <Link href={menu.href} key={index} style={{textDecoration: 'none'}}>
            <ListItemButton selected={routeActual.includes(menu.path)}>
              <ListItemIcon>
                {menu.component}
              </ListItemIcon>
              <ListItemText primary={menu.title} style={{color: 'white'}}/>
            </ListItemButton>
          </Link>
        )
      })}
    {/* <Link href='/company'>
      <ListItemButton style={{background: 'rgba(85,107,214)'}}>
        <ListItemIcon>
          <DashboardIcon style={{color: 'white'}}/>
        </ListItemIcon>
        <ListItemText primary="Empresas" style={{color: 'white'}}/>
      </ListItemButton>
    </Link>
    <Link href='/service-schedules/list'>
      <ListItemButton>
        <ListItemIcon>
          <AccessTimeFilledOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Agendamento" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <MonetizationOnOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Orçamentos" />
    </ListItemButton> */}
  </React.Fragment>
)};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>

    </ListSubheader>
    <ListItemButton  onClick={() => signOut({ callbackUrl: '/' })}>
      <ListItemIcon>
        <ExitToAppOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Sair"/>
    </ListItemButton>
  </React.Fragment>
);