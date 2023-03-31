
import * as React from 'react';
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
import { CompanyProvider } from '@/contexts/CompanyContext';



// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props:MyAppProps) => {
  const { Component,emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;
  
   const router = useRouter()
   
   

  // useEffect(() => {
  //   const handleStart = (url: string) => {
  //     NProgress.start()
  //   }

  //   const handleStop = () => {
  //     NProgress.done()
  //   }

  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleStop)
  //   router.events.on('routeChangeError', handleStop)

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleStop)
  //     router.events.off('routeChangeError', handleStop)
  //   }
  // }, [router])
  
  return (
    
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider session={session}>
          <CompanyProvider>
            
         
          
          { router.route === '/' && <Component {...pageProps} /> }
          { router.route !== '/' && (
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            )
          }
        
            {/* <Component {...pageProps} /> */}
            </CompanyProvider>
        </AuthProvider>
        
      </ThemeProvider>
      </CacheProvider>
  );
}

export default MyApp 

// export default wrapper.withRedux(MyApp) 