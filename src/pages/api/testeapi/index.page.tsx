import { ApiCore } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function Testeapi() {
  const [resposta, setResposta] = useState('')
  const api = new ApiCore()
  useEffect(() => {
    api
      .get(`/service-schedule?company_id=${'1'}&limit=2&page=2`)
      .then((response: any) => {
        const resp = response.data.data.map((data: any) => ({
          id: data?.id ?? 'Não informado',
          client: data?.client?.name ?? 'Não informado',
          plate: data?.client_vehicle?.plate ?? 'Não informado',
          chassis: data?.client_vehicle?.chasis ?? 'Não informado',
          technical_consultant:
            data?.technical_consultant?.name ?? 'Não informado',
          typeEstimate: 'não definido',
          totalDiscount: 0,
          total: 0,
        }))
        setResposta(resp)
      })
  }, [])
  return (
    <div>
      <pre>{resposta}</pre>
    </div>
  )
}
