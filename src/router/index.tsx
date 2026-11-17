import React, { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

// User Portal Pages
import UserDashboard from "../pages/user/UserDashboard";
import UserPets from "../pages/user/UserPets";
import UserBookAppointment from "../pages/user/UserBookAppointment";
import UserAppointments from "../pages/user/UserAppointments";

// Admin Console Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminAppointments from "../pages/admin/AdminAppointments";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminPets from "../pages/admin/AdminPets";
import AdminServices from "../pages/admin/AdminServices";

import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

interface RequireAuthProps {
  children: ReactNode;
  roles?: string[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, roles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061e20] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-teal-400 animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-semibold">
          Loading PetCare &amp; Vet Clinic system...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    roles &&
    !roles.some((reqRole) =>
      user?.roles?.some((userRole) => userRole.toUpperCase() === reqRole.toUpperCase())
    )
  ) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
        <Route
          path="/user/dashboard"
          element={
            <RequireAuth>
              <UserDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/user/pets"
          element={
            <RequireAuth>
              <UserPets />
            </RequireAuth>
          }
        />
        <Route
          path="/user/book"
          element={
            <RequireAuth>
              <UserBookAppointment />
            </RequireAuth>
          }
        />
        <Route
          path="/user/appointments"
          element={
            <RequireAuth>
              <UserAppointments />
            </RequireAuth>
          }
        />
        <Route path="/portal" element={<Navigate to="/user/dashboard" replace />} />

        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminDashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminAppointments />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminDoctors />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/pets"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminPets />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/services"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminServices />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;