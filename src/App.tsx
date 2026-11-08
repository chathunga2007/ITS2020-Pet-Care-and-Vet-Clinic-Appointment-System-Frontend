import React from "react";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#131722",
              color: "#f8fafc",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "1rem",
              padding: "0.85rem 1.25rem",
              fontSize: "0.875rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
            },
            success: {
              iconTheme: {
                primary: "#0ea5e9",
                secondary: "#07090e",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#07090e",
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
