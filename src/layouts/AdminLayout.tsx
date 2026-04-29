import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, LayoutDashboard, Type, Image as ImageIcon, Share2, Users } from 'lucide-react';

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/texts', icon: <Type size={20} />, label: 'Textos' },
    { to: '/admin/assets', icon: <ImageIcon size={20} />, label: 'Imágenes' },
    { to: '/admin/social', icon: <Share2 size={20} />, label: 'Redes Sociales' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Usuarios' },
  ];

  return (
    <div className="flex h-screen bg-bg-light-sec dark:bg-bg-dark-sec text-text-light dark:text-text-dark font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-light dark:bg-bg-dark border-r border-border-light dark:border-border-dark flex flex-col">
        <div className="p-6 border-b border-border-light dark:border-border-dark flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/images/navbar-logo.png" alt="TecnoBrunca Logo" className="h-8 object-contain dark:brightness-150" />
            <h1 className="text-xl font-bold tracking-tight text-primary">CMS</h1>
          </div>
          <p className="text-[10px] text-text-light-sec dark:text-text-dark-sec uppercase font-bold tracking-widest truncate">
            Admin: {user?.email}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold'
                    : 'text-text-light-sec dark:text-text-dark-sec hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec hover:text-text-light dark:hover:text-text-dark'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border-light dark:border-border-dark">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
