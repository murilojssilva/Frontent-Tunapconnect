import Typography from '@mui/material/Typography'
import { TitleTypography } from './styles'

interface TitleProps {
  children?: React.ReactNode
}

export default function Title(props: TitleProps) {
  return (
    <TitleTypography variant="h6" gutterBottom>
      {props.children}
    </TitleTypography>
  )
}
