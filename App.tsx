import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Root from './src/navigation/Root';

function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

export default App;
