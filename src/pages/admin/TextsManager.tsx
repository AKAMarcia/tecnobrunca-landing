import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Search, Plus, Trash2, Filter } from 'lucide-react';

type Translation = {
  id: number;
  key: string;
  value_es: string;
  value_en: string;
  component: string;
  effect: string;
  created_at: string;
};

const COMPONENTS = ['Navbar', 'Hero', 'Services', 'About', 'Contact', 'Footer', 'General'];
const EFFECTS = [
  { id: 'none', name: 'Ninguno' },
  { id: 'TextRoll', name: 'TextRoll (Animación)' },
  { id: 'array', name: 'Lista (separada por |)' },
];

const TextsManager = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching translations:', error);
    } else {
      setTranslations(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (id: number, updates: Partial<Translation>) => {
    setSavingId(id);
    const { error } = await supabase
      .from('translations')
      .update(updates)
      .eq('id', id);

    if (error) {
      alert('Error al guardar: ' + error.message);
    } else {
      setTranslations(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }
    setSavingId(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar este texto?')) return;
    const { error } = await supabase.from('translations').delete().eq('id', id);
    if (!error) {
      setTranslations(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleAdd = async (newItem: any) => {
    const { data, error } = await supabase
      .from('translations')
      .insert([newItem])
      .select();

    if (!error && data) {
      setTranslations(prev => [data[0], ...prev]);
      setShowAddModal(false);
    } else {
      alert('Error al crear: ' + error?.message);
    }
  };

  const filteredTranslations = translations.filter(t => {
    const matchesSearch = t.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.value_es.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComp = selectedComponent === 'Todos' || t.component === selectedComponent;
    return matchesSearch && matchesComp;
  });

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestor de Textos (CMS)</h1>
          <p className="text-text-light-sec dark:text-text-dark-sec mt-2">Administra todas las traducciones y efectos del sitio.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 font-bold"
        >
          <Plus size={20} /> Nuevo Texto
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light-sec" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por clave o contenido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light-sec" size={18} />
          <select 
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
          >
            <option value="Todos">Todos los Componentes</option>
            {COMPONENTS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-light dark:bg-bg-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-light-sec dark:bg-bg-dark-sec border-b border-border-light dark:border-border-dark">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light-sec">Clave / Contexto</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light-sec">Contenido (ES / EN)</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light-sec w-40">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredTranslations.map((t) => (
                <TranslationRow 
                  key={t.id} 
                  item={t} 
                  onSave={handleSave} 
                  onDelete={handleDelete}
                  isSaving={savingId === t.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
    </div>
  );
};

const TranslationRow = ({ item, onSave, onDelete, isSaving }: any) => {
  const [esValue, setEsValue] = useState(item.value_es);
  const [enValue, setEnValue] = useState(item.value_en);
  const [comp, setComp] = useState(item.component);
  const [eff, setEff] = useState(item.effect || 'none');

  const hasChanges = esValue !== item.value_es || enValue !== item.value_en || comp !== item.component || eff !== item.effect;

  return (
    <tr className="hover:bg-primary/5 transition-colors group">
      <td className="px-6 py-4">
        <div className="space-y-2">
          <span className="text-sm font-mono text-primary font-bold">{item.key}</span>
          <select 
            value={comp} 
            onChange={(e) => setComp(e.target.value)}
            className="block text-[10px] px-2 py-0.5 rounded border border-border-light dark:border-border-dark bg-transparent outline-none uppercase font-bold"
          >
            {COMPONENTS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-light-sec uppercase font-bold">Efecto:</span>
            <select
              value={eff}
              onChange={(e) => setEff(e.target.value)}
              className="text-[10px] bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded px-1.5 py-0.5 outline-none"
            >
              {EFFECTS.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 space-y-3">
        <textarea 
          value={esValue}
          onChange={(e) => setEsValue(e.target.value)}
          className="w-full p-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-transparent focus:bg-white dark:focus:bg-bg-dark-sec outline-none transition-all resize-none min-h-[60px]"
          placeholder="Español..."
        />
        <textarea 
          value={enValue}
          onChange={(e) => setEnValue(e.target.value)}
          className="w-full p-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-transparent focus:bg-white dark:focus:bg-bg-dark-sec outline-none transition-all resize-none min-h-[60px]"
          placeholder="Inglés..."
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onSave(item.id, { value_es: esValue, value_en: enValue, component: comp, effect: eff })}
            disabled={!hasChanges || isSaving}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              hasChanges 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-bg-light-sec dark:bg-bg-dark-sec text-text-light-sec opacity-50 cursor-not-allowed'
            }`}
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? 'Guardando' : 'Actualizar'}
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <Trash2 size={14} /> Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

const AddModal = ({ onClose, onAdd }: any) => {
  const [key, setKey] = useState('');
  const [es, setEs] = useState('');
  const [en, setEn] = useState('');
  const [comp, setComp] = useState('General');
  const [eff, setEff] = useState('none');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-light dark:bg-bg-dark w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-border-light dark:border-border-dark animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-bg-light-sec dark:bg-bg-dark-sec">
          <h2 className="text-xl font-bold">Nueva Traducción</h2>
          <button onClick={onClose} className="text-text-light-sec hover:text-text-light">&times;</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Clave (Única)</label>
              <input 
                type="text" 
                value={key} 
                onChange={e => setKey(e.target.value)} 
                placeholder="ej: about_title"
                className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Componente</label>
              <select 
                value={comp} 
                onChange={e => setComp(e.target.value)}
                className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark"
              >
                {COMPONENTS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Efecto Especial</label>
            <select 
              value={eff} 
              onChange={e => setEff(e.target.value)}
              className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark"
            >
              {EFFECTS.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Español</label>
              <textarea 
                value={es} 
                onChange={e => setEs(e.target.value)} 
                className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Inglés</label>
              <textarea 
                value={en} 
                onChange={e => setEn(e.target.value)} 
                className="w-full p-2 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark min-h-[100px]"
              />
            </div>
          </div>
        </div>
        <div className="p-6 bg-bg-light-sec dark:bg-bg-dark-sec border-t border-border-light dark:border-border-dark flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-text-light-sec">Cancelar</button>
          <button 
            onClick={() => onAdd({ key, value_es: es, value_en: en, component: comp, effect: eff })}
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold"
            disabled={!key || !es || !en}
          >
            Crear Registro
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextsManager;
