import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid'
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


interface companyProps {
  id: number;
  name: string;
  cnpj: string | null;
  cpf: string | null;
}

export default function DashboardContent() {
  const [company, setCompany] = useState<companyProps[]>()
  
  const api = new apiCore()
  
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
        {company && company.map((item, index) => {
          return (
            <Grid item xs={12} md={4} lg={4} key={`${item.id}-${index}`}>
              <div>
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
              </div>
             
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