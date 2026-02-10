'use client';

import { useState } from 'react';
import AdminLogin from '../../components/AdminLogin';
import AdminDashboard from '../../components/AdminDashboard';

interface AdminUser {
  name: string;
  email: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Mock authentication - in real app, this would validate against a database
    setAdmin({
      name: 'Mr Titty',
      email: credentials.email
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
  };

  if (!isAuthenticated || !admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard admin={admin} onLogout={handleLogout} />;
}