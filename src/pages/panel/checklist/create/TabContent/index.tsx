import { IconButton, Typography } from '@mui/material'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import TableRow from '@mui/material/TableRow'

import { useFieldArray, useForm } from 'react-hook-form'
import {
  ChecklistProps,
  Itens,
  StageFormData,
  StagesDataProps,
} from '../../types'
import {
  // ButtonItemChecklist,
  ImageUploadBadge,
  ImageUploadImg,
  InputContainer,
  InputLabelRow,
  InputText,
} from '../styles'
import { genereteInput } from './GenereteInputs'

type TabContentProps = {
  stageData: StagesDataProps | undefined
  checklistModel: ChecklistProps | undefined
  stageName: string
  stageItems: Itens[]
  formIDSubmit: string
  isClosed: boolean
  handleAddListCheckList: (data: StagesDataProps) => void
}

export function TabContent({
  stageData,
  stageName,
  stageItems,
  formIDSubmit,
  handleAddListCheckList,
  isClosed,
}: TabContentProps) {
  const { control, register, handleSubmit } = useForm()
  useFieldArray({
    control,
    name: stageName,
  })

  function onSubmitData(data: { [key: string]: StageFormData[] }) {
    const dataFormatted = {
      ...stageData,
      status: 'closed',
      itens: stageItems.map((item, index) => {
        return {
          ...item,
          comment: data[stageName][index].observation,
          values: {
            ...item.values,
            value: data[stageName][index]['col-1'],
          },
        }
      }),
    }

    handleAddListCheckList(dataFormatted as StagesDataProps)
    // handleAddListCheckList({
    //   [stageName]: data[stageName].map((item, index) => {
    //     return item
    //   }),
    // })
    // console.log(data[stageName])
  }

  return (
    <>
      <TableContainer
        id={formIDSubmit}
        component="form"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableBody>
            {stageItems.length > 0 &&
              stageItems.map((item, index) => {
                return (
                  <TableRow
                    key={`${Math.random() * 20000}-${item.name}-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {genereteInput(
                        item.rules.type,
                        item.values,
                        register,
                        stageName,
                        index,
                        isClosed,
                      )}
                    </TableCell>
                    <TableCell>
                      {<Typography>{item.name}</Typography>}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        size="small"
                        disabled={isClosed}
                      >
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          {...register(`${stageName}.${index}.images`)}
                        />
                        <ImageUploadBadge
                          badgeContent={item?.values?.images?.length}
                          color="warning"
                        >
                          <ImageUploadImg />
                        </ImageUploadBadge>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <InputContainer>
                        <InputLabelRow>Observação:</InputLabelRow>
                        <InputText
                          placeholder="Anotações..."
                          size="small"
                          fullWidth
                          disabled={isClosed}
                          {...register(`${stageName}.${index}.observation`)}
                        />
                      </InputContainer>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
