import React from 'react';

import { AuthProvider } from './hooks/AuthContext';
import { ToastProvider } from './hooks/ToastContext';
import Routes from './routes';

import GlobalStyle from './styles/GlobalStyle';


const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
