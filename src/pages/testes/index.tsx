import { PrintInspection } from "@/components/pages/servicesSchedule/PrintInspection";
import Print from "@/components/pages/servicesSchedule/PrintInspection/print";

export default function testes() {
  return (
    <PrintInspection checklistId={1} type='service-schedules' company={2} id={1} />
    // <Print checklistId={1} type='service-schedules' company={2} id={1} />
  )
}