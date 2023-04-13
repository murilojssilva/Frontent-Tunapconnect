import { MenuItem, Switch, TextField } from '@mui/material'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Value } from '../types'
import { ButtonItemChecklist } from './styles'

type registerInputProps = {
  register: UseFormRegister<FieldValues>
  nameRegister: string
  indexRegister: number
}

type InputButtonProps = {
  labelName: string
  register: UseFormRegister<FieldValues>
  nameRegister: string
  indexRegister: number
}
type InputSelectProps = {
  opts: string[] | []
  register: UseFormRegister<FieldValues>
  nameRegister: string
  indexRegister: number
}

function InputButton({ labelName }: InputButtonProps) {
  return (
    <ButtonItemChecklist color="primary" size="small" variant="contained">
      {labelName}
    </ButtonItemChecklist>
  )
}
function InputSwitch({
  register,
  nameRegister,
  indexRegister,
}: registerInputProps) {
  return (
    <Switch
      defaultChecked={false}
      {...register(`${nameRegister}.${indexRegister}.col-1-boolean`)}
    />
  )
}
function InputText({
  register,
  nameRegister,
  indexRegister,
}: registerInputProps) {
  return (
    <TextField
      type="text"
      fullWidth
      size="small"
      {...register(`${nameRegister}.${indexRegister}.col-1-text`)}
    />
  )
}
function InputNumber({
  register,
  nameRegister,
  indexRegister,
}: registerInputProps) {
  return (
    <TextField
      type="number"
      fullWidth
      size="small"
      {...register(`${nameRegister}.${indexRegister}.col-1-number`)}
    />
  )
}
function InputSelect({
  opts,
  indexRegister,
  nameRegister,
  register,
}: InputSelectProps) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      defaultValue=""
      {...register(`${nameRegister}.${indexRegister}.col-1-select`)}
    >
      {opts.map((option, index) => (
        <MenuItem key={Math.random() * 20000 + index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

export function genereteInput(
  type: string,
  itemValues: Value,
  register: UseFormRegister<FieldValues>,
  nameRegister: string,
  indexRegister: number,
) {
  const optionsSelect = itemValues ? itemValues?.options : []

  switch (type) {
    case 'number':
      return (
        <InputNumber
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
        />
      )
    case 'text':
      return (
        <InputText
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
        />
      )
    case 'select':
      return (
        <InputSelect
          opts={optionsSelect || []}
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
        />
      )
    case 'boolean':
      return (
        <InputSwitch
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
        />
      )
    case 'visual_inspect':
      return (
        <InputButton
          labelName="inspeção"
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
        />
      )
    case 'signature':
      return (
        <InputButton
          labelName={'assinatura'}
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
        />
      )

    default:
      return null
  }
}
