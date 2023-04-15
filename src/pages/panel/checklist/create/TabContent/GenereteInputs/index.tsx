import { MenuItem, Switch, TextField } from '@mui/material'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Value } from '../../../types'

import { ButtonItemChecklist } from './styles'

type registerInputProps = {
  register: UseFormRegister<FieldValues>
  nameRegister: string
  indexRegister: number
  isClosed: boolean
}

type InputButtonProps = {
  labelName: string
  register: UseFormRegister<FieldValues>
  nameRegister: string
  indexRegister: number
  isClosed: boolean
}
type InputSelectProps = {
  opts: string[] | []
  register: UseFormRegister<FieldValues>
  nameRegister: string
  indexRegister: number
  isClosed: boolean
}

function InputButton({ labelName, isClosed }: InputButtonProps) {
  return (
    <ButtonItemChecklist
      color="primary"
      size="small"
      variant="contained"
      disabled={isClosed}
    >
      {labelName}
    </ButtonItemChecklist>
  )
}
function InputSwitch({
  register,
  nameRegister,
  indexRegister,
  isClosed,
}: registerInputProps) {
  return (
    <Switch
      defaultChecked={false}
      disabled={isClosed}
      {...register(`${nameRegister}.${indexRegister}.col-1`)}
    />
  )
}
function InputText({
  register,
  nameRegister,
  indexRegister,
  isClosed,
}: registerInputProps) {
  return (
    <TextField
      type="text"
      fullWidth
      size="small"
      disabled={isClosed}
      {...register(`${nameRegister}.${indexRegister}.col-1`)}
    />
  )
}
function InputNumber({
  register,
  nameRegister,
  indexRegister,
  isClosed,
}: registerInputProps) {
  return (
    <TextField
      type="number"
      fullWidth
      size="small"
      disabled={isClosed}
      {...register(`${nameRegister}.${indexRegister}.col-1`)}
    />
  )
}
function InputSelect({
  opts,
  indexRegister,
  nameRegister,
  register,
  isClosed,
}: InputSelectProps) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      defaultValue=""
      disabled={isClosed}
      {...register(`${nameRegister}.${indexRegister}.col-1`)}
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
  isClosed: boolean,
) {
  const optionsSelect = itemValues ? itemValues?.options : []

  switch (type) {
    case 'number':
      return (
        <InputNumber
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      )
    case 'text':
      return (
        <InputText
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      )
    case 'select':
      return (
        <InputSelect
          opts={optionsSelect || []}
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      )
    case 'boolean':
      return (
        <InputSwitch
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      )
    case 'visual_inspect':
      return (
        <InputButton
          labelName="inspeção"
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      )
    case 'signature':
      return (
        <InputButton
          labelName={'assinatura'}
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      )

    default:
      return null
  }
}
