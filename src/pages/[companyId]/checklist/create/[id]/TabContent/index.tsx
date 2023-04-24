import { IconButton, Typography } from '@mui/material'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

import { useFieldArray, useForm } from 'react-hook-form'
import {
  Itens,
  ReponseGetCheckList,
  StageFormData,
  StagesDataProps,
} from '../../../types'
import {
  // ButtonItemChecklist,
  ImageUploadBadge,
  ImageUploadImg,
  InputContainer,
  InputLabelRow,
  InputText,
} from '../styles'
import { genereteInput } from './GenereteInputs'
import ModalImages from './ModalImages'

type TabContentProps = {
  stageData: StagesDataProps | undefined
  checklistModel: ReponseGetCheckList | undefined
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
  const [openModalImage, setOpenModalImage] = useState(false)
  // const [listImage, setListImage] = useState<
  //   Array<{ id: number; images: string[] }>
  // >([])

  const { control, register, handleSubmit } = useForm()
  const { update } = useFieldArray({
    control,
    name: stageName,
  })

  // function handleListImage(index: number, url: string) {
  //   setListImage((prevState) => {
  //     const findImage = prevState.findIndex((image) => image.id === index)
  //     return [...prevState]
  //   })
  // }

  function onSubmitData(data: { [key: string]: StageFormData[] }) {
    const dataFormatted = {
      ...stageData,
      status: 'closed',
      itens: stageItems.map((item, index) => {
        return {
          ...item,
          comment: data[stageName][index]?.observation,
          values: {
            ...item.values,
            value: data[stageName][index]?.inputs,
          },
        }
      }),
    }

    handleAddListCheckList(dataFormatted as StagesDataProps)
    // console.log(dataFormatted)
  }

  function closeModalImage() {
    setOpenModalImage(false)
  }

  useEffect(() => {
    stageData?.itens.forEach((item, index) => {
      if (item.rules.type === 'boolean') {
        update(index, { inputs: item.values.value, observation: item.comment })
      }
      if (item.rules.type === 'select') {
        update(index, {
          inputs: item.values.value ?? '-',
          observation: item.comment,
        })
      }
    })
  }, [stageData?.itens])

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
                        control,
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
                        onClick={() => setOpenModalImage(true)}
                      >
                        {/* <input
                          hidden
                          accept="image/*"
                          type="file"
                          {...register(`${stageName}.${index}.images`)}
                        /> */}
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
      <ModalImages
        isOpen={openModalImage}
        closeModalImage={closeModalImage}
        // handleListImage={handleListImage}
      />
    </>
  )
}
