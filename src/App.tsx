import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseProvider } from './contexts/SupabaseContext';
import AppRoutes from './AppRoutes';
import MobileBlocker from './components/MobileBlocker';

function App() {
  return (
    <BrowserRouter>
      <SupabaseProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
          <MobileBlocker />
          <AppRoutes />
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  );
}

export default App;