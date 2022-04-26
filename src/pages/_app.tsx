import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { FC } from 'react';

const client:QueryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime: 5 * 1000,
    },
  }
})


const MyApp:FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
        <Component {...pageProps} />
    </QueryClientProvider>

  )
}

export default MyApp
