
import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Save, 
  Layout, 
  ArrowLeft,
  Settings,
  Monitor,
  Database,
  Users,
  Layers,
  Flag,
  Palette,
  Cpu,
  Bot,
  Building2,
  Stethoscope,
  Scale,
  Sparkles,
  MessageSquare,
  Zap,
  Check,
  CreditCard,
  Menu,
  X,
  ChevronRight,
  Plus,
  Trash2,
  Shield,
  CheckCircle2,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { COLOR_PALETTES } from './constants';

interface AdminProps {
  content: any;
  onSave: (newContent: any) => void;
  onExit: () => void;
}

const ICON_OPTIONS = [
  { id: 'cpu', icon: Cpu },
  { id: 'bot', icon: Bot },
  { id: 'building', icon: Building2 },
  { id: 'medical', icon: Stethoscope },
  { id: 'legal', icon: Scale },
  { id: 'sparkles', icon: Sparkles },
  { id: 'chat', icon: MessageSquare },
  { id: 'zap', icon: Zap },
  { id: 'shield', icon: Shield },
  { id: 'layers', icon: Layers },
  { id: 'check', icon: CheckCircle2 },
  { id: 'custom', icon: ImageIcon }
];

const AdminDashboard: React.FC<AdminProps> = ({ content, onSave, onExit }) => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localContent, setLocalContent] = useState(() => JSON.parse(JSON.stringify(content)));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (section: string, field: string, value: any) => {
    setLocalContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('settings', 'logoImageUrl', reader.result as string);
        handleChange('settings', 'logoIcon', 'custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPalette = (palette: typeof COLOR_PALETTES[0]) => {
    setLocalContent((prev: any) => ({
      ...prev,
      settings: {
        ...prev.settings,
        primaryColor: palette.primary,
        highlightColor: palette.highlight
      }
    }));
  };

  const handleArrayChange = (section: string, arrayField: string, index: number, field: string, value: any) => {
    setLocalContent((prev: any) => {
      const newArray = [...prev[section][arrayField]];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayField]: newArray
        }
      };
    });
  };

  const addItemToArray = (section: string, arrayField: string) => {
    const array = localContent[section][arrayField];
    const template = array.length > 0 ? JSON.parse(JSON.stringify(array[0])) : {};
    
    setLocalContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: [...prev[section][arrayField], template]
      }
    }));
  };

  const removeItemFromArray = (section: string, arrayField: string, index: number) => {
    setLocalContent((prev: any) => {
      const newArray = [...prev[section][arrayField]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayField]: newArray
        }
      };
    });
  };

  const handleSave = () => {
    onSave(localContent);
    alert('Publicado com sucesso!');
  };

  const tabs = [
    { id: 'appearance', label: 'Marca e Cores', icon: <Palette size={18} /> },
    { id: 'hero', label: 'Dobra Hero', icon: <Monitor size={18} /> },
    { id: 'inefficiency', label: 'Problemas', icon: <Database size={18} /> },
    { id: 'architecture', label: 'Arquitetura', icon: <Layers size={18} /> },
    { id: 'segments', label: 'Segmentos', icon: <Users size={18} /> },
    { id: 'plans', label: 'Planos', icon: <CreditCard size={18} /> },
    { id: 'finalCta', label: 'CTA Final', icon: <Layout size={18} /> },
  ];

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 w-full animate-in fade-in duration-300">
      
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-md">
           <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] tech-mono font-bold text-slate-500 uppercase tracking-widest">Editor de Elite</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2"><X size={24} /></button>
              </div>
              <div className="flex-1 space-y-2">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                    <div className="flex items-center gap-3">{tab.icon} {tab.label}</div>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
              <button onClick={onExit} className="w-full py-5 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2">
                <ArrowLeft size={18} /> Sair do Painel
              </button>
           </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-80 bg-slate-900 flex-col border-r border-slate-800">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-white font-bold text-xl tracking-tight">IA 3.0 ADM</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 space-y-3">
          <button onClick={handleSave} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            <Save size={16} /> Salvar Tudo
          </button>
          <button onClick={onExit} className="w-full bg-slate-800 text-slate-400 py-4 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 hover:text-white transition-all">
            <ArrowLeft size={16} /> Voltar ao Site
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-[100]">
          <span className="font-bold text-xs">ADMIN : {activeTabLabel?.toUpperCase()}</span>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 p-2 rounded-lg"><Save size={18} /></button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2"><Menu size={18} /></button>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <main className="flex-1 overflow-y-auto p-4 md:p-12 bg-slate-50/30">
          <div className="max-w-3xl mx-auto space-y-8">
            
            <header className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{activeTabLabel}</h2>
              <p className="text-slate-400 text-sm">Edite os elementos visuais e textuais desta seção.</p>
            </header>

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <InputGroup label="NOME DA LOGO" value={localContent.settings.logoText} onChange={(v: string) => handleChange('settings', 'logoText', v)} />
                  
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">ÍCONE / LOGO</label>
                    <div className="grid grid-cols-6 gap-2">
                      {ICON_OPTIONS.map(opt => (
                        <button key={opt.id} onClick={() => handleChange('settings', 'logoIcon', opt.id)} className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${localContent.settings.logoIcon === opt.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                          <opt.icon size={18} />
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase hover:bg-slate-800 transition-all"
                          >
                            <Upload size={14} /> Subir Arquivo de Logo
                          </button>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileUpload} 
                            accept="image/*" 
                            className="hidden" 
                          />
                        </div>
                        <div className="flex-1">
                          <InputGroup 
                            label="OU COLE A URL DA IMAGEM" 
                            value={localContent.settings.logoImageUrl} 
                            onChange={(v: string) => {
                              handleChange('settings', 'logoImageUrl', v);
                              handleChange('settings', 'logoIcon', 'custom');
                            }} 
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      
                      {localContent.settings.logoImageUrl && (
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden p-1">
                            <img src={localContent.settings.logoImageUrl} alt="Preview" className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-900 uppercase">Preview do Ícone</p>
                            <button onClick={() => handleChange('settings', 'logoImageUrl', '')} className="text-[9px] text-red-500 font-bold uppercase hover:underline">Remover</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <ColorInput label="COR PRIMÁRIA" value={localContent.settings.primaryColor} onChange={(v: string) => handleChange('settings', 'primaryColor', v)} />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <label className="text-[9px] font-bold text-slate-400 mb-4 block">PALETAS CURADAS</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {COLOR_PALETTES.map(p => (
                        <button key={p.id} onClick={() => applyPalette(p)} className={`p-2 rounded-lg border flex items-center gap-2 ${localContent.settings.primaryColor === p.primary ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}>
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.primary}}></div>
                          <span className="text-[10px] font-bold uppercase truncate">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'appearance' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  {Object.keys(localContent[activeTab] || {}).map(key => {
                    const val = localContent[activeTab][key];
                    if (typeof val === 'string') {
                      return <InputGroup key={key} label={key.toUpperCase()} value={val} onChange={(v: string) => handleChange(activeTab, key, v)} type={val.length > 50 ? 'textarea' : 'input'} />
                    }
                    return null;
                  })}
                </div>

                {Object.keys(localContent[activeTab] || {}).map(key => {
                  const arr = localContent[activeTab][key];
                  if (Array.isArray(arr)) {
                    return (
                      <div key={key} className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                           <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Lista de {key}</h3>
                           <button onClick={() => addItemToArray(activeTab, key)} className="text-blue-600 hover:text-blue-700 font-bold text-[10px] uppercase flex items-center gap-1">
                             <Plus size={14} /> Novo Item
                           </button>
                        </div>
                        <div className="space-y-4">
                          {arr.map((item: any, idx: number) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group">
                              <button onClick={() => removeItemFromArray(activeTab, key, idx)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                              <div className="space-y-4 pr-6">
                                {Object.keys(item).map(subKey => {
                                  const subVal = item[subKey];
                                  if (subKey.toLowerCase().includes('icon')) return <IconSelector key={subKey} label="ÍCONE" value={subVal} onChange={(v: string) => handleArrayChange(activeTab, key, idx, subKey, v)} />
                                  if (typeof subVal === 'string') return <InputGroup key={subKey} label={subKey.toUpperCase()} value={subVal} onChange={(v: string) => handleArrayChange(activeTab, key, idx, subKey, v)} type={subVal.length > 60 ? 'textarea' : 'input'} />
                                  if (Array.isArray(subVal)) {
                                    return (
                                      <div key={subKey} className="space-y-2 mt-2">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase">Linhas de Texto</label>
                                        {subVal.map((li: string, liIdx: number) => (
                                          <div key={liIdx} className="flex gap-2">
                                            <input value={li} onChange={(e) => {
                                              const newArr = [...subVal];
                                              newArr[liIdx] = e.target.value;
                                              handleArrayChange(activeTab, key, idx, subKey, newArr);
                                            }} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                                            <button onClick={() => {
                                              const newArr = [...subVal];
                                              newArr.splice(liIdx, 1);
                                              handleArrayChange(activeTab, key, idx, subKey, newArr);
                                            }} className="text-slate-300 hover:text-red-500"><X size={14} /></button>
                                          </div>
                                        ))}
                                        <button onClick={() => handleArrayChange(activeTab, key, idx, subKey, [...subVal, "Novo Item"])} className="w-full py-2 border border-dashed border-slate-200 rounded-lg text-slate-400 text-[9px] font-bold uppercase">+ Adicionar Linha</button>
                                      </div>
                                    )
                                  }
                                  return null;
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            
            <div className="h-20 lg:hidden"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, type = 'input', placeholder = '' }: any) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    {type === 'input' ? (
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base md:text-sm focus:ring-2 focus:ring-blue-500/10 outline-none" style={{ fontSize: '16px' }} />
    ) : (
      <textarea rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base md:text-sm focus:ring-2 focus:ring-blue-500/10 outline-none resize-none" style={{ fontSize: '16px' }} />
    )}
  </div>
);

const IconSelector = ({ label, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="grid grid-cols-6 gap-2">
      {ICON_OPTIONS.map(opt => (
        <button key={opt.id} onClick={() => onChange(opt.id)} className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${value === opt.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
          <opt.icon size={18} />
        </button>
      ))}
    </div>
  </div>
);

const ColorInput = ({ label, value, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="flex items-center gap-3">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono" />
    </div>
  </div>
);

export default AdminDashboard;
