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
import { ChecklistProps } from './TabContent/types'
import { StageDataProps } from '../types'

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
  const [data, setData] = useState<ChecklistProps>()
  const [stages, setStages] = useState<
    Array<{
      name: string
      itens: Array<any>
    }>
  >([])
  // const [stageData, setStageData] = useState([])

  // function handleCreateCheckList(data) {}
  function handleAddListCheckList(data: StageDataProps) {
    setData((prevState) => {
      return {
        ...prevState,
        stages: [...prevState?.stages, data],
      }
    })
  }

  const api = new ApiCore()
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    api.get('/checklist/25?company_id=2').then((response) => {
      const { data } = response.data
      // console.log(data)
      setData({
        ...data,
        stages: [],
      })
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
                    <TabContent
                      stageData={stage.itens}
                      stageName={stage.name}
                      handleAddListCheckList={handleAddListCheckList}
                    />
                  </TabPanel>
                )
              })}
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
