import * as React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

// import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import { useEffect, useState } from 'react'
import { ListItemButton } from './styles'
import { parseCookies } from 'nookies'

type memuListProps = Array<{
  path: string
  href: string
  component: React.ReactNode
  title: string
}>

export const MainListItems = ({ opended }: { opended: boolean }) => {
  const [routeActual, setRouteActual] = useState('')
  const router = useRouter()

  let contexto: any = {}
  const cookies = parseCookies()
  //   JSON.parse(
  //   cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
  // ),

  if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
    contexto = JSON.parse(
      cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
    )
    console.log('entrou')
  }

  console.log(contexto)
  console.log(contexto.empresaSelecionada)

  const memuList: memuListProps = [
    {
      path: '/company',
      href: '/company',
      component: <AccountBalanceIcon />,
      title: 'Empresas',
    },
    {
      path: '/service-schedule',
      href: `/service-schedule?company_id=${contexto.empresaSelecionada}`,
      component: <CalendarMonthIcon />,
      title: 'Agendamento',
    },
    // {
    //   path: '/checklist',
    //   href: '/checklist/create',
    //   component: <AccessTimeFilledOutlinedIcon />,
    //   title: 'Checklist',
    // },
  ]
  // console.log('aberto',opended)

  /* const menuListCompanyId = () =>
    memuList.map((item) => {
      return item.path === '/company'
        ? item
        : {
            ...item,
            href:
              item.path === '/checklist'
                ? companyId
                  ? `/${item.href}/${companyId}`
                  : ''
                : `/${item.href}?company=${companyId}`,
          }
    }) */

  useEffect(() => {
    setRouteActual(router.pathname)
  }, [router])

  return (
    <React.Fragment>
      {memuList.map((menu: any) => {
        return (
          /* <Link href={menu.href} key={index} style={{ textDecoration: 'none' }}>
            <ListItemButton
              selected={routeActual.includes(menu.path)}
              sx={{
                ...(opended && { margin: '10px 20px' }),
              }}
            >
              <ListItemIcon>{menu.component}</ListItemIcon>
              <ListItemText primary={menu.title} style={{ color: 'white' }} />
            </ListItemButton>
            </Link> */
          <ListItemButton
            key={menu.path}
            onClick={
              menu.path === '/service-schedule'
                ? () => router.push(menu.href).then(() => router.reload())
                : menu.path === '/checklist'
                ? cookies
                  ? () => router.push(menu.href)
                  : () => router.push('/company')
                : () => router.push(menu.href)
            }
            selected={routeActual.includes(menu.path)}
            sx={{
              ...(opended && { margin: '10px 20px' }),
            }}
          >
            <ListItemIcon>{menu.component}</ListItemIcon>
            <ListItemText primary={menu.title} style={{ color: 'white' }} />
          </ListItemButton>
        )
      })}
    </React.Fragment>
  )
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset></ListSubheader>
    <ListItemButton onClick={() => signOut({ callbackUrl: '/' })}>
      <ListItemIcon>
        <ExitToAppOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
)
