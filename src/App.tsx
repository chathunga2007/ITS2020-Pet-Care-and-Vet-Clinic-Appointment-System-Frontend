import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthContext';
import Router from './router';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '1rem',
            padding: '12px 18px',
            fontSize: '13px',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Router />
    </AuthProvider>
  );
}

export default App;
