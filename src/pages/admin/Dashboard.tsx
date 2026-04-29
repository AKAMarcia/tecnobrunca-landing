import { useAuth } from '../../hooks/useAuth';
import { Type, Image as ImageIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Dashboard</h1>
        <p className="text-text-light-sec dark:text-text-dark-sec mt-2">
          Bienvenido al panel de administración, {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Texts Card */}
        <Link to="/admin/texts" className="bg-bg-light dark:bg-bg-dark p-6 rounded-2xl border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-all group">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Type size={24} />
          </div>
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">Textos y Traducciones</h2>
          <p className="text-text-light-sec dark:text-text-dark-sec text-sm">
            Administra todo el contenido escrito del sitio web en Español e Inglés.
          </p>
        </Link>

        {/* Media Card */}
        <Link to="/admin/media" className="bg-bg-light dark:bg-bg-dark p-6 rounded-2xl border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-all group">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ImageIcon size={24} />
          </div>
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">Imágenes</h2>
          <p className="text-text-light-sec dark:text-text-dark-sec text-sm">
            Sube y actualiza las imágenes, logos y gráficos del Landing Page.
          </p>
        </Link>

        {/* Settings Card */}
        <Link to="/admin/settings" className="bg-bg-light dark:bg-bg-dark p-6 rounded-2xl border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-all group">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">Ajustes Globales</h2>
          <p className="text-text-light-sec dark:text-text-dark-sec text-sm">
            Configura los enlaces del footer, redes sociales y otras opciones generales.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
