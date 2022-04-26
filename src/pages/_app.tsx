import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Wrapper from '../components/wrapper/Wrapper'
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
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </QueryClientProvider>

  )
}

export default MyApp
