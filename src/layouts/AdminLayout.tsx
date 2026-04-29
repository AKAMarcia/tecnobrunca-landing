import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, LayoutDashboard, Type, Image as ImageIcon, Settings } from 'lucide-react';

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-bg-light-sec dark:bg-bg-dark-sec text-text-light dark:text-text-dark font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-light dark:bg-bg-dark border-r border-border-light dark:border-border-dark flex flex-col">
        <div className="p-6 border-b border-border-light dark:border-border-dark">
          <h1 className="text-xl font-bold tracking-tight text-primary">TecnoBrunca CMS</h1>
          <p className="text-xs text-text-light-sec dark:text-text-dark-sec mt-1 truncate">
            {user?.email}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text-light-sec dark:text-text-dark-sec hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec hover:text-text-light dark:hover:text-text-dark'
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/texts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text-light-sec dark:text-text-dark-sec hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec hover:text-text-light dark:hover:text-text-dark'
              }`
            }
          >
            <Type size={20} />
            Textos
          </NavLink>
          <NavLink
            to="/admin/media"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text-light-sec dark:text-text-dark-sec hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec hover:text-text-light dark:hover:text-text-dark'
              }`
            }
          >
            <ImageIcon size={20} />
            Imágenes
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text-light-sec dark:text-text-dark-sec hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec hover:text-text-light dark:hover:text-text-dark'
              }`
            }
          >
            <Settings size={20} />
            Ajustes
          </NavLink>
        </nav>

        <div className="p-4 border-t border-border-light dark:border-border-dark">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
