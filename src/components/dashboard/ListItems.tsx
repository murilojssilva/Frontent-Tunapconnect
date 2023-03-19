import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { signOut} from 'next-auth/react';


export const MainListItems = () => {
  
  
  return (
  <React.Fragment>
    <ListItemButton style={{background: ' rgba(85,107,214)'}}>
      <ListItemIcon>
        <DashboardIcon style={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Empresas" style={{color: 'white'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccessTimeFilledOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Agendamento" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MonetizationOnOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Orçamentos" />
    </ListItemButton>
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