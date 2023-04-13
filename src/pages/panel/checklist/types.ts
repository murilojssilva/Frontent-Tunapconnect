export interface Rule {
  required: boolean
  type: string
}

export interface Image {
  id_image: number
  'url:image': string
}

export interface Comentario {
  comentario: string
}

export interface Apointment {
  x_position: number
  y_position: number
  doasjdosa: number
  type: string
}

export interface Values {
  apointments: Apointment[]
  comentarios: Comentario[]
  images: Image[]
}

export interface Value {
  value: any
  images?: Image[]
  options?: string[]
  label?: string
  values?: Values
  image: any
  date: any
  status?: string
}

export interface StageDataProps {
  name: string
  rules: Rule
  values: Value
}

export interface ChecklistProps {
  company_id: number
  brand_id: number | null
  vehicle_id: number | null
  model_id: number | null
  vehicle_client_id: number | null
  km: number | null
  fuel: any | null
  client_id: number | null
  service_schedule_id: number | null
  checklist_model: number | null
  stages: StageDataProps[] | []
}
