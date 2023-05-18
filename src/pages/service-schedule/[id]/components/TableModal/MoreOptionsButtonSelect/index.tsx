import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import Divider from "@mui/material/Divider";
// import { Settings } from "@mui/icons-material";
import { MoreOptionsButtonSelectProps } from './types'
import { MenuItemButton } from './styles'
import { useRouter } from 'next/router'

// const ITEM_HEIGHT = 38

export function MoreOptionsButtonSelect({
  disabledButton,
  checklistId,
}: MoreOptionsButtonSelectProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const router = useRouter()

<<<<<<< HEAD
=======

>>>>>>> 580c85f (Fix Context)
  const { companyId, id } = router.query

  console.log({ companyId, id })

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickEdit = () => {
    router.push(`/checklist/create/${checklistId}`)
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabledButton}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            p: '0 10px',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItemButton onClick={handleClickEdit}>Editar</MenuItemButton>
        <MenuItemButton onClick={handleClickEdit}>Visualizar</MenuItemButton>
        <MenuItemButton onClick={handleClickEdit}>Enviar</MenuItemButton>
        <MenuItemButton onClick={handleClickEdit}>Duplicar</MenuItemButton>
        <MenuItemButton onClick={handleClickEdit}>Imprimir</MenuItemButton>
      </Menu>
    </div>
  )
}
