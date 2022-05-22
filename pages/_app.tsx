import "@fontsource/rubik"
import "@fontsource/material-icons-outlined"
import '@styles/reset.css'
import '@styles/globals.css'
import {AppThemeWithContext} from '@components/Theme'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {UserProvider} from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {
  return (<UserProvider>
        <Head>
          <title>Cajigas.dev</title>
          <meta name="description" content="Cajigas.dev provides ecommerce & web development services. Specializations include front-end development" />
          <link rel="icon" href="/favicon.ico" />
         
        </Head>
        <AppThemeWithContext>
          <Component {...pageProps} />
        </AppThemeWithContext>)
  </UserProvider>)
}


export default MyApp
