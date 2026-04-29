import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Globe, Plus, Trash2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

type SocialLink = {
  id: number;
  key: string;
  value: string;
  description: string;
};

const SocialManager = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('key', { ascending: true });

    if (!error && data) {
      setLinks(data);
    }
    setLoading(false);
  };

  const handleSave = async (id: number, value: string) => {
    setSavingId(id);
    const { error } = await supabase.from('settings').update({ value }).eq('id', id);
    if (!error) {
      setLinks(prev => prev.map(l => l.id === id ? { ...l, value } : l));
    }
    setSavingId(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este enlace?')) return;
    await supabase.from('settings').delete().eq('id', id);
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const handleAdd = async (key: string, value: string, desc: string) => {
    const { data, error } = await supabase.from('settings').insert([{ key, value, description: desc }]).select();
    if (!error && data) {
      setLinks(prev => [...prev, data[0]]);
      setShowAddModal(false);
    }
  };

  const getIcon = (key: string) => {
    if (key.includes('github')) return <FaGithub size={20} />;
    if (key.includes('linkedin')) return <FaLinkedin size={20} />;
    if (key.includes('twitter') || key.includes('x_url')) return <FaTwitter size={20} />;
    return <Globe size={20} />;
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Redes Sociales y Enlaces</h1>
          <p className="text-text-light-sec mt-2">Gestiona los links que aparecen en el footer y otras secciones.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Nuevo Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link) => (
          <div key={link.id} className="bg-bg-light dark:bg-bg-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  {getIcon(link.key)}
                </div>
                <div>
                  <h3 className="font-bold text-lg capitalize">{link.key.replace('_url', '').replace('_', ' ')}</h3>
                  <p className="text-xs text-text-light-sec">{link.description}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(link.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={18} /></button>
            </div>
            
            <div className="space-y-3">
              <input 
                type="text" 
                defaultValue={link.value} 
                onBlur={(e) => handleSave(link.id, e.target.value)}
                className="w-full p-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-sec dark:bg-bg-dark-sec text-sm"
                placeholder="https://..."
              />
              <div className="flex justify-end">
                {savingId === link.id && <Loader2 size={16} className="animate-spin text-primary" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && <AddLinkModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
    </div>
  );
};

const AddLinkModal = ({ onClose, onAdd }: any) => {
  const [key, setKey] = useState('');
  const [val, setVal] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-light dark:bg-bg-dark w-full max-w-md rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Añadir Red Social</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre (Key)</label>
            <input value={key} onChange={e => setKey(e.target.value)} className="w-full p-2 border rounded" placeholder="ej: instagram_url" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input value={val} onChange={e => setVal(e.target.value)} className="w-full p-2 border rounded" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">Cancelar</button>
          <button onClick={() => onAdd(key, val, desc)} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default SocialManager;
