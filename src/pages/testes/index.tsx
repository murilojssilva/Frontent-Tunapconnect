import { PrintInspection } from '../panel/service-schedules/components/PrintInspection'

export default function testes() {
  return (
    <PrintInspection
      checklistId={1}
      type="service-schedules"
      company={2}
      id={1}
    />
    // <Print checklistId={1} type='service-schedules' company={2} id={1} />
  )
}
