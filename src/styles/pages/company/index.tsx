import styled from "@emotion/styled";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'

export const ContainerItem = styled(Paper)`
  transition: scale 0.5ms ease-in-out;
  &:hover{
    transform: scale(1.03);
    background-color: rgb(85, 107, 214, 0.5);
    cursor: pointer;

    color: white;

    h2 {
      color: white;
    }
  
  }

  h2:hover {
    color: white;
  }
  
`