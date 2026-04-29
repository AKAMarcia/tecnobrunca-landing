import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import PublicLayout from './pages/PublicLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import TextsManager from './pages/admin/TextsManager';
import SettingsManager from './pages/admin/SettingsManager';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<PublicLayout />} />
              
              {/* Rutas Admin Públicas (Login) */}
              <Route path="/admin/login" element={<Login />} />
              
              {/* Rutas Admin Protegidas */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="texts" element={<TextsManager />} />
                  <Route path="settings" element={<SettingsManager />} />
                </Route>
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
