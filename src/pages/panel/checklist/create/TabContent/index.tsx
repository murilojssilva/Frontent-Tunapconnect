import { Button, Grid, IconButton, Stack, Typography } from '@mui/material'

import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import {
  // ButtonItemChecklist,
  GridItem,
  ImageUploadBadge,
  ImageUploadImg,
  InputContainer,
  InputLabelRow,
  InputText,
} from '../styles'
import { genereteInput } from './GenereteInputs'
import { StageDataProps } from './types'

type TabContentProps = {
  stageData: StageDataProps[]
  stageName: string
}

export function TabContent({ stageData, stageName }: TabContentProps) {
  console.log(stageData)

  const { control, register, handleSubmit } = useForm()
  useFieldArray({
    control,
    name: stageName,
  })

  function onSubmitData(data: FieldValues) {
    console.log(data)
  }

  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmitData)}>
      {stageData.map((item, index) => {
        return (
          <GridItem
            key={`${Math.random() * 20000}-${item.name}-${index}`}
            container
          >
            <Grid
              item
              xs={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingY: '8px',
                width: '100%',
              }}
              height="50px"
            >
              {genereteInput(
                item.rules.type,
                item.values,
                register,
                stageName,
                index,
              )}
            </Grid>
            <Grid
              item
              xs={4}
              alignItems="center"
              justifyContent="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingY: '8px',
              }}
              height="50px"
            >
              <Typography>{item.name}</Typography>
            </Grid>
            <Grid
              item
              xs={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingY: '8px',
              }}
              height="50px"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                size="small"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  {...register(`${stageName}.${index}.images`)}
                />
                <ImageUploadBadge
                  badgeContent={item.values?.images?.length}
                  color="warning"
                >
                  <ImageUploadImg />
                </ImageUploadBadge>
              </IconButton>
            </Grid>
            <Grid
              item
              xs={5}
              alignItems="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingY: '8px',
              }}
              height="50px"
            >
              <InputContainer>
                <InputLabelRow>Observação:</InputLabelRow>
                <InputText
                  placeholder="Anotações..."
                  size="small"
                  fullWidth
                  {...register(`${stageName}.${index}.observation`)}
                />
              </InputContainer>
            </Grid>
          </GridItem>
        )
      })}
      <Grid
        item
        xs={12}
        justifyContent="flex-end"
        sx={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Salvar
          </Button>
          <Button type="submit" variant="contained">
            Finalizar
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
