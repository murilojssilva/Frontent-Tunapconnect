import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import { Button, Stack, Tabs, TextField, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

interface LabelButtonMarkupTypeProps {
  selectedActual: boolean
}

interface ClickableAreaProps {
  urlImg: string
}

export const TabsContainer = styled(Tabs)(({ theme }) => ({
  color: 'black',
  fontWeight: 'bold',
  background: '#d5d5d5',
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  textTransform: 'none',
  '& .Mui-selected': {
    background: '#93BE0F',
    color: '#FFFFFF',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffffff',
  },
}))

export const LabelButtonMarkupType = styled('label')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  '& > span': {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
}))

export const ButtonMarkupType = styled.button<LabelButtonMarkupTypeProps>`
  color: #707070;
  background: rgb(237, 234, 234, 0.7);
  width: 44px;
  height: 44px;
  font-size: 25px;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 25px;
  border: 3px solid ${(props) => (props.selectedActual ? '#93BE0F' : '#1acaba')};

  border-radius: 50%;
  padding: 0;
  &:hover {
    background: ${(props) => (props.selectedActual ? '#93BE0F' : '#1acaba')};
    color: #fff;
    cursor: pointer;
  }
`

export const ButtonMarkup = styled(ButtonBase)(({ theme }) => ({
  color: '#707070',
  background: 'rgb(237, 234, 234, 0.7)',
  width: '44px',
  height: '44px',
  fontSize: '25px',
  textTransforme: 'uppercase',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  lineHeight: '25px',
  border: '3px solid #93BE0F',

  borderRadius: '50%',
  padding: 0,
  '& > svg': {
    display: 'none',
  },
  textTransform: 'none',
  '&:hover': {
    border: '3px solid #f26960',
    color: '#f26960',
    '& > svg': {
      display: 'block',
    },
    '& > span': {
      display: 'none',
    },
    transition: `all .3s ease-in-out`,
  },
}))
export const MyButton = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#0E948B',
  borderRadius: 4,
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  flex: 1,
  textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
  },
}))
export const ButtonLeft = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#93BE0F',
  borderRadius: 0,
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  // padding: '5px 16px',
  flex: 1,
  textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
  },
}))
export const ButtonRight = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#93BE0F',
  borderRadius: 0,
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  // padding: '5px 16px',
  flex: 1,
  textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
  },
}))

export const ContainerInformation = styled(Stack)(({ theme }) => ({
  border: '1px solid #ACAAAA',
  borderRadius: 9,
  padding: 2,
  justifyContent: 'center',
}))
export const IconUpload = styled(FileUploadOutlinedIcon)(({ theme }) => ({
  fontSize: '16px',
}))
export const IconClose = styled(CloseOutlinedIcon)(({ theme }) => ({
  fontSize: '16px',
}))

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  textTransform: 'uppercase',
  display: 'flex',
}))

export const TextAreaField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: 6,
    fontSize: 10,
  },
}))

export const ClickableArea = styled('svg')<ClickableAreaProps>`
  width: 490px;
  height: 350px;
  // background: 'red';
  // position: 'relative';
  border: 1px solid #acaaaa;
  border-radius: 9px;
  overflow: 'hidden';
  // backgroundAttachment: 'fixed';
  // backgroundImage: 'url("/images/background-logo-login.svg")';
  background-repeat: 'no-repeat';
  background-position: 'center';
  background-size: '100% 100%';
  // backgroundSize: '100% 380px';
  background-image: url(${(props) => props.urlImg});
  '& *': {
    pointerevents: 'none';
  }
`
// export const ClickableArea = styled(Box)(({ theme }) => ({
//   width: '490px',
//   height: '350px',
//   // background: 'red',
//   // position: 'relative',
//   border: '1px solid #ACAAAA',
//   borderRadius: 9,
//   overflow: 'hidden',
//   // backgroundAttachment: 'fixed',
//   // backgroundImage: 'url("/images/background-logo-login.svg")',
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'center',
//   backgroundSize: '100% 100%',
//   // backgroundSize: '100% 380px',
//   backgroundImage: `url('/images/carros-inspect/carro-frente.svg')`,
//   '& *': {
//     pointerEvents: 'none',
//   },
// }))
