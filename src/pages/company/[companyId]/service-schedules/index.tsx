import * as React from 'react';
import { useForm } from "react-hook-form";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';



type SignInDataProps = {
  username: string
  password: string
}

export default function SignIn() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      searchText: '',
    }
  });
  const { signIn } = useContext(AuthContext)



  function handleSignIn(data: SignInDataProps) {
    
    
    signIn(data);
  }

  return (
      <Container component="main" maxWidth="xs">
        <Typography variant="body2" color="text.secondary" align="center" >
            Tunnap Connect Agendamento
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