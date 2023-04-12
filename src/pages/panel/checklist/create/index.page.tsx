import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSidePropsContext } from 'next/types'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { TabItem, TabsContainer } from './styles'
import { TabContent } from './TabContent'
import { ApiCore } from '@/lib/api'

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
  // const [data, setData] = useState([])
  const [stages, setStages] = useState<
    Array<{
      name: string
      itens: Array<any>
    }>
  >([])
  // const [stageData, setStageData] = useState([])

  const api = new ApiCore()
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    api.get('/checklist/25?company_id=2').then((response) => {
      const { data } = response.data
      // console.log(data)
      // setData(data.stages.name)
      setStages(data.stages)
    })
  }, [])

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
                {stages.length > 0 &&
                  stages.map((stage, index) => {
                    return (
                      <TabItem
                        key={stage.name + Math.random() * 2000}
                        label={stage.name}
                        {...a11yProps(index)}
                      />
                    )
                  })}
                {/* <TabItem label="Item One" {...a11yProps(0)} />
                <TabItem label="Item Two" {...a11yProps(1)} />
                <TabItem label="Item Three" {...a11yProps(2)} /> */}
              </TabsContainer>
            </Box>
            {stages.length > 0 &&
              stages.map((stage, index) => {
                return (
                  <TabPanel
                    key={`${Math.random() * 2000}-${stage.name}-${index}`}
                    value={value}
                    index={index}
                  >
                    <TabContent stageData={stage.itens} />
                  </TabPanel>
                )
              })}
            {/* <TabPanel value={value} index={0}>
              <Grid container>
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
                        <ImageUploadImg />
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
                        <ImageUploadImg />
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
                    <TextField select fullWidth size="small">
                      <MenuItem value={10}>Reserva 1</MenuItem>
                      <MenuItem value={20}>Reserva 2</MenuItem>
                      <MenuItem value={30}>Reserva 3</MenuItem>
                    </TextField>
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
                        <ImageUploadImg />
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
                    <TextField fullWidth size="small" />
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
                        <ImageUploadImg />
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TabContent stageData={stageData} />
            </TabPanel> */}
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
