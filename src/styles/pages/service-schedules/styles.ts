import { alpha, styled } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import { teal } from '@mui/material/colors';
import Button from '@mui/material/Button';


export const ButtonIcon = styled(IconButton)(({ theme }) => ({
  color: teal[50],
  background: teal[900],
  borderRadius: 4,
  '&:hover': {
    background: alpha(teal[900], 0.7)
  }
}))

export const ButtonAdd = styled(Button)(({ theme }) => ({
  color: teal[50],
  background: teal[900],
  borderRadius: 4,
  '&:hover': {
    background: alpha(teal[900], 0.7)
  }
}))