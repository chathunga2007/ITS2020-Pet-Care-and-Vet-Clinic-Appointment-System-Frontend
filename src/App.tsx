import React from "react";
import AuthProvider from "./context/AuthContext";
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#131722",
            color: "#f8fafc",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "1rem",
            padding: "0.85rem 1.25rem",
            fontSize: "0.875rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
          },
          success: {
            iconTheme: {
              primary: "#f59e0b",
              secondary: "#0a0d14",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0a0d14",
            },
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;

