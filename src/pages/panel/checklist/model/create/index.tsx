import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch, { SwitchProps } from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import StarIcon from '@mui/icons-material/Star'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Container from '@mui/material/Container'

import { getSession } from 'next-auth/react'
import next, { GetServerSideProps } from 'next/types'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { apiCore } from '@/lib/api'
import IconButton from '@mui/material/IconButton'
import { Delete, EditLocation, Link } from '@mui/icons-material'

import { useRouter } from 'next/router'
import Title from '@/components/Title'

import Stack from '@mui/material/Stack'
import {
  Button,
  Divider,
  FormLabel,
  ListItemSecondaryAction,
  TextField,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const api = new apiCore()

export default function ServiceSchedulesCreate() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const router = useRouter()

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }
  const InputHeader = (props: any) => {
    // define style
    const style = {
      border: 'none',
      outline: 'none',
      fontSize: '20px',
    }
    const styleDiv = {
      position: 'relative',
      display: 'inline-block',
    }
    const styleLink = {
      position: 'absolute',
      top: '0',
      right: '0',
      color: '#000',
      textDecoration: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '0 10px',
      cursor: 'pointer',
    }

    return (
      //   @ts-ignore
      <div style={styleDiv}>
        <input
          type="text"
          style={style}
          defaultValue={props.title ? props.title : 'Sem título'}
          name="myInput"
        />
        <Link sx={styleLink} />
      </div>
    )
  }
  // OBJECT  { Stages : 'name" , value : [ {item_type: 'text', description: 'text' ,photo: 'url' , comment: 'text' , status: 'text' , rules: ''} ]}
  const [stages, setStages] = useState({
    checklist: 'A definir',
    value: [
      {
        stage: 'Etapa 1',
        value: [
          {
            item_type: 'text',
            description: 'text',
            photo: 'url',
            comment: 'text',
            status: 'text',
            rules: '',
          },
        ],
      },
    ],
  })

  const addNewStage = () => {
    const newStage = {
      stage: 'Etapa 2',
      value: [
        {
          item_type: 'text',
          description: 'text',
          photo: 'url',
          comment: 'text',
          status: 'text',
          rules: '',
        },
      ],
    }
    setStages({ ...stages, value: [...stages.value, newStage] })
  }
  const itemtypes = [
    {
      value: 'text',
      label: 'Texto',
    },
    {
      value: 'photo',
      label: 'Foto',
    },
    {
      value: 'video',
      label: 'Video',
    },
    {
      value: 'audio',
      label: 'Audio',
    },
    {
      value: 'file',
      label: 'Arquivo',
    },
    {
      value: 'visual_inspect',
      label: 'Inspeção Visual',
    },
    {
      value: 'selecao',
      label: 'Seleção',
    },
  ]
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }))

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm()
  const [stageLists, setStageLists] = useState([])

  const onSubmit = (data: any) => {
    data.stages = stages
    data.tipo = tipo
    data.regras = rulesList

    console.log(data)
    // parse to string regras
    data.regras = JSON.stringify(data.regras)

    const newStages = stages
    newStages.value[value].value.push(data)
    setStages(newStages)
    console.log(stages)
  }

  const [tipo, setTipo] = useState('')
  // const [descricao, setDescricao] = useState('')
  // const [foto, setFoto] = useState('')
  // const [comentario, setComentario] = useState('')
  // const [status, setStatus] = useState('')

  const [rulesList, setRulesList]: any = useState([])
  const regraref: any = useRef()
  function addRuleIntoList() {
    const newRule: any = {
      value: regraref.current.value,
    }
    setRulesList([...rulesList, newRule])
    regraref.current.value = ''
  }
  function removeRuleFromList(index: number) {
    const newList = rulesList.filter((item: any, i: number) => i !== index)
    setRulesList(newList)
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 12 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Stack direction="row">
            <Title>
              {' '}
              Checklist : <InputHeader title={stages.checklist} />
            </Title>
          </Stack>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Stack spacing={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  aria-label="visible arrows tabs example"
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      '&.Mui-disabled': { opacity: 0.3 },
                    },
                  }}
                >
                  {stages.value.map((stage, index) => (
                    <Tab
                      label={stage.stage}
                      key={index}
                      {...a11yProps(index)}
                    />
                  ))}

                  {/* <Tab label={<InputHeader />} /> */}
                  <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={(e) => addNewStage()}
                  >
                    Adicionar
                  </Button>
                </Tabs>

                {stages.value.map((stage, index) => (
                  <>
                    {console.log(stage, index)}
                    <TabPanel value={value} index={index}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <InputLabel
                                variant="standard"
                                htmlFor="uncontrolled-native"
                              >
                                Tipo
                              </InputLabel>
                              <NativeSelect
                                key="tipo"
                                // name="tipo" {...register("tipo")}
                                defaultValue={itemtypes[0].value}
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                inputProps={{
                                  name: 'age',
                                  id: 'uncontrolled-native',
                                }}
                              >
                                <option aria-label="None" value="" />
                                {itemtypes.map((itemtype, index) => (
                                  <option
                                    value={itemtype.value}
                                    key={index + itemtype.value}
                                  >
                                    {itemtype.label}
                                  </option>
                                ))}
                              </NativeSelect>
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                id="standard-basic"
                                key="descricao"
                                // @ts-ignore
                                name="descricao"
                                {...register('descricao')}
                                label="Observacao"
                                defaultValue="Description"
                                variant="standard"
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value="top"
                                    control={
                                      <AntSwitch
                                        // @ts-ignore
                                        name="foto"
                                        {...register('foto')}
                                        defaultChecked
                                        inputProps={{
                                          'aria-label': 'ant design',
                                        }}
                                      />
                                    }
                                    label="Fotos ?"
                                    labelPlacement="top"
                                  />
                                </FormGroup>
                              </Stack>
                            </Grid>
                            <Grid item xs={3}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value="top"
                                    control={
                                      <AntSwitch
                                        // @ts-ignore
                                        name="status"
                                        {...register('status')}
                                        defaultChecked
                                        inputProps={{
                                          'aria-label': 'ant design',
                                        }}
                                      />
                                    }
                                    label="Ativo ?"
                                    labelPlacement="top"
                                  />
                                </FormGroup>
                              </Stack>
                            </Grid>
                          </Grid>
                        </FormControl>

                        <Button
                          disabled={tipo != 'selecao'}
                          onClick={handleOpen}
                        >
                          Adicionar Regras
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              <TextField
                                key="regra"
                                inputRef={regraref}
                                id="standard-basic"
                                label="Observacao"
                                defaultValue="Description"
                                variant="standard"
                              />

                              <Button
                                variant="contained"
                                sx={{ ml: 2 }}
                                onClick={(e) => addRuleIntoList()}
                              >
                                Adicionar
                              </Button>
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              <List
                                sx={{
                                  width: '100%',
                                  maxWidth: 360,
                                  bgcolor: 'background.paper',
                                }}
                                aria-label="contacts"
                              >
                                {/*   @ts-ignore */}
                                {rulesList.map((rule, index) => (
                                  <ListItem
                                    key={index}
                                    secondaryAction={
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        <DeleteForeverIcon
                                          onClick={(e) =>
                                            removeRuleFromList(index)
                                          }
                                        />
                                      </IconButton>
                                    }
                                  >
                                    <ListItemText primary={rule.value} />
                                  </ListItem>
                                ))}
                              </List>
                            </Typography>
                          </Box>
                        </Modal>
                        <Button type="submit">Salvar</Button>
                      </form>
                      <table>
                        <thead>
                          <tr>
                            <td> Tipo</td>
                            <td> Descriao</td>
                            <td> Foto</td>
                            <td> Status</td>
                            <td> Regras</td>
                            <td> Actions</td>
                          </tr>
                        </thead>
                        <tbody>
                          {stages.value[index].value?.length > 0 &&
                            stages.value[index].value?.map(
                              (stageList, index) => (
                                <tr key={index}>
                                  {/*   @ts-ignore */}
                                  <td>{stageList.tipo}</td>
                                  {/*   @ts-ignore */}
                                  <td>{stageList.descricao}</td>
                                  {/*   @ts-ignore */}
                                  <td>{stageList.foto}</td>
                                  <td>{stageList.status}</td>
                                  {/*   @ts-ignore */}
                                  <td>{stageList.regras}</td>
                                  <td>
                                    <Button variant="contained">Remover</Button>
                                  </td>
                                </tr>
                              ),
                            )}
                        </tbody>
                      </table>
                    </TabPanel>
                  </>
                ))}
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
    // c
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session?.user?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
