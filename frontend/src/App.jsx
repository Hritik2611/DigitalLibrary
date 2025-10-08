import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Page Imports
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PlansPage from './pages/PlansPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserListPage from './pages/admin/UserListPage';
// Component Imports
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute'; // Import AdminRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SubscriptionListPage from './pages/admin/SubscriptionListPage';
import PaymentListPage from './pages/admin/PaymentListPage';
import DataControllerPage from './pages/admin/DataControllerPage';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/forgot-Password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        
        {/* Protected Student Routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route index element={<DashboardPage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>

            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<UserListPage />} />

            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    <Route path="/admin/users" element={<UserListPage />} />
    <Route path="/admin/subscriptions" element={<SubscriptionListPage />} />
    <Route path="/admin/payments" element={<PaymentListPage />} />
    <Route path="/admin/data" element={<DataControllerPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

