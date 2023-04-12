import { Grid, IconButton, Typography } from '@mui/material'

// import { useFieldArray, useForm } from 'react-hook-form'
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
}

export function TabContent({ stageData }: TabContentProps) {
  // console.log(stageData)
  // const { control, register, handleSubmit } = useForm()
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
  //   {
  //     control, // control props comes from useForm (optional: if you are using FormContext)
  //     name: 'test', // unique name for your Field Array
  //   },
  // )

  return (
    <Grid
      container
      component="form"
      // onSubmit={handleSubmit((data) => console.log(data))}
    >
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
              {genereteInput(item.name, item.rules.type, item.values)}
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
                <input hidden accept="image/*" type="file" />
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
                <InputText placeholder="Anotações..." size="small" fullWidth />
              </InputContainer>
            </Grid>
          </GridItem>
        )
      })}
      {/* <GridItem container>
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
          <ButtonItemChecklist
            color="primary"
            size="small"
            type="submit"
            variant="contained"
          >
            Inspeção
          </ButtonItemChecklist>
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
          <Typography>Inspeção visual - TOYOTA</Typography>
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
            <input hidden accept="image/*" type="file" />
            <ImageUploadBadge badgeContent={4} color="warning">
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
            <InputText placeholder="Anotações..." size="small" fullWidth />
          </InputContainer>
        </Grid>
      </GridItem> */}
      {/* <GridItem container>
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
          <Switch defaultChecked />
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
          <Typography>Cliente acompanha inspeção?</Typography>
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
            <input hidden accept="image/*" type="file" />
            <ImageUploadBadge badgeContent={2} color="warning">
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
            <InputText placeholder="Anotações..." size="small" fullWidth />
          </InputContainer>
        </Grid>
      </GridItem>
      <GridItem container>
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
          <TextField select fullWidth size="small">
            <MenuItem value={10}>Reserva 1</MenuItem>
            <MenuItem value={20}>Reserva 2</MenuItem>
            <MenuItem value={30}>Reserva 3</MenuItem>
          </TextField>
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
          <Typography>Cliente acompanha inspeção?</Typography>
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
            <input hidden accept="image/*" type="file" />
            <ImageUploadBadge badgeContent={2} color="warning">
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
            <InputText placeholder="Anotações..." size="small" fullWidth />
          </InputContainer>
        </Grid>
      </GridItem>
      <GridItem container>
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
          <TextField fullWidth size="small" />
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
          <Typography>Cliente acompanha inspeção?</Typography>
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
            <input hidden accept="image/*" type="file" />
            <ImageUploadBadge badgeContent={2} color="warning">
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
            <InputText placeholder="Anotações..." size="small" fullWidth />
          </InputContainer>
        </Grid>
      </GridItem> */}
    </Grid>
  )
}
