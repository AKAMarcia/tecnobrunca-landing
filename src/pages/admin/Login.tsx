import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
    } else {
      navigate('/admin/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light-sec dark:bg-bg-dark-sec px-4">
      <div className="max-w-md w-full bg-bg-light dark:bg-bg-dark p-8 rounded-2xl shadow-xl border border-border-light dark:border-border-dark">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">CMS Access</h1>
          <p className="text-text-light-sec dark:text-text-dark-sec mt-2">Ingresa tus credenciales de administrador</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-light-sec dark:text-text-dark-sec mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="admin@tecnobrunca.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light-sec dark:text-text-dark-sec mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
