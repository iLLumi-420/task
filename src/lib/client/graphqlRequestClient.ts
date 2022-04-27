import { GraphQLClient } from 'graphql-request';

const requestHeaders = {
  authorization: 'Beaerer TOKEN',
};

const graphqlRequestClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
