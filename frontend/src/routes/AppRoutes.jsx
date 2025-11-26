import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ProtectedRoute from './ProtectedRoutes';
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default: redirect based on token */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        
        {/* Protected Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />


        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
