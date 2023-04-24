import { useEffect } from 'react'
import Container from '@mui/material/Container'

import { ApiCore } from '@/lib/api'
import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'

export default function ChecklistCreate() {
  const router = useRouter()
  const api = new ApiCore()

  useEffect(() => {
    async function createCheckListBase() {
      try {
        const modelChecklist = await api.get('/checklist_model/list/')
        // console.log(modelChecklist.data.data[0])
        console.log(router.query)
        const dataCreateChecklist = {
          company_id:
            router?.query?.companyId &&
            parseInt(router?.query?.companyId as string),
          brand_id: null,
          vehicle_id: null,
          model_id: null,
          vehicle_client_id: null,
          km: null,
          fuel: null,
          client_id: null,
          service_schedule_id: router?.query?.service_schedule_id
            ? parseInt(router?.query?.service_schedule_id as string)
            : null,
          checklist_model: 1,
          status: 'rascunho', // salvo // finalizado // rascunho
          stages: modelChecklist.data.data[0].stages,
        }

        console.log(dataCreateChecklist)
        if (modelChecklist.data.data.length > 0) {
          const createdDefault = await api.create(
            '/checklist',
            dataCreateChecklist,
          )
          await router.replace(
            `/${router?.query?.companyId}/checklist/create/${createdDefault?.data?.data?.id}`,
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    createCheckListBase()
  }, [])

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

ChecklistCreate.auth = true
