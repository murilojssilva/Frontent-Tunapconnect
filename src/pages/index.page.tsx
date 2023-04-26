import * as React from 'react'
import { useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

// import backgroundImageTunap from '@/assets/images/background-logo-login.svg'
import tunapLogoImg from '@/assets/images/tunap-login.svg'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Tunnap Connect
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
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
        <Box
          component="form"
          onSubmit={handleSubmit(handleSignIn)}
          noValidate
          sx={{ mt: 1 }}
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
            {...register('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha:"
            placeholder="Senha:"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
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
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
