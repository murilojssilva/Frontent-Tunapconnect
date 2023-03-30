import * as React from 'react';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';



import { ClientInfor, ClientVehicle, ServiceSchedulesListProps, TechnicalConsultant } from '@/types/service-schedule';
import { apiCore } from '@/lib/api';


import { useRouter } from 'next/router';

import Title from '@/components/Title';

import List from '@mui/material/List';

import Stack from '@mui/material/Stack';

import { ButtonCenter, ButtonLeft, ButtonRight, DateTimePickerCard, DividerCard, InfoCardName, InfoCardText, ListItemCard, TitleCard } from '@/styles/pages/service-schedules/stylesEdit';
import Skeleton from '@mui/material/Skeleton';
import PrintIcon from '@mui/icons-material/Print';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import ptBR from 'date-fns/locale/pt-BR';
import dayjsPluginUTC from 'dayjs-plugin-utc'


const api = new apiCore()


export default function ServiceSchedulesCreate() {
  const [client, setClient] = useState<ClientInfor | null>()
  const [clientVehicle, setClientVehicle] = useState<ClientVehicle | null>()
  const [visitDate, setVisitDate] = useState<Dayjs | null>(null)
  const [technicalConsultant, setTechnicalConsultant] = useState<TechnicalConsultant | null>()

  const router = useRouter()


  useEffect(() => {
    const { id } = router.query
    console.log(id)
      api.get(`/service-schedule/${id}`)
        .then((response) => {
          console.log(response.data);

          const {client, client_vehicle,technical_consultant, promised_date} = response.data.data
          setClient({
            name: client.name ?? 'Não informado',
            cpf: client.document ?? 'Não informado',
            email: client.email[0] ?? 'Não informado',
            telefone: client.phone[0] ?? 'Não informado',
            address: client.address ?? 'Não informado'
          })
          
          setClientVehicle({
            brand: client_vehicle.vehicle.model.brand.name,
            chassis: client_vehicle.chasis,
            vehicle: client_vehicle.vehicle.name,
            model: `${client_vehicle.vehicle.model.name} - ${client_vehicle.vehicle.model_year}`,
            color: client_vehicle.color,
            plate: client_vehicle.plate
          })
          dayjs.extend(dayjsPluginUTC)
          const promisedDate = dayjs(new Date(promised_date))
          console.log(dayjs(promisedDate))
          setVisitDate(promisedDate)

          setTechnicalConsultant({
            id: technical_consultant.id,
            name: technical_consultant.name
          })
        }).catch((err) => { 
          setClient(null)
          setClientVehicle(null)
          setTechnicalConsultant(null)
        })
    
  },[router.query])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Stack direction='row'>
            <Title>Agenda de Serviços</Title>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <Stack spacing={3}>
               {/* cliente */}
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
            <Stack direction='row'>
              <TitleCard >cliente</TitleCard>
              </Stack>
                <DividerCard />
            <List dense={false}>
              
              <ListItemCard>
                  <InfoCardName>
                    Nome:
                  </InfoCardName> {client?.name ? (<InfoCardText >{client?.name}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                  <InfoCardName>
                    CPF:
                  </InfoCardName> {client?.cpf ? (<InfoCardText>{client?.cpf}</InfoCardText>) : (
                     <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                <InfoCardName>
                    Telefone:
                  </InfoCardName> {client?.telefone ? (<InfoCardText>{client?.telefone}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                <InfoCardName>
                    E-mail:
                  </InfoCardName> {client?.email ? (<InfoCardText>{client?.email}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                <InfoCardName>
                   Endereço:
                  </InfoCardName> {client?.address ? (<InfoCardText>{client?.address}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              
            </List>
            </Paper>
               {/* Veículo */}
              <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                     <Stack direction='row'>
              <TitleCard >Veículo</TitleCard>
              </Stack>
                <DividerCard />
            <List dense={false}>
              
              <ListItemCard>
                  <InfoCardName>
                    Marca:
                  </InfoCardName> {clientVehicle?.brand ? (<InfoCardText >{clientVehicle?.brand}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                  <InfoCardName>
                    Modelo:
                  </InfoCardName> {clientVehicle?.model ? (<InfoCardText>{clientVehicle?.model}</InfoCardText>) : (
                     <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                <InfoCardName>
                    Veículo:
                  </InfoCardName> {clientVehicle?.vehicle ? (<InfoCardText>{clientVehicle?.vehicle}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                <InfoCardName>
                    Cor:
                  </InfoCardName> {clientVehicle?.color ? (<InfoCardText>{clientVehicle?.color}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                <InfoCardName>
                   Chassi:
                  </InfoCardName> {clientVehicle?.chassis ? (<InfoCardText>{clientVehicle?.chassis}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
                </ListItemCard>
                 <ListItemCard>
                <InfoCardName>
                   Placa:
                  </InfoCardName> {clientVehicle?.plate ? (<InfoCardText>{clientVehicle?.plate}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              
            </List>
            </Paper>
            
          </Stack>
        </Grid>
        
        <Grid item xs={12} md={5} lg={5}>
          <Stack spacing={2}>
            <Stack spacing={2} direction='row' display='flex' justifyContent='center' >
              <ButtonLeft >Listar Checklists</ButtonLeft>
              <ButtonCenter ><PrintIcon /></ButtonCenter>
              <ButtonRight startIcon={<AddCircleOutlineIcon/>}>Novo</ButtonRight>
            </Stack>
            <Stack spacing={2} direction='row' display='flex' justifyContent='center' >
              <ButtonLeft >Listar Orçamentos</ButtonLeft>
              <ButtonCenter ><PrintIcon /></ButtonCenter>
              <ButtonRight startIcon={<AddCircleOutlineIcon/>}>Novo</ButtonRight>
            </Stack>
            {/* Agendamento */}
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack direction='row'>
                <TitleCard >agendamento</TitleCard>
              </Stack>
                <DividerCard />
              <List dense={false}>
              
              <ListItemCard>
                  <InfoCardName>
                    Número do atendimento:
                  </InfoCardName> {router.query.id ? (<InfoCardText >{router.query.id}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                  <InfoCardName>
                    Data da visita:
                  </InfoCardName>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                    <DateTimePickerCard
                      format="DD/MM/YYYY hh:mm"
                      slotProps={{ textField: { size: 'small' } }}
                      value={visitDate}
                      // slotProps={{
                      //   textField: {
                      //     helperText: 'DD / MM / YYYY',
                      //   },
                      // }}
                      onChange={(newValue: any) => {
                        console.log(newValue)
                        setVisitDate(newValue)
                      }}
                    />
                    </LocalizationProvider>
                  {/* {client?.cpf ? (<InfoCardText>{client?.cpf}</InfoCardText>) : (
                     <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )} */}
              </ListItemCard>
              
            </List>
              </Paper>
              <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                     <Stack direction='row'>
              <TitleCard >Consultor técnico</TitleCard>
              </Stack>
                <DividerCard />
            <List dense={false}>
              
              <ListItemCard>
                  <InfoCardName>
                    Nome:
                  </InfoCardName> {technicalConsultant?.name ? (<InfoCardText >{technicalConsultant?.name}</InfoCardText>) : (
                    <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
              <ListItemCard>
                  <InfoCardName>
                    Código consultor:
                  </InfoCardName> {technicalConsultant?.id ? (<InfoCardText>{technicalConsultant?.id }</InfoCardText>) : (
                     <InfoCardText width='100%'><Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: 1.5 }} width='100%' /></InfoCardText>
                  )}
              </ListItemCard>
            </List>
              </Paper>
            </Stack>
          </Grid>

        </Grid>
    </Container>
    
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

const session = await getSession(ctx)

  if (!session?.user?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {
    }, 
  }
}