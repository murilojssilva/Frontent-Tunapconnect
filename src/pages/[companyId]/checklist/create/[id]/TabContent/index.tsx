import { IconButton, Typography } from '@mui/material'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

import { FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form'
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

type ImageListProps = Array<{
  id: number
  images: {
    id: number
    name: string
    url: string
    size: string
  }[]
}>

type OpenModalImage = {
  id: number | null
  open: boolean
}

export function TabContent({
  stageData,
  stageName,
  stageItems,
  formIDSubmit,
  handleAddListCheckList,
  isClosed,
  checklistModel,
}: TabContentProps) {
  const [openModalImage, setOpenModalImage] = useState<OpenModalImage>({
    id: null,
    open: false,
  })
  const [listImage, setListImage] = useState<ImageListProps>([])
  // const [stageValues, setStageValues] = useState<FieldValues | []>([])
  // const [count, setCount] = useState()

  const defaultValues = {
    [stageName]: stageData?.itens.map((item, index) => {
      if (item.rules.type === 'select') {
        return {
          inputs: item.values.value ?? '-',
          observation: item.comment,
        }
      }
      if (item.rules.type === 'visual_inspect') {
        return {
          observation: item.comment,
        }
      }
      return { inputs: item.values.value, observation: item.comment }
    }),
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  })
  const { update } = useFieldArray({
    control,
    name: stageName,
  })

  const stageValuesWatch = useWatch({
    name: stageName,
    control,
  })

  // console.log('dirtyFields', dirtyFields)
  // console.log(checklistModel)

  function handleAddImageInListImage(
    index: number,
    image: {
      id: number
      name: string
      url: string
      size: string
    },
  ) {
    setListImage((prevState) => {
      const findImage = prevState.findIndex((img) => img.id === index)
      const newData = [...prevState]

      if (findImage >= 0) {
        newData[findImage].images.push(image)
        return newData
      }

      return [
        ...newData,
        {
          id: index,
          images: [image],
        },
      ]
    })
  }

  function handleRemoveImageInListImage(index: number, imageId: number) {
    console.log(index)
    const findIndexListImage = listImage.findIndex((item) => item.id === index)
    console.log(listImage[findIndexListImage])
    setListImage((prevState) => {
      const newListImage = [...prevState]
      newListImage[findIndexListImage].images = newListImage[
        findIndexListImage
      ].images.filter((image) => image.id !== imageId)

      return newListImage
    })
  }

  function onSubmitData(data: { [key: string]: StageFormData[] }) {
    const dataFormatted = {
      ...stageData,
      status: 'closed',
      itens: stageItems.map((item, index) => {
        console.log(!!listImage[index]?.id)
        return {
          ...item,
          comment: data[stageName][index]?.observation,
          values: {
            ...item.values,
            images: listImage[index]?.id ? listImage[index].images : [],
            value: data[stageName][index]?.inputs,
          },
        }
      }),
    }

    handleAddListCheckList(dataFormatted as StagesDataProps)
    console.log(dataFormatted)
  }

  function closeModalImage() {
    setOpenModalImage({ id: null, open: false })
  }

  function getBagdeAmountImages(index: number) {
    const imgs = listImage.filter((image) => image.id === index)[0]
    return imgs?.images.length ?? 0
  }

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(
      `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${checklistModel?.id}`,
    )

    const data = sessionStorageData ? JSON.parse(sessionStorageData) : null

    if (data && Object.hasOwn(data, stageName)) {
      console.log('entrou')
      data[stageName].forEach((item: any, index: number) => {
        update(index, { inputs: item.inputs, observation: item.observation })
      })
    }
  }, [])

  useEffect(() => {
    console.log('render')
    console.log('isDirty', isDirty)
    if (isDirty) {
      const sessionStorageData = sessionStorage.getItem(
        `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${checklistModel?.id}`,
      )
      const data = sessionStorageData ? JSON.parse(sessionStorageData) : null

      if (data) {
        sessionStorage.setItem(
          `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${checklistModel?.id}`,
          JSON.stringify({
            ...data,
            [stageName]: stageValuesWatch,
          }),
        )
      } else {
        sessionStorage.setItem(
          `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${checklistModel?.id}`,
          JSON.stringify({
            ...data,
            [stageName]: stageValuesWatch,
          }),
        )
      }
    }
  }, [stageValuesWatch])

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
                      {item?.rules?.type !== 'visual_inspect' && (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          size="small"
                          disabled={isClosed}
                          onClick={() => {
                            setOpenModalImage({
                              id: index,
                              open: true,
                            })
                          }}
                        >
                          <ImageUploadBadge
                            badgeContent={getBagdeAmountImages(index) ?? ''}
                            color="warning"
                          >
                            <ImageUploadImg />
                          </ImageUploadBadge>
                        </IconButton>
                      )}
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
        handleAddImageInListImage={handleAddImageInListImage}
        handleRemoveImageInListImage={handleRemoveImageInListImage}
        listImage={listImage}
      />
    </>
  )
}
