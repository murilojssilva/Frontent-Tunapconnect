import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { MainListItems, secondaryListItems } from '@/components/dashboard/ListItems'
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next/types';
import { apiCore } from '@/lib/api';
import { apiCoreClient } from '@/lib/apiClient';
import { Skeleton, Typography } from '@mui/material';
import Title from '@/components/Title';
import { ContainerItem } from '@/styles/pages/company';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, getCompaniesListRequest, getCompanyRequest } from '@/redux';
import { StarTwoTone } from '@mui/icons-material';
import { useRouter } from 'next/router';


interface companyProps {
  id: number;
  name: string;
  cnpj: string | null;
  cpf: string | null;
}


export default function DashboardContent() {
  const [company, setCompany] = useState<companyProps[]>()
  
  const api = new apiCore()
  const router = useRouter()
  
  const companyState = useSelector<AppState>(state => state.company)
  const dispatch = useDispatch<AppDispatch>()

  function handleSelectCompany(companyId: number) {
    dispatch(getCompanyRequest(companyId))
    router.push('/service-schedules/list')
  }


  useEffect(() => {
    api.get('/user/companies').then((response) => {
      const { data } = response.data
      if(data.length > 0) {
        setCompany(data.map((item: any) => {
          return { 
                id: item.id, 
                name: item.name,
                cnpj: item.cnpj,
                cpf: item.cpf
            }
        }))
      }
    })

  }, [])

  

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          
          {!company && (
            <>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  height={180}
                />
              </Grid>
            </>
          )
            
          }
        {company && company.map((item, index) => {
          return (
            <Grid item xs={12} md={4} lg={4} key={`${item.id}-${index}`} onClick={() => handleSelectCompany(item.id)}>
              
                <ContainerItem
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 180,
                }}
              >
                <Title>{item.name || 'Não informado'}</Title>
                <Typography>{ item.cnpj || item.cpf }</Typography>
                
              </ContainerItem>
            </Grid>
          )
        })}
        </Grid>
        
        </Container>
    </>
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