import React from 'react'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { request, gql } from "graphql-request";
import { type } from 'os';

const client = new QueryClient()


const endpoint = 'https://graphqlzero.almansi.me/api'

const Wrapper = ({children}: any) => {
  return (
    <>
    <div>wrapper</div>
    {{children}}
    </>
  )
}

export default Wrapper