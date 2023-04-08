import { DataGrid, gridClasses } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { alpha, styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'

const ODD_OPACITY = 0.2

export const TableDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  '& .MuiDataGrid-columnSeparator': {
    '& svg': {
      visibility: 'hidden',
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    // display: "none",
    marginBottom: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  '& .MuiDataGrid-virtualScroller': { marginTop: '0!important' },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),

        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}))

export const ButtonIcon = styled(IconButton)(({ theme }) => ({
  color: grey[600],
  background: grey[200],
  borderRadius: 3,
  '&:hover': {
    background: grey[400],
  },
}))
