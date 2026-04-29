import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Search } from 'lucide-react';

type TranslationItem = {
  id: number;
  key: string;
  value_es: string;
  value_en: string;
};

const TextsManager = () => {
  const [translations, setTranslations] = useState<TranslationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .order('key', { ascending: true });

    if (error) {
      console.error('Error fetching translations:', error);
      setError('Error al cargar las traducciones.');
    } else {
      setTranslations(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (id: number, key: string, value_es: string, value_en: string) => {
    setSavingId(id);
    const { error } = await supabase
      .from('translations')
      .update({ value_es, value_en })
      .eq('id', id);

    if (error) {
      console.error('Error updating translation:', error);
      alert('Error al guardar: ' + error.message);
    } else {
      // Opcional: mostrar un toast de éxito
    }
    setSavingId(null);
  };

  const filteredTranslations = translations.filter(
    (t) =>
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.value_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.value_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Textos y Traducciones</h1>
          <p className="text-text-light-sec dark:text-text-dark-sec mt-2">
            Administra el contenido de texto del Landing Page.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-light-sec dark:text-text-dark-sec" />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-light-sec dark:bg-bg-dark-sec border-b border-border-light dark:border-border-dark">
                <th className="p-4 font-semibold text-text-light-sec dark:text-text-dark-sec w-1/4">Clave (Key)</th>
                <th className="p-4 font-semibold text-text-light-sec dark:text-text-dark-sec w-1/3">Español</th>
                <th className="p-4 font-semibold text-text-light-sec dark:text-text-dark-sec w-1/3">Inglés</th>
                <th className="p-4 font-semibold text-text-light-sec dark:text-text-dark-sec text-center w-24">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredTranslations.map((item) => (
                <TranslationRow
                  key={item.id}
                  item={item}
                  onSave={handleSave}
                  isSaving={savingId === item.id}
                />
              ))}
              {filteredTranslations.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-light-sec dark:text-text-dark-sec">
                    No se encontraron textos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TranslationRow = ({
  item,
  onSave,
  isSaving,
}: {
  item: TranslationItem;
  onSave: (id: number, key: string, es: string, en: string) => void;
  isSaving: boolean;
}) => {
  const [esValue, setEsValue] = useState(item.value_es);
  const [enValue, setEnValue] = useState(item.value_en);
  
  const hasChanges = esValue !== item.value_es || enValue !== item.value_en;
  
  // Si el texto es muy largo, usamos un textarea, sino un input
  const isLongText = esValue.length > 50 || enValue.length > 50 || esValue.includes('<');

  return (
    <tr className="hover:bg-bg-light-sec/50 dark:hover:bg-bg-dark-sec/50 transition-colors">
      <td className="p-4 align-top">
        <code className="text-sm bg-bg-light-sec dark:bg-bg-dark-sec px-2 py-1 rounded text-primary border border-border-light dark:border-border-dark">
          {item.key}
        </code>
      </td>
      <td className="p-4 align-top">
        {isLongText ? (
          <textarea
            value={esValue}
            onChange={(e) => setEsValue(e.target.value)}
            className="w-full min-h-[100px] p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark focus:ring-1 focus:ring-primary outline-none"
          />
        ) : (
          <input
            type="text"
            value={esValue}
            onChange={(e) => setEsValue(e.target.value)}
            className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark focus:ring-1 focus:ring-primary outline-none"
          />
        )}
      </td>
      <td className="p-4 align-top">
        {isLongText ? (
          <textarea
            value={enValue}
            onChange={(e) => setEnValue(e.target.value)}
            className="w-full min-h-[100px] p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark focus:ring-1 focus:ring-primary outline-none"
          />
        ) : (
          <input
            type="text"
            value={enValue}
            onChange={(e) => setEnValue(e.target.value)}
            className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark focus:ring-1 focus:ring-primary outline-none"
          />
        )}
      </td>
      <td className="p-4 align-top text-center">
        <button
          onClick={() => onSave(item.id, item.key, esValue, enValue)}
          disabled={!hasChanges || isSaving}
          className={`p-2 rounded-lg transition-colors flex items-center justify-center w-10 h-10 mx-auto ${
            hasChanges
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-bg-light-sec dark:bg-bg-dark-sec text-text-light-sec dark:text-text-dark-sec opacity-50 cursor-not-allowed'
          }`}
          title={hasChanges ? "Guardar cambios" : "Sin cambios"}
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        </button>
      </td>
    </tr>
  );
};

export default TextsManager;
