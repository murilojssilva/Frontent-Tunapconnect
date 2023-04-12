import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSidePropsContext } from 'next/types'
import { ReactNode, SyntheticEvent, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  ButtonItemChecklist,
  GridItem,
  ImageUploadBadge,
  InputContainer,
  InputLabelRow,
  InputText,
  TabItem,
  TabsContainer,
} from './styles'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from '@mui/material'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingY: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ServiceSchedulesList() {
  const [value, setValue] = useState(0)
  const [age, setAge] = useState('')

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TabsContainer
                value={value}
                onChange={handleChange}
                textColor="inherit"
                centered
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <TabItem label="Item One" {...a11yProps(0)} />
                <TabItem label="Item Two" {...a11yProps(1)} />
                <TabItem label="Item Three" {...a11yProps(2)} />
              </TabsContainer>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container>
                <Grid item xs={12}>
                  <GridItem container>
                    <Grid
                      item
                      xs={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                        width: '100%',
                      }}
                      height="50px"
                    >
                      <ButtonItemChecklist
                        color="primary"
                        size="small"
                        type="submit"
                        variant="contained"
                      >
                        Inspeção
                      </ButtonItemChecklist>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <Typography>Inspeção visual - TOYOTA</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        size="small"
                      >
                        <input hidden accept="image/*" type="file" />
                        <ImageUploadBadge badgeContent={4} color="warning">
                          <CropOriginalIcon />
                        </ImageUploadBadge>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      alignItems="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <InputContainer>
                        <InputLabelRow>Observação:</InputLabelRow>
                        <InputText
                          placeholder="Anotações..."
                          size="small"
                          fullWidth
                        />
                      </InputContainer>
                    </Grid>
                  </GridItem>
                  <GridItem container>
                    <Grid
                      item
                      xs={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                        width: '100%',
                      }}
                      height="50px"
                    >
                      <Switch defaultChecked />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <Typography>Cliente acompanha inspeção?</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        size="small"
                      >
                        <input hidden accept="image/*" type="file" />
                        <ImageUploadBadge badgeContent={2} color="warning">
                          <CropOriginalIcon />
                        </ImageUploadBadge>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      alignItems="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <InputContainer>
                        <InputLabelRow>Observação:</InputLabelRow>
                        <InputText
                          placeholder="Anotações..."
                          size="small"
                          fullWidth
                        />
                      </InputContainer>
                    </Grid>
                  </GridItem>
                  <GridItem container>
                    <Grid
                      item
                      xs={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                        width: '100%',
                      }}
                      height="50px"
                    >
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                          id="demo-select-small"
                          value={age}
                          displayEmpty
                          label="Reserva"
                          input={<OutlinedInput />}
                          onChange={handleChangeSelect}
                        >
                          <MenuItem value={10}>Reserva 1</MenuItem>
                          <MenuItem value={20}>Reserva 2</MenuItem>
                          <MenuItem value={30}>Reserva 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <Typography>Cliente acompanha inspeção?</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        size="small"
                      >
                        <input hidden accept="image/*" type="file" />
                        <ImageUploadBadge badgeContent={2} color="warning">
                          <CropOriginalIcon />
                        </ImageUploadBadge>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      alignItems="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingY: '8px',
                      }}
                      height="50px"
                    >
                      <InputContainer>
                        <InputLabelRow>Observação:</InputLabelRow>
                        <InputText
                          placeholder="Anotações..."
                          size="small"
                          fullWidth
                        />
                      </InputContainer>
                    </Grid>
                  </GridItem>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session?.user?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}

{
  /* <Grid item xs={3} sx={{ background: 'red' }}>
<ButtonItemChecklist>inspeção</ButtonItemChecklist>
</Grid>
<Grid
item
xs={4}
sx={{ background: 'red' }}
alignItems="center"
>
<p style={{ background: 'blue' }}>Inspeção visual - TOYOTA</p>
</Grid>
<Grid item xs={1} alignItems="center">
<CropOriginalIcon />
</Grid> */
}
