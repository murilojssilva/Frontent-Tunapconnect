import { ReactNode, SyntheticEvent, useContext, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { MyButton, TabItem, TabsContainer } from './styles'
import { TabContent } from './TabContent'
import { ApiCore } from '@/lib/api'
import { Skeleton, Stack } from '@mui/material'
import {
  ChecklistProps,
  ReponseGetCheckList,
  StagesDataProps,
} from '../../types'

import { CompanyContext } from '@/contexts/CompanyContext'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export default function ChecklistCreateById() {
  const [value, setValue] = useState(0)
  // const [checklistModel, setChecklistModel] = useState<ChecklistProps>()
  // const [stages, setStages] = useState<StagesDataProps[]>([])
  // const [stageSaved, setStageSaved] = useState<StagesDataProps[]>([])
  // const [stageData, setStageData] = useState([])
  const queryClient = useQueryClient()
  const api = new ApiCore()
  const { companyId } = useContext(CompanyContext)
  const router = useRouter()

  const updateChecklistmutations = useMutation({
    mutationFn: (newDataChecklist: ChecklistProps) => {
      return api
        .update(`/checklist/${router?.query?.id}`, newDataChecklist)
        .then((resp) => {
          console.log(resp.data.data)
          return resp.data.data[0]
        })
    },

    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['checklist-createByID'] })
      queryClient.setQueryData(['checklist-createByID'], data)
      queryClient.invalidateQueries({ queryKey: ['checklist-createByID'] })
      return data
    },
    onError: (err: any) => {
      console.log(err)
    },
  })

  const { data, isSuccess, isLoading } = useQuery<ReponseGetCheckList>({
    queryKey: ['checklist-createByID'],
    queryFn: () =>
      api
        .get(`/checklist/${router?.query?.id}?company_id=${companyId}`)
        .then((response) => {
          return response.data.data
        }),
    // refetchOnMount: 'always',
    // enabled: !!router?.query?.id,
  })
  async function handleAddListCheckList(stageData: StagesDataProps) {
    const dataForPost = {
      company_id: data?.company_id,
      brand_id: data?.brand_id,
      vehicle_id: data?.vehicle_id,
      model_id: data?.vehicle, // verificar
      vehicle_client_id: data?.vehicle_client_id,
      km: data?.km,
      fuel: data?.fuel,
      client_id: data?.client_id,
      service_schedule_id: data?.service_schedule_id,
      checklist_model: data?.checklist_model,
      status: 'salvo', // salvo // finalizado // rascunho
      stages: data?.stages.map((item) => {
        return item.name === stageData.name ? stageData : item
      }),
    }
    // const resp = await api.update('/checklist/21', dataForPost)
    // @ts-ignore
    updateChecklistmutations.mutate(dataForPost)
    // setStages((prevState) => {
    //   return prevState.map((item) => {
    //     return item.name === data.name ? data : item
    //   })
    // })
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // function getSavedStage(stages: StagesDataProps[], stageActual: string) {
  //   const isStage = stages.filter((stage) => stage.name === stageActual)
  //   return isStage[0]
  // }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 2 }}
        />
      </Container>
    )
  }

  if (isSuccess) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', pb: 1 }}
            >
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
                  {data?.stages?.length > 0 &&
                    data.stages.map((stage, index) => {
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
              {data?.stages?.length > 0 &&
                data.stages.map((stage, index) => {
                  return (
                    <TabPanel
                      key={`${Math.random() * 2000}-${stage.name}-${index}`}
                      value={value}
                      index={index}
                    >
                      <TabContent
                        stageItems={stage.itens}
                        stageData={stage}
                        checklistModel={data}
                        stageName={stage.name}
                        formIDSubmit={`form-${stage.name}-${index}`}
                        handleAddListCheckList={handleAddListCheckList}
                        isClosed={stage.status === 'closed' && false}
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
                <MyButton
                  type="submit"
                  variant="contained"
                  form={`form-${data?.stages[value].name ?? ''}-${value}`}
                >
                  Salvar
                </MyButton>
                <MyButton type="submit" variant="contained">
                  Finalizar
                </MyButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

ChecklistCreateById.auth = true
