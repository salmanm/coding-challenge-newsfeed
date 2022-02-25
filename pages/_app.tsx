import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'context/auth';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = {
  colors: {},
  space: [
    '0.25rem',
    '0.5rem',
    '0.75rem',
    '1rem',
    '1.5rem',
    '2rem',
    '3rem',
    '4rem',
    '6rem',
    '8rem',
    '12rem',
    '16rem',
    '24rem',
  ],
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
  }

  a {
    color: #0070f0;
    text-decoration: none;
  }

  a:hover {
    color: #0050d0;
    text-decoration: underline;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }

  p {
    font-size: 1rem;
    margin: 0 0 1rem;
  }

  * {
    box-sizing: border-box;
  }
`;
