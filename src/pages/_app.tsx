
import * as React from 'react';
import { getSession, SessionProvider } from "next-auth/react"
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/styles/config/createEmotionCache';
import theme from '@/styles/config/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;
  
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider session={session}>
          { router.route === '/' && <Component {...pageProps} /> }
          { router.route !== '/' && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
            )
          }
        
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

