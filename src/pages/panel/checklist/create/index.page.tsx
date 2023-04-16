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
import { Button, Stack } from '@mui/material'
import { ChecklistProps, StagesDataProps } from '../types'

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
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function ChecklistCreate() {
  const [value, setValue] = useState(0)
  const [checklistModel, setChecklistModel] = useState<ChecklistProps>()
  const [stages, setStages] = useState<StagesDataProps[]>([])
  // const [stageSaved, setStageSaved] = useState<StagesDataProps[]>([])
  // const [stageData, setStageData] = useState([])

  // function handleCreateCheckList(data) {}
  function handleAddListCheckList(data: StagesDataProps) {
    // const dataForPost = {
    //   company_id: 1,
    //   brand_id: null,
    //   vehicle_id: null,
    //   model_id: null,
    //   vehicle_client_id: null,
    //   km: null,
    //   fuel: null,
    //   client_id: null,
    //   service_schedule_id: null,
    //   checklist_model: 1,
    //   stages: data,
    // }
    // console.log(dataForPost)
    // api.create('/checklist', dataForPost)

    setStages((prevState) => {
      return prevState.map((item) => {
        return item.name === data.name ? data : item
      })
    })
  }

  const api = new ApiCore()
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // function getSavedStage(stages: StagesDataProps[], stageActual: string) {
  //   const isStage = stages.filter((stage) => stage.name === stageActual)
  //   return isStage[0]
  // }

  useEffect(() => {
    api.get('/checklist_model/list/').then((response) => {
      const { data } = response.data
      console.log(data[0])
      setChecklistModel(data[0])
      setStages(data[0].stages)
    })
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', pb: 1 }}>
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
                    // const isDisabled =
                    //   getSavedStage(stages, stage.name)?.status === 'closed'
                    return (
                      <TabItem
                        key={stage.name + Math.random() * 2000}
                        label={stage.name}
                        {...a11yProps(index)}
                        // disabled={isDisabled}
                      />
                    )
                  })}
              </TabsContainer>
            </Box>
            {stages.length > 0 &&
              stages.map((stage, index) => {
                // console.log(getSavedStage(stages, stage.name))
                return (
                  <TabPanel
                    key={`${Math.random() * 2000}-${stage.name}-${index}`}
                    value={value}
                    index={index}
                  >
                    <TabContent
                      stageItems={stage.itens}
                      stageData={stage}
                      checklistModel={checklistModel}
                      stageName={stage.name}
                      formIDSubmit={`form-${stage.name}`}
                      handleAddListCheckList={handleAddListCheckList}
                      isClosed={stage.status === 'closed'}
                      // stageSaved={getSavedStage(stageSaved, stage.name)}
                    />
                  </TabPanel>
                )
              })}
          </Paper>
          <Grid
            item
            xs={12}
            justifyContent="flex-end"
            sx={{
              marginTop: 2,
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                form={`form-${stages[value]?.name || ''}`}
              >
                Salvar
              </Button>
              <Button type="submit" variant="contained">
                Finalizar
              </Button>
            </Stack>
          </Grid>
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
