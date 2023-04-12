// import * as React from 'react'
// import { useForm } from 'react-hook-form'
// import { useEffect, useMemo, useState } from 'react'
// import { useRouter } from 'next/router'
// import next, { GetServerSideProps } from 'next/types'
// import {
//   Badge,
//   Box,
//   Button,
//   Container,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Stack,
//   ToggleButtonGroup,
// } from '@mui/material'
// import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
// import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'
// import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
// import TextField from '@mui/material/TextField'
// import { styled } from '@mui/system'
// import TabsUnstyled from '@mui/base/TabsUnstyled'
// import TabsListUnstyled from '@mui/base/TabsListUnstyled'
// import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
// import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import { Photo } from '@mui/icons-material'
// import Switch, { SwitchProps } from '@mui/material/Switch'

// import Dialog from '@mui/material/Dialog'
// import ListItemText from '@mui/material/ListItemText'
// import ListItem from '@mui/material/ListItem'
// import List from '@mui/material/List'
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import CloseIcon from '@mui/icons-material/Close'
// import Slide from '@mui/material/Slide'
// import { TransitionProps } from '@mui/material/transitions'

// import SignatureCanvas from 'react-signature-canvas'

// import moment from 'moment'

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />
// })

// const blue = {
//   50: '#F0F7FF',
//   100: '#C2E0FF',
//   200: '#80BFFF',
//   300: '#66B2FF',
//   400: '#3399FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B2',
//   800: '#004C99',
//   900: '#003A75',
//   1000: '#1acbbf',
//   1100: '#5ec2b5',
//   1200: '#17a298',
// }

// const grey = {
//   50: '#f6f8fa',
//   100: '#eaeef2',
//   150: '#eeeeee',
//   200: '#d0d7de',
//   300: '#afb8c1',
//   400: '#8c959f',
//   500: '#6e7781',
//   600: '#57606a',
//   650: '#e9e9e9',
//   700: '#424a53',
//   800: '#32383f',
//   900: '#24292f',
// }

// const Tab = styled(TabUnstyled)`
//   font-family: IBM Plex Sans, sans-serif;
//   color: ${grey[400]};
//   cursor: pointer;
//   font-size: 1rem;
//   font-weight: bold;
//   background-color: ${grey[150]};
//   width: 6fr;
//   padding: 10px;
//   margin: 12px 20px 0px 20px;
//   display: flex;
//   justify-content: center;
//   border: 2px solid ${grey[650]};
//   border-radius: 6px 6px 0 0;
//   &:hover {
//   }

//   &:focus {
//     color: #fff;
//     outline: 3px solid ${blue[1000]};
//   }

//   &.${tabUnstyledClasses.selected} {
//     background-color: #fff;
//     color: ${blue[1200]};
//   }

//   &.${buttonUnstyledClasses.disabled} {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `

// const TabPanel = styled(TabPanelUnstyled)`
//   width: 100%;
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
// `

// const TabsList = styled(TabsListUnstyled)(
//   ({ theme }) => `
//   min-width: 400px;
//   border-bottom: 1px solid ${
//     theme.palette.mode === 'dark' ? grey[900] : grey[200]
//   };
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-content: space-between;
//   `,
// )

// const CustomButton = styled(ButtonUnstyled)`
//   font-family: IBM Plex Sans, sans-serif;
//   font-weight: bold;
//   font-size: 0.875rem;
//   background-color: ${blue[1200]};
//   padding: 12px 24px;
//   border-radius: 50px;
//   color: white;
//   transition: all 150ms ease;
//   cursor: pointer;
//   border: none;

//   &:hover {
//     background-color: ${blue[600]};
//   }

//   &.${buttonUnstyledClasses.active} {
//     background-color: ${blue[700]};
//   }

//   &.${buttonUnstyledClasses.focusVisible} {
//     box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px ${blue[1000]};
//     outline: none;
//   }

//   &.${buttonUnstyledClasses.disabled} {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `

// const AntSwitch = styled(Switch)(({ theme }) => ({
//   width: 28,
//   height: 16,
//   padding: 0,
//   display: 'flex',
//   '&:active': {
//     '& .MuiSwitch-thumb': {
//       width: 15,
//     },
//     '& .MuiSwitch-switchBase.Mui-checked': {
//       transform: 'translateX(9px)',
//     },
//   },
//   '& .MuiSwitch-switchBase': {
//     padding: 2,
//     '&.Mui-checked': {
//       transform: 'translateX(12px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor:
//           theme.palette.mode === 'dark' ? `${blue[1200]}` : `${blue[1200]}`,
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     transition: theme.transitions.create(['width'], {
//       duration: 200,
//     }),
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor:
//       theme.palette.mode === 'dark'
//         ? 'rgba(255,255,255,.35)'
//         : 'rgba(0,0,0,.25)',
//     boxSizing: 'border-box',
//   },
// }))
// export default function checklistCreate() {
//   const [open, setOpen] = React.useState(false)

//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const [stages, setStages] = React.useState<any>({
//     checklist: 'name',
//     stages: [
//       {
//         stage: 'Recepção',
//         tasks: [
//           {
//             type: 'signature',
//             description: 'Inspeção visual - Toyota',
//             images: ['image.png', 'img_ps.png'],
//             videos: [],
//             audios: [],
//             comments: [],
//           },
//           {
//             type: 'visual_inpect',
//             description: 'Inspeção visual - Toyota',
//             images: ['image.png', 'img_ps.png'],
//             videos: [],
//             audios: [],
//             comments: [],
//           },
//           {
//             type: 'checkbox',
//             description: 'Cliente Acompanha Inspeção',
//             images: ['image.png'],
//             videos: [],
//             audios: [],
//             comments: [],
//           },
//         ],
//       },
//       {
//         stage: 'Entrega',
//         tasks: [
//           {
//             type: 'select',
//             description: 'Combustivel',
//             images: ['image.png', 'img_ps.png'],
//             videos: [],
//             audios: [],
//             comments: [],
//             list: [
//               {
//                 label: '1/4',
//                 value: '1/4',
//               },
//               {
//                 label: '1/2',
//                 value: '1/2',
//               },
//               {
//                 label: '3/4',
//                 value: '3/4',
//               },
//             ],
//           },
//           {
//             type: 'visual_inpect',
//             description: 'Inspeção Visual',
//             images: ['image.png', 'img_ps.png'],
//             videos: [],
//             audios: [],
//             comments: [],
//           },
//         ],
//       },
//     ],
//   })

//   const HeaderBreadcrumbData: listBreadcrumb[] = [
//     {
//       label: 'Tunap',
//       href: '/company',
//     },
//     {
//       label: 'CheckList',
//       href: '/checklist/list',
//     },
//   ]
//   function returnCTA(type: string, list?: any) {
//     switch (type) {
//       case 'text':
//         return <CustomButton> Teste xpto</CustomButton>
//       case 'image':
//         return 'Imagem'
//       case 'video':
//         return 'Video'
//       case 'audio':
//         return 'Audio'
//       case 'comment':
//         return 'Comentário'
//       case 'signature':
//         return (
//           <CustomButton onClick={handleClickOpen}> Assinatura</CustomButton>
//         )
//       case 'checkbox':
//         return (
//           <div>
//             <AntSwitch
//               defaultChecked
//               inputProps={{ 'aria-label': 'ant design' }}
//             />
//           </div>
//         )
//       case 'select':
//         return (
//           <FormControl sx={{ m: 1, minWidth: 120 }}>
//             <Select
//               displayEmpty
//               id="demo-simple-select"
//               value="1/4"
//               label="Age"
//               inputProps={{ 'aria-label': 'Without label' }}
//             >
//               {list.map((item: any, index: any) => (
//                 <MenuItem value={item.value} key={index}>
//                   {item.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )
//       case 'visual_inpect':
//         return <CustomButton> Inspeção</CustomButton>
//     }
//   }
//   const [checklist, setChecklist] = useState<any>([])
//   const signatureWidth = () => {
//     let width = document.getElementById('signature')?.offsetWidth || 1000

//     if (width > 800) {
//       width = (width / 2) * 0.7
//     } else {
//       width = width * 0.9
//     }

//     return width
//   }
//   // ref use signaturePed

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <HeaderBreadcrumb data={HeaderBreadcrumbData} title="Checklist:" />
//         </Grid>
//         <Grid xs={12} sx={{ ml: 3, mr: 3 }}>
//           <Paper
//             sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}
//           >
//             <TabsUnstyled defaultValue={0}>
//               <TabsList>
//                 {stages.stages.map((stage: any, index: any) => (
//                   <Tab value={index} key={index}>
//                     {stage.stage}
//                   </Tab>
//                 ))}
//               </TabsList>

//               {stages.stages.map((stage: any, index: any) => (
//                 <TabPanel value={index} key={index}>
//                   {/* <p>{stage.stage}</p> */}
//                   <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                       <TableHead></TableHead>
//                       <TableBody>
//                         {stage.tasks.map((task: any, index: any) => (
//                           <TableRow
//                             key={index}
//                             sx={{
//                               '&:last-child td, &:last-child th': { border: 0 },
//                             }}
//                           >
//                             <TableCell
//                               align="center"
//                               sx={{ alignItems: 'center' }}
//                             >
//                               <Stack
//                                 direction="row"
//                                 spacing={2}
//                                 alignItems="center"
//                               >
//                                 {returnCTA(task.type, task.list ?? [])}
//                               </Stack>
//                             </TableCell>
//                             <TableCell align="center">
//                               {task.description}
//                             </TableCell>

//                             <TableCell align="center">
//                               <Badge
//                                 badgeContent={task.images.length}
//                                 color="error"
//                               >
//                                 <Photo color="action" />
//                               </Badge>
//                             </TableCell>
//                             <TableCell align="center">Observação:</TableCell>
//                             <TableCell align="center">
//                               <TextField
//                                 id="outlined-multiline-flexible"
//                                 label="Multiline"
//                                 multiline
//                                 maxRows={4}
//                               />
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </TabPanel>
//               ))}
//             </TabsUnstyled>
//           </Paper>
//         </Grid>
//         <Grid item xs={12}></Grid>
//       </Grid>

//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Sound
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleClose}>
//               save
//             </Button>
//           </Toolbar>
//         </AppBar>
//         {/* div with border 1px solid black */}
//         <div
//           id="signature"
//           style={{
//             border: '1px solid black',
//             width: 300,
//             height: 200,
//             backgroundColor: grey[600],
//           }}
//         >
//           <SignatureCanvas
//             penColor="green"
//             canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
//           />
//         </div>
//       </Dialog>
//     </Container>
//   )
// }
