import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Link2 } from 'lucide-react';

type SettingItem = {
  id: number;
  key: string;
  value: string;
  description: string;
};

const SettingsManager = () => {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('key', { ascending: true });

    if (error) {
      console.error('Error fetching settings:', error);
      setError('Error al cargar la configuración. Asegúrate de haber creado la tabla "settings".');
    } else {
      setSettings(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (id: number, value: string) => {
    setSavingId(id);
    const { error } = await supabase
      .from('settings')
      .update({ value })
      .eq('id', id);

    if (error) {
      console.error('Error updating setting:', error);
      alert('Error al guardar: ' + error.message);
    }
    setSavingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Ajustes Globales</h1>
        <p className="text-text-light-sec dark:text-text-dark-sec mt-2">
          Configura enlaces de redes sociales y otras redirecciones globales del sitio web.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden p-6 space-y-6">
        {settings.length === 0 ? (
          <p className="text-text-light-sec dark:text-text-dark-sec text-center py-8">
            No hay configuraciones disponibles.
          </p>
        ) : (
          settings.map((setting) => (
            <SettingRow
              key={setting.id}
              item={setting}
              onSave={handleSave}
              isSaving={savingId === setting.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

const SettingRow = ({
  item,
  onSave,
  isSaving,
}: {
  item: SettingItem;
  onSave: (id: number, value: string) => void;
  isSaving: boolean;
}) => {
  const [value, setValue] = useState(item.value);
  const hasChanges = value !== item.value;

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center pb-6 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
      <div className="flex-1">
        <h3 className="font-medium text-text-light dark:text-text-dark flex items-center gap-2">
          <Link2 size={16} className="text-primary" />
          {item.key}
        </h3>
        {item.description && (
          <p className="text-sm text-text-light-sec dark:text-text-dark-sec mt-1">
            {item.description}
          </p>
        )}
      </div>
      
      <div className="flex w-full md:w-auto items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://..."
          className="flex-1 md:w-80 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-bg-light-sec dark:bg-bg-dark-sec text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
        <button
          onClick={() => onSave(item.id, value)}
          disabled={!hasChanges || isSaving}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[100px] ${
            hasChanges
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-bg-light-sec dark:bg-bg-dark-sec text-text-light-sec dark:text-text-dark-sec opacity-50 cursor-not-allowed'
          }`}
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : 'Guardar'}
        </button>
      </div>
    </div>
  );
};

export default SettingsManager;
