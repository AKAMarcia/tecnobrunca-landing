import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { User, Shield, Mail, Calendar, Loader2, UserPlus, Info } from 'lucide-react';

type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  updated_at: string;
};

const UsersManager = () => {
  const { user: currentUser } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data) {
      setProfiles(data);
    }
    setLoading(false);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-text-light-sec mt-2">Controla quién tiene acceso al panel administrativo.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold border border-primary/20">
          <Shield size={18} />
          Panel Administrador
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User size={20} /> Usuarios Registrados
          </h2>
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-bg-light dark:bg-bg-dark p-6 rounded-2xl border border-border-light dark:border-border-dark flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-bg-light-sec dark:bg-bg-dark-sec flex items-center justify-center font-bold text-primary border border-border-light dark:border-border-dark">
                  {profile.email?.[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold">{profile.full_name || 'Sin nombre'}</h3>
                  <p className="text-sm text-text-light-sec flex items-center gap-1">
                    <Mail size={12} /> {profile.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20 uppercase">
                  {profile.role}
                </span>
                <span className="text-[10px] text-text-light-sec mt-2 flex items-center gap-1">
                  <Calendar size={10} /> {new Date(profile.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden">
            <UserPlus className="absolute -right-4 -bottom-4 opacity-10" size={120} />
            <h3 className="text-lg font-bold mb-4">¿Cómo añadir usuarios?</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Por seguridad, la creación de nuevos usuarios administradores se debe realizar directamente desde el Panel de Control de Supabase.
            </p>
            <a 
              href="https://supabase.com/dashboard/project/euufceazsxfefheshdrd/auth/users" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-white text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg"
            >
              Ir a Supabase <Info size={16} />
            </a>
          </div>

          <div className="bg-bg-light-sec dark:bg-bg-dark-sec p-6 rounded-2xl border border-dashed border-border-light dark:border-border-dark">
            <h4 className="font-bold text-sm mb-2">Tu Sesión Actual</h4>
            <div className="text-xs text-text-light-sec space-y-1">
              <p>Email: {currentUser?.email}</p>
              <p>ID: {currentUser?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManager;
