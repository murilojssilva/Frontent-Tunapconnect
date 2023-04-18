import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSidePropsContext } from 'next/types'
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
        console.log(modelChecklist.data.data[0])
        const dataCreateChecklist = {
          company_id: 1,
          brand_id: null,
          vehicle_id: null,
          model_id: null,
          vehicle_client_id: null,
          km: null,
          fuel: null,
          client_id: null,
          service_schedule_id: null,
          checklist_model: 1,
          stages: modelChecklist.data.data[0].stages,
        }
        if (modelChecklist.data.data.length > 0) {
          const createdDefault = await api.create(
            '/checklist',
            dataCreateChecklist,
          )
          await router.push(
            '/panel/checklist/create/' + createdDefault?.data?.dados?.id,
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
