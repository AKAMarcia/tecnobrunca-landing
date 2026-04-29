import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Search, Plus, Trash2, ExternalLink } from 'lucide-react';

type Asset = {
  id: number;
  url: string;
  alt: string;
  category: string;
  display_order: number;
  metadata: any;
};

const CATEGORIES = ['PartnerLogo', 'HeroImage', 'ServiceImage', 'General'];

const AssetsManager = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (!error && data) {
      setAssets(data);
    }
    setLoading(false);
  };

  const handleSave = async (id: number, updates: Partial<Asset>) => {
    setSavingId(id);
    const { error } = await supabase.from('assets').update(updates).eq('id', id);
    if (!error) {
      setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    } else {
      alert('Error: ' + error.message);
    }
    setSavingId(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este asset?')) return;
    const { error } = await supabase.from('assets').delete().eq('id', id);
    if (!error) {
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleAdd = async (newAsset: Omit<Asset, 'id'>) => {
    const { data, error } = await supabase.from('assets').insert([newAsset]).select();
    if (!error && data) {
      setAssets(prev => [...prev, data[0]]);
      setShowAddModal(false);
    }
  };

  const filteredAssets = assets.filter(a => {
    const matchesSearch = (a.alt || '').toLowerCase().includes(searchTerm.toLowerCase()) || a.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestor de Imágenes y Logos</h1>
          <p className="text-text-light-sec dark:text-text-dark-sec mt-2">Administra los recursos visuales del sitio.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} /> Nuevo Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light-sec" size={18} />
          <input
            type="text"
            placeholder="Buscar por URL o descripción..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-2 rounded-lg border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="p-2 rounded-lg border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark"
        >
          <option value="Todos">Todas las Categorías</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onSave={handleSave}
            onDelete={handleDelete}
            isSaving={savingId === asset.id}
          />
        ))}
      </div>

      {showAddModal && <AddAssetModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
    </div>
  );
};

const AssetCard = ({ asset, onSave, onDelete, isSaving }: any) => {
  const [url, setUrl] = useState(asset.url);
  const [alt, setAlt] = useState(asset.alt || '');
  const [cat, setCat] = useState(asset.category);
  const [order, setOrder] = useState(asset.display_order);

  const hasChanges = url !== asset.url || alt !== asset.alt || cat !== asset.category || order !== asset.display_order;

  return (
    <div className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden flex flex-col group">
      <div className="h-48 bg-bg-light-sec dark:bg-bg-dark-sec relative flex items-center justify-center p-8 overflow-hidden">
        <img src={url} alt={alt} className="max-h-full max-w-full object-contain relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4 flex-1 space-y-3">
        <div>
          <label className="text-[10px] uppercase font-bold text-text-light-sec mb-1 block">URL de la Imagen</label>
          <div className="flex gap-2">
            <input 
              value={url} 
              onChange={e => setUrl(e.target.value)}
              className="flex-1 text-xs p-2 rounded border border-border-light dark:border-border-dark bg-bg-light-sec dark:bg-bg-dark-sec truncate"
            />
            <a href={url} target="_blank" className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"><ExternalLink size={14} /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-text-light-sec mb-1 block">Categoría</label>
            <select 
              value={cat} 
              onChange={e => setCat(e.target.value)}
              className="w-full text-xs p-2 rounded border border-border-light dark:border-border-dark bg-bg-light-sec dark:bg-bg-dark-sec"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-text-light-sec mb-1 block">Orden</label>
            <input 
              type="number"
              value={order} 
              onChange={e => setOrder(Number(e.target.value))}
              className="w-full text-xs p-2 rounded border border-border-light dark:border-border-dark bg-bg-light-sec dark:bg-bg-dark-sec"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-text-light-sec mb-1 block">Nombre / Alt Text</label>
          <input 
            value={alt} 
            onChange={e => setAlt(e.target.value)}
            placeholder="Ej: Logo React"
            className="w-full text-xs p-2 rounded border border-border-light dark:border-border-dark bg-bg-light-sec dark:bg-bg-dark-sec"
          />
        </div>

        <div className="pt-2 flex justify-between items-center gap-2">
          <button onClick={() => onDelete(asset.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
          <button
            onClick={() => onSave(asset.id, { url, alt, category: cat, display_order: order })}
            disabled={!hasChanges || isSaving}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              hasChanges ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-bg-light-sec text-text-light-sec cursor-not-allowed opacity-50'
            }`}
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddAssetModal = ({ onClose, onAdd }: any) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [cat, setCat] = useState('PartnerLogo');
  const [order, setOrder] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-light dark:bg-bg-dark w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-border-light flex justify-between items-center">
          <h2 className="text-xl font-bold">Añadir Nuevo Recurso</h2>
          <button onClick={onClose} className="text-text-light-sec hover:text-text-light">&times;</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="w-full p-2 rounded border" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre / Alt Text</label>
            <input type="text" value={alt} onChange={e => setAlt(e.target.value)} className="w-full p-2 rounded border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <select value={cat} onChange={e => setCat(e.target.value)} className="w-full p-2 rounded border">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Orden de Visualización</label>
              <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className="w-full p-2 rounded border" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-bg-light-sec border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">Cancelar</button>
          <button onClick={() => onAdd({ url, alt, category: cat, display_order: order, metadata: {} })} className="bg-primary text-white px-6 py-2 rounded-lg font-bold" disabled={!url}>Crear Asset</button>
        </div>
      </div>
    </div>
  );
};

export default AssetsManager;
