import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/styles/config/createEmotionCache'
import theme from '@/styles/config/theme'
import { AuthProvider } from '@/contexts/AuthContext'

import Layout from '@/Layout'
import { SessionProvider } from 'next-auth/react'
// import { queryClient } from '@/lib/react-query'

import { NextComponentType } from 'next/types'
import { GlobalStyles } from '@mui/material'
import { globals } from '@/styles/globals'

import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

type CustomAppProps = MyAppProps & {
  Component: NextComponentType & { auth?: boolean } // add auth type
}

const MyApp = (props: CustomAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globals} />
        <SessionProvider session={session} refetchInterval={60 * 5}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {/* <GeralProvider> */}
              {Component.auth ? (
                // @ts-ignore
                <Layout>
                  <Component {...props.pageProps} />
                </Layout>
              ) : (
                <Component {...pageProps} />
              )}

              {/* <Component {...pageProps} /> */}
              <ReactQueryDevtools initialIsOpen={false} />
              {/* </GeralProvider> */}
            </AuthProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
