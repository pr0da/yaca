import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuthContext } from '../context/AuthContext';

interface Props {}

const createClient = (token: string | null) => {
  if (!token) {
    return null;
  }
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};

export const Provider: React.FC<Props> = (props) => {
  const { children } = props;
  const { userToken } = useAuthContext();
  const client = React.useMemo(() => createClient(userToken), [userToken]);

  if (!client) {
    return <>{children}</>;
  }

  return <ApolloProvider {...{ client }}>{children}</ApolloProvider>;
};
