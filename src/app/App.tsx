import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import { Provider as GithubClientProvider } from '../context/GithubClientContext';
import Root from './Root';
import store from './store';
import theme from './theme';

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <PaperProvider {...{ theme }}>
        <Provider store={store}>
          <AuthProvider>
            <GithubClientProvider>
              <Root />
            </GithubClientProvider>
          </AuthProvider>
        </Provider>
      </PaperProvider>
    </ThemeProvider>
  );
}

export default App;
