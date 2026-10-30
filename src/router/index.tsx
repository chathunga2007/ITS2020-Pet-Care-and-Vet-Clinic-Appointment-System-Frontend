import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { useAuth } from '../hooks/useAuth';

type RequireAuthType = {
  children: ReactNode;
  roles?: string[];
};

export const RequireAuth = ({ children, roles }: RequireAuthType) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 border-4 border-emerald-400 border-dashed rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
            Loading PetCare System...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some((role) => user?.roles?.includes(role))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-center p-6 text-white">
        <div className="max-w-md bg-slate-800 p-8 rounded-3xl shadow-2xl border border-rose-500/30">
          <h2 className="text-2xl font-bold text-rose-400 mb-2">Access Denied</h2>
          <p className="text-slate-300 text-sm mb-6">
            You do not have administrative permission to view this section.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Page: Guest visitors and logged in users can freely explore */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {/* Admin only route example */}
        <Route
          path="/admin"
          element={
            <RequireAuth roles={['ADMIN']}>
              <Home />
            </RequireAuth>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

