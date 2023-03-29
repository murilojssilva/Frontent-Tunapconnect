import * as React from 'react';

import { GridSlotsComponentsProps } from '@mui/x-data-grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import { ButtonIcon } from './styles';

type FooterStatus = 'connected' | 'disconnected';

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    status: FooterStatus;
  }
}

interface CustomFooterStatusComponentProps extends GridSlotsComponentsProps {
  handlePreviouPage: () => void;
  handleNextPage: () => void;
}

export function CustomFooterStatusComponent(
  props: NonNullable<GridSlotsComponentsProps['footer']>,
) {
  return (
    <Stack direction='row' spacing={2} alignItems="center" justifyContent='center' sx={{ marginTop: 2, }}>
        <ButtonIcon aria-label="back" onClick={() => console.log('back')} >
          <ArrowBackIosNewIcon color='inherit' />
        </ButtonIcon>
        <ButtonIcon aria-label="next" onClick={() => console.log('next')} >
          <ArrowForwardIosIcon color='inherit'  />
        </ButtonIcon>
    
    </Stack>
  );
}

