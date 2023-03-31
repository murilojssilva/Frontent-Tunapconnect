import { alpha, styled } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import ListItemB from '@mui/material/ListItemButton';
import { colors } from '@mui/material';

const myColors = {
  background: '#1C4961',
  white: '#FFFFFF',

}

export const ListItemButton = styled(ListItemB)(({ theme }) => ({
  color: '#1C4961',
  background: '#ffff',
  margin: '10px 0px',
  borderRadius: 1,
  '& span': {
     color: '#1C4961',
  },
  '& svg': {
     color: '#1C4961',
  },
  '&:not(.Mui-selected):hover': {
    background: alpha('#1C4961', 0.2)
  },
  '&.Mui-selected': {
    background: alpha('#1C4961', 1),
    '& span': {
     color: '#fff',
    },
    '& svg': {
      color: '#fff',
    },
    '&:hover': {
      background: alpha('#1C4961', 0.9)
    },
  },
}))
