import * as React from 'react'
import { useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
// import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

// import backgroundImageTunap from '@/assets/images/background-logo-login.svg'
import tunapLogoImg from '@/assets/images/tunap-login.svg'
import { alpha, Link, Paper, Stack } from '@mui/material'
import styled from '@emotion/styled'

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {'Copyright © '}
//       <Link color="inherit" href="#">
//         Tunnap Connect
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

type SignInDataProps = {
  username: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const { signIn } = useContext(AuthContext)

  function handleSignIn(data: SignInDataProps) {
    signIn(data)
  }
  const ButtonAdd = styled(Button)(({ theme }) => ({
    color: 'white',
    background: '#1C4961',
    maxWidth: 150,
    borderRadius: 6,
    '&:hover': {
      background: alpha('#1C4961', 0.7),
    },
  }))

  return (
    <Container
      // maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        // background:
        //   'url("/images/background-logo-login.svg") no-repeat center center',
        backgroundAttachment: 'fixed',
        backgroundImage: 'url("/images/background-logo-login.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // backgroundSize: '50% 100%',
        backgroundSize: '930px 100%',
      }}
    >
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          p: 4,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '440px',
          borderRadius: 4,
        }}
        component={Paper}
      >
        <Image
          priority
          src={tunapLogoImg}
          height={90}
          width={221}
          alt="Follow us on Twitter"
        />
        <Typography component="h1" variant="h6">
          Entrar
        </Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit(handleSignIn)}
          noValidate
          sx={{
            mt: 1,
            alignItems: 'center',
            justifyContent: 'center',
            px: 5,
            width: '400px',
          }}
          gap={1}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-email ou CPF:"
            placeholder="E-email ou CPF:"
            autoComplete="email"
            autoFocus
            size="small"
            {...register('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha:"
            placeholder="Senha:"
            size="small"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <ButtonAdd
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3 }}
          >
            entrar
          </ButtonAdd>
          {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          <Link href="#" variant="body2">
            {'Perdeu sua senha? Recupere sua senha'}
          </Link>
          <Link href="#" variant="body2">
            {'Termos de uso e a Política de privacidade'}
          </Link>
        </Stack>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  )
}
