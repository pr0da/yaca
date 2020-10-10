import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Root from './src/navigation/Root';
import { Provider as ApolloProvider } from './src/apollo';

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Root />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
