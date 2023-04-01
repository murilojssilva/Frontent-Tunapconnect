import dayjs, { Dayjs} from "dayjs";
import moment from "moment-timezone";

type formatDateTimezoneProps = {
  date: Date
}

export function formatDateTimezone(date: string): string {

  return moment.utc(date).tz("America/Sao_Paulo").format()
}

export function formatDatePresentation (date: string): string{
  return moment(date).format('DD/MM/YYYY')
}
export function formatDateTimePresentation(date: string): string{
  return moment(new Date(date)).format('DD/MM/YYYY HH:mm')
}