export interface Apointment {
  x_position: number
  y_position: number
  type: string
}

export interface Image {
  id_image: number
  'url:image': string
}

export interface Values {
  apointments: Apointment[]
  images: Image[]
}
export interface Value {
  value: string
  images?: Image[] | undefined
  label?: string | undefined
  values?: Values | undefined
  options?: string[] | undefined
}

export interface Rule {
  required: boolean
  type: string
}

export interface Itens {
  name: string
  comment?: string
  rules: Rule
  values: Value
}

export interface Rules {
  required: boolean
}

export interface Signature {
  name: string
  rules: Rules
  image: any[]
}

export interface StagesDataProps {
  name: string
  itens: Itens[]
  status: 'open' | 'closed'
  signatures?: Signature[] | undefined
}

export interface ChecklistProps {
  id: number
  name: string
  description: string
  active: boolean
  stages: StagesDataProps[]
  created_at: Date
  updated_at: Date
}

export interface StageFormData {
  images: any
  observation: string
  'col-1': boolean | string
}

// status: string;
//     itens: {
//         comment: string;
//         values: {
//             value: string | boolean;
//             images?: Image[] | undefined;
//             label?: string | undefined;
//             values?: Values | undefined;
//             options?: string[] | undefined;
//         };
//         name: string;
//         rules: Rule;
//     }[];
//     name?: string | undefined;
//     signatures?: Signature[] | undefined;
// }
