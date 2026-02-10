
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, 
  Bot,
  Building2,
  Stethoscope,
  Scale,
  Sparkles,
  MessageSquare,
  Zap,
  CheckCircle2,
  Menu,
  X,
  Layers,
  Shield,
  ArrowRight,
  ShieldCheck,
  Lock,
  ChevronRight
} from 'lucide-react';
import { DESIGN_SYSTEM, CONTENT as INITIAL_CONTENT } from './constants';
import { Button } from './components/Button';
import AdminDashboard from './Admin';

const IconMap: Record<string, any> = {
  cpu: Cpu,
  bot: Bot,
  building: Building2,
  medical: Stethoscope,
  legal: Scale,
  sparkles: Sparkles,
  chat: MessageSquare,
  zap: Zap,
  shield: Shield,
  layers: Layers,
  check: CheckCircle2
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(INITIAL_CONTENT);

  useEffect(() => {
    const savedContent = localStorage.getItem('precision_30_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(prev => ({
          ...prev,
          ...parsed,
          settings: { ...prev.settings, ...parsed.settings }
        }));
      } catch (e) {
        console.error("Erro ao carregar conteúdo", e);
      }
    }
  }, []);

  const saveContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('precision_30_content', JSON.stringify(newContent));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPassword === '326598') {
      setIsAdmin(true);
      setShowAuthModal(false);
      setAuthError(false);
      setAuthPassword('');
      window.scrollTo(0, 0);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const { 
    primaryColor, 
    highlightColor, 
    logoText, 
    logoIcon,
    logoImageUrl,
    fontSizeHero, 
    fontSizeSubheadline, 
    fontSizeSectionTitle, 
    fontSizeBody 
  } = content.settings;

  const dynamicStyles = useMemo(() => (
    <style>
      {`
        :root {
          --primary-color: ${primaryColor};
          --highlight-color: ${highlightColor};
          --fs-hero: ${fontSizeHero}px;
          --fs-subheadline: ${fontSizeSubheadline}px;
          --fs-section-title: ${fontSizeSectionTitle}px;
          --fs-body: ${fontSizeBody}px;
        }
        
        .dynamic-hero-text { 
          font-size: clamp(32px, 8vw, var(--fs-hero)) !important; 
          line-height: 1.1 !important;
          letter-spacing: -0.04em;
          font-weight: 800; 
        }
        .dynamic-subheadline-text { 
          font-size: clamp(14px, 1.8vw, var(--fs-subheadline)) !important; 
          line-height: 1.6;
        }
        .dynamic-section-title { 
          font-size: clamp(28px, 4vw, var(--fs-section-title)) !important; 
          line-height: 1.1 !important;
        }
        .dynamic-body-text { 
          font-size: var(--fs-body)px !important; 
        }

        .text-primary-dynamic { color: var(--primary-color); }
        .bg-primary-dynamic { background-color: var(--primary-color); }
        .border-primary-dynamic { border-color: var(--primary-color); }
        .hero-highlight { color: var(--highlight-color); }
        
        .tech-mono { font-family: 'JetBrains Mono', monospace; }
      `}
    </style>
  ), [primaryColor, highlightColor, fontSizeHero, fontSizeSubheadline, fontSizeSectionTitle, fontSizeBody]);

  const renderLogo = () => {
    if (logoIcon === 'custom' && logoImageUrl) {
      return (
        <div className="flex items-center gap-3 shrink-0 cursor-pointer">
          <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-1">
            <img 
              src={logoImageUrl} 
              alt="Logo" 
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:inline-block">
            {logoText}
          </span>
        </div>
      );
    }

    const LogoIconComponent = IconMap[logoIcon] || Cpu;
    return (
      <div className="flex items-center gap-2 shrink-0 cursor-pointer">
        <div className="w-8 h-8 flex-shrink-0 bg-primary-dynamic flex items-center justify-center rounded-lg shadow-sm">
          <LogoIconComponent className="text-white" size={18} />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900">
          {logoText}
        </span>
      </div>
    );
  };

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    if (!id.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const renderHeadline = (text: string) => {
    if (!text) return null;
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, i) => (
      i % 2 === 1 ? <span key={i} className="hero-highlight">{part}</span> : part
    ));
  };

  if (isAdmin) {
    return <AdminDashboard content={content} onSave={saveContent} onExit={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden w-full font-sans">
      {dynamicStyles}
      
      {/* Auth Modal Customizado (Substituindo o Prompt) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-900 border border-slate-100">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Acesso Restrito</h3>
              <p className="text-xs text-slate-400 font-medium mb-8 uppercase tracking-widest tech-mono">STABLE_BUILD_3.0</p>
              
              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                <input 
                  type="password" 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Credencial de Segurança"
                  autoFocus
                  className={`w-full bg-slate-50 border ${authError ? 'border-red-500 ring-2 ring-red-500/10' : 'border-slate-100'} rounded-2xl px-6 py-4 text-center text-sm outline-none focus:ring-4 focus:ring-blue-600/5 transition-all`}
                />
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl text-[10px] tech-mono uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                  Autenticar
                </button>
                {authError && <p className="text-[10px] font-bold text-red-500 uppercase tech-mono text-center">Credencial Inválida</p>}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-20">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex justify-between items-center">
          <div onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {renderLogo()}
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {content.nav.map((item: any) => (
              <a key={item.label} href={item.href} onClick={(e) => handleScrollTo(e, item.href)} className="text-[10px] tech-mono font-bold uppercase tracking-widest text-slate-400 hover:text-primary-dynamic transition-colors">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="primary" className="hidden sm:block px-6 py-2.5 text-[9px] bg-primary-dynamic shadow-none border-none">Agendar Demo</Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-600 focus:outline-none">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6 flex flex-col gap-6">
            {content.nav.map((item: any) => (
              <a key={item.label} href={item.href} onClick={(e) => handleScrollTo(e, item.href)} className="text-xs font-bold tech-mono text-slate-600 border-b border-slate-50 py-2">
                {item.label}
              </a>
            ))}
            <Button variant="primary" className="w-full bg-primary-dynamic border-none">Agendar Demo</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 w-full min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-dynamic"></div>
                <span className="text-[10px] tech-mono font-bold text-primary-dynamic tracking-[0.2em] uppercase">{content.hero.tag}</span>
              </div>
              <h1 className="text-slate-900 mb-8 dynamic-hero-text">
                {renderHeadline(content.hero.headline)}
              </h1>
              <p className="mb-10 dynamic-subheadline-text text-slate-500 max-w-xl leading-relaxed">
                {content.hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <Button variant="primary" className="bg-primary-dynamic w-full sm:w-auto px-10 py-5 border-none">{content.hero.ctaPrimary}</Button>
                <Button variant="ghost" className="w-full sm:w-auto text-slate-400 border-none" onClick={(e) => handleScrollTo(e, '#planos')}>
                  {content.hero.ctaSecondary}
                </Button>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-[9px] tech-mono font-bold text-slate-400 tracking-widest uppercase">{content.hero.socialProof}</span>
              </div>
            </div>
            
            <div className="relative animate-in fade-in zoom-in duration-1000 hidden lg:block">
              <div className="aspect-square bg-slate-950 rounded-[60px] relative overflow-hidden flex items-center justify-center shadow-3xl border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.15),_transparent_70%)]"></div>
                <div className="w-64 h-64 border border-blue-500/20 rounded-full flex items-center justify-center relative">
                   <div className="w-32 h-32 bg-blue-500/10 blur-3xl absolute rounded-full"></div>
                   <Bot className="text-blue-500 opacity-80" size={64} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inefficiency Section */}
      <section id="solucoes" className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="tracking-tight text-slate-900 mb-6 dynamic-section-title font-bold">{content.inefficiency.title}</h2>
            <p className="max-w-2xl mx-auto dynamic-body-text text-slate-500">{content.inefficiency.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.inefficiency.cards.map((card: any, i: number) => {
              const CardIcon = IconMap[card.icon] || MessageSquare;
              return (
                <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 hover:border-primary-dynamic/20 hover:shadow-2xl transition-all group">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-primary-dynamic group-hover:bg-primary-dynamic group-hover:text-white transition-all duration-500">
                    <CardIcon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{card.title}</h3>
                  <p className="dynamic-body-text text-slate-500 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section id="segmentos" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-16 tracking-tight text-slate-900 dynamic-section-title font-bold">{content.segments.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.segments.cards.map((segment: any, i: number) => {
              const SegIcon = IconMap[segment.icon] || Building2;
              return (
                <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl transition-all hover:shadow-xl hover:border-primary-dynamic/30 group">
                  <div className="mb-8 text-primary-dynamic group-hover:scale-110 transition-transform"><SegIcon size={32} /></div>
                  <h4 className="text-lg font-bold text-slate-900 mb-6">{segment.name}</h4>
                  <ul className="space-y-4">
                    {segment.items.map((item: string, idx: number) => (
                      <li key={idx} className="text-xs text-slate-500 flex items-center gap-3">
                        <CheckCircle2 size={14} className="text-primary-dynamic shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-16 tracking-tight text-slate-900 dynamic-section-title font-bold">{content.plans.title}</h2>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {content.plans.cards.map((plan: any, i: number) => {
              const isPremium = plan.name.toLowerCase().includes('premium');
              return (
                <div key={i} className={`bg-white p-10 rounded-[40px] border ${isPremium ? 'border-primary-dynamic shadow-2xl ring-4 ring-primary-dynamic/5' : 'border-slate-100'} flex flex-col relative transition-all hover:translate-y-[-8px]`}>
                  {isPremium && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-dynamic text-white text-[9px] tech-mono font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">Destaque</span>}
                  <div className="mb-10">
                    <h4 className="text-slate-400 text-[10px] tech-mono font-bold uppercase tracking-widest mb-4">{plan.name}</h4>
                    <div className="text-4xl font-black text-slate-900 mb-4">{plan.price}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="space-y-5 mb-12 flex-1 pt-8 border-t border-slate-50">
                    {plan.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-primary-dynamic shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant={isPremium ? 'primary' : 'secondary'} className={`w-full ${isPremium ? 'bg-primary-dynamic text-white' : ''} py-5 text-[10px] border-none`}>{plan.buttonText}</Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto text-center md:text-left">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] tech-mono text-slate-400 tracking-widest uppercase font-bold">
              <p>© 2024 {logoText}. TODOS OS DIREITOS RESERVADOS.</p>
              
              <button 
                onClick={(e) => { e.preventDefault(); setShowAuthModal(true); }}
                className="flex items-center gap-2 text-slate-300 hover:text-primary-dynamic transition-all focus:outline-none group p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                title="Painel de Controle"
                type="button"
              >
                <ShieldCheck size={16} className="text-slate-200 group-hover:text-primary-dynamic transition-colors" />
                <span className="tracking-widest">STABLE_BUILD_3.0</span>
              </button>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;