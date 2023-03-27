import * as React from 'react';
import { useForm } from "react-hook-form";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import { useRouter } from 'next/router';



type SignInDataProps = {
  username: string
  password: string
}

export default function CompanuId() {

  const router = useRouter()

  const id = router.query.id

  return (
      <Container component="main" maxWidth="xs">
        <Typography variant="body2" color="text.secondary" align="center" >
            agendamento {id}
        </Typography>
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