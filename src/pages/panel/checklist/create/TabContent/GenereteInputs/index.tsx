import { MenuItem, Switch, TextField } from '@mui/material'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Value } from '../types'
import { ButtonItemChecklist } from './styles'

type InputButtonProps = {
  labelName: string
}
type InputSelectProps = {
  opts: string[] | []
}

function InputButton({ labelName }: InputButtonProps) {
  return (
    <ButtonItemChecklist color="primary" size="small" variant="contained">
      {labelName}
    </ButtonItemChecklist>
  )
}
function InputSwitch() {
  return <Switch defaultChecked={false} />
}
function InputText() {
  return <TextField type="text" fullWidth size="small" />
}
function InputNumber() {
  return <TextField type="number" fullWidth size="small" />
}
function InputSelect({ opts }: InputSelectProps) {
  console.log(opts)
  return (
    <TextField select fullWidth size="small" defaultValue="">
      {opts.map((option, index) => (
        <MenuItem key={Math.random() * 20000 + index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

export function genereteInput(
  name: string,
  type: string,
  itemValues?: Value,
  register?: UseFormRegister<FieldValues>,
) {
  const optionsSelect = itemValues ? itemValues?.options : []

  switch (type) {
    case 'number':
      return <InputNumber />
    case 'text':
      return <InputText />
    case 'select':
      return <InputSelect opts={optionsSelect || []} />
    case 'boolean':
      return <InputSwitch />
    case 'visual_inspect':
      return <InputButton labelName={name} />
    case 'signature':
      return <InputButton labelName={'assinatura'} />

    default:
      return null
  }
}
