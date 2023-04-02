import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')

type formatDateTimezoneProps = {
  date: Date
}

export function formatDateTimeTimezone(date: string): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ')
}

export function formatDate (date: string): string{
  return dayjs(date).format('DD/MM/YYYY')
}
export function formatDateTime(date: string): string{
  return dayjs(new Date(date)).format('DD/MM/YYYY HH:mm')
}