
import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Settings, 
  Eye, 
  Save, 
  Layout, 
  Type, 
  Image as ImageIcon,
  ChevronRight,
  Plus,
  Trash2,
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
  ShieldCheck,
  Layers,
  Shield
} from 'lucide-react';
import { DESIGN_SYSTEM, CONTENT as INITIAL_CONTENT } from './constants';
import { Button } from './components/Button';
import AdminDashboard from './Admin';

// Mapeamento expandido para suportar todos os ícones do Admin
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(INITIAL_CONTENT);

  useEffect(() => {
    const savedContent = localStorage.getItem('precision_30_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Merge settings para garantir que novos campos existam
        setContent({
          ...INITIAL_CONTENT,
          ...parsed,
          settings: { ...INITIAL_CONTENT.settings, ...parsed.settings }
        });
      } catch (e) {
        console.error("Erro ao carregar conteúdo salvo", e);
      }
    }
  }, []);

  const saveContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('precision_30_content', JSON.stringify(newContent));
  };

  const { typography, shadows, borderRadius, spacing } = DESIGN_SYSTEM;
  const { 
    primaryColor, 
    highlightColor, 
    logoText, 
    logoIcon,
    fontSizeHero, 
    fontSizeSubheadline, 
    fontSizeSectionTitle, 
    fontSizeBody 
  } = content.settings;

  const dynamicStyles = (
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
          font-size: clamp(32px, 12vw, calc(var(--fs-hero) * 0.6)) !important; 
          line-height: 1.1 !important;
          word-break: break-word;
          font-weight: 800; 
        }
        .dynamic-subheadline-text { font-size: clamp(14px, 4vw, calc(var(--fs-subheadline) * 0.9)) !important; font-weight: 400; }
        .dynamic-section-title { 
          font-size: clamp(28px, 8vw, calc(var(--fs-section-title) * 0.7)) !important; 
          line-height: 1.1 !important;
          font-weight: 700;
        }
        .dynamic-body-text { font-size: clamp(12px, 3.5vw, calc(var(--fs-body) * 1)) !important; font-weight: 400; }

        @media (min-width: 768px) {
          .dynamic-hero-text { font-size: var(--fs-hero) !important; line-height: 0.95 !important; }
          .dynamic-subheadline-text { font-size: var(--fs-subheadline) !important; }
          .dynamic-section-title { font-size: var(--fs-section-title) !important; line-height: 1 !important; }
          .dynamic-body-text { font-size: var(--fs-body) !important; }
        }

        .text-primary-dynamic { color: var(--primary-color); }
        .bg-primary-dynamic { background-color: var(--primary-color); }
        .border-primary-dynamic { border-color: var(--primary-color); }
        .text-highlight-dynamic { color: var(--highlight-color); }
        
        .hero-highlight {
          color: var(--highlight-color);
        }
      `}
    </style>
  );

  const renderLogo = () => {
    const LogoIconComponent = IconMap[logoIcon] || Cpu;
    return (
      <div className="flex items-center gap-2 overflow-hidden max-w-[200px]">
        <div className={`w-8 h-8 flex-shrink-0 bg-primary-dynamic flex items-center justify-center rounded-lg shadow-sm`}>
          <LogoIconComponent className="text-white" size={18} />
        </div>
        <span className="font-bold text-base md:text-lg tracking-tight text-slate-900 truncate">
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
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden w-full">
      {dynamicStyles}
      
      {/* Admin Toggle */}
      <button 
        onClick={() => setIsAdmin(true)}
        className="fixed bottom-6 right-6 z-[100] bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group border border-white/10"
      >
        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
        <span className="text-[10px] tech-mono font-bold pr-2 hidden md:block">Painel ADM</span>
      </button>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 w-full">
        <div className={`${spacing.container} px-4 py-4 flex justify-between items-center w-full`}>
          {renderLogo()}
          
          <div className="hidden lg:flex items-center gap-10">
            {content.nav.map((item: any) => (
              <a key={item.label} href={item.href} onClick={(e) => handleScrollTo(e, item.href)} className={`${typography.mono} text-[10px] text-slate-400 hover:text-primary-dynamic transition-colors`}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="primary" className="hidden sm:block px-6 py-2.5 text-[9px] bg-primary-dynamic shadow-none hover:shadow-lg">Demo</Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-600 active:bg-slate-50 rounded-lg">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 absolute top-full left-0 w-full shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="p-6 flex flex-col gap-6">
              {content.nav.map((item: any) => (
                <a key={item.label} href={item.href} onClick={(e) => handleScrollTo(e, item.href)} className={`${typography.mono} text-xs text-slate-600 flex items-center justify-between py-2 border-b border-slate-50`}>
                  {item.label} <ChevronRight size={14} className="text-slate-300" />
                </a>
              ))}
              <Button variant="primary" className="w-full bg-primary-dynamic">Agendar Demo</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-20 px-4 overflow-hidden w-full">
        <div className={spacing.container}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-dynamic animate-pulse"></div>
                <span className={`${typography.mono} text-[9px] text-primary-dynamic`}>{content.hero.tag}</span>
              </div>
              <h1 className={`text-slate-900 mb-8 dynamic-hero-text`}>
                {renderHeadline(content.hero.headline)}
              </h1>
              <p className={`${typography.body} mb-10 dynamic-subheadline-text max-w-lg text-slate-500`}>
                {content.hero.subheadline}
              </p>
              <div className="flex items-center gap-4 mb-12 flex-wrap sm:flex-nowrap">
                <Button variant="primary" className="bg-primary-dynamic w-full sm:w-auto px-12">{content.hero.ctaPrimary}</Button>
                <Button variant="ghost" className="w-full sm:w-auto" onClick={(e) => handleScrollTo(e, '#planos')}>
                  {content.hero.ctaSecondary}
                </Button>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-50 pt-8">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className={`${typography.mono} text-[8px] text-slate-400`}>{content.hero.socialProof}</span>
              </div>
            </div>
            
            <div className="relative w-full max-w-[500px] mx-auto lg:max-w-none animate-in fade-in zoom-in duration-1000">
              <div className={`aspect-square bg-[#020617] ${borderRadius.large} relative overflow-hidden flex items-center justify-center shadow-2xl w-full border border-white/5`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(var(--primary-color),0.1),_transparent_70%)] opacity-50"></div>
                <div className="w-40 h-40 md:w-60 md:h-60 border border-blue-500/10 rounded-full animate-pulse flex items-center justify-center relative">
                   <div className="w-20 h-20 bg-blue-500/10 blur-3xl absolute rounded-full"></div>
                   {(() => {
                        const LogoIconHero = IconMap[logoIcon] || Cpu;
                        return <LogoIconHero className="text-blue-400 opacity-60" size={48} />;
                    })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seções Reutilizáveis */}
      <div className="w-full overflow-hidden">
        {/* Inefficiency */}
        <section id="solucoes" className={spacing.section}>
          <div className={spacing.container}>
            <div className="text-center mb-16">
              <h2 className="tracking-tight text-slate-900 mb-6 dynamic-section-title">{content.inefficiency.title}</h2>
              <p className={`${typography.body} max-w-lg mx-auto dynamic-body-text text-slate-500`}>{content.inefficiency.subtitle}</p>
            </div>
            <div className={`grid md:grid-cols-3 gap-6 w-full`}>
              {content.inefficiency.cards.map((card: any, i: number) => {
                const CardIcon = IconMap[card.icon] || MessageSquare;
                return (
                  <div key={i} className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 hover:border-primary-dynamic/20 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary-dynamic group-hover:scale-110 transition-transform">
                      <CardIcon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{card.title}</h3>
                    <p className={`${typography.body} dynamic-body-text text-slate-500`}>{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Architecture (Dark Section) */}
        <section className={`${spacing.section} bg-[#020617] md:mx-12 ${borderRadius.large} relative`}>
          <div className={spacing.container}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-white tracking-tight mb-12 dynamic-section-title">{content.architecture.title}</h2>
                <div className="space-y-10">
                  {content.architecture.features.map((feature: any, i: number) => {
                    const FeatIcon = IconMap[feature.icon] || Cpu;
                    return (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-12 h-12 flex-shrink-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-primary-dynamic group-hover:bg-primary-dynamic group-hover:text-white transition-all">
                          <FeatIcon size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2 text-base md:text-lg">{feature.title}</h4>
                          <p className="text-slate-400 text-xs md:text-sm leading-relaxed dynamic-body-text">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-[#0A0F1E] border border-white/5 p-12 rounded-[40px] shadow-2xl text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary-dynamic/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-primary-dynamic rounded-full flex items-center justify-center animate-pulse shadow-2xl shadow-primary-dynamic/20">
                      <Bot className="text-white" size={32} />
                    </div>
                  </div>
                  <span className={`${typography.mono} text-[10px] text-primary-dynamic block uppercase font-bold tracking-[0.3em]`}>Neural Network Synchronized</span>
              </div>
            </div>
          </div>
        </section>

        {/* Segments */}
        <section id="segmentos" className={spacing.section}>
          <div className={spacing.container}>
            <div className="text-center mb-16">
              <h2 className="tracking-tight text-slate-900 mb-6 dynamic-section-title">{content.segments.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.segments.cards.map((segment: any, i: number) => {
                const SegIcon = IconMap[segment.icon] || Building2;
                return (
                  <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl transition-all shadow-sm hover:border-primary-dynamic hover:shadow-lg group">
                    <div className="mb-6 text-primary-dynamic group-hover:scale-110 transition-transform"><SegIcon size={28} /></div>
                    <h4 className="text-base font-bold text-slate-900 mb-6">{segment.name}</h4>
                    <ul className="space-y-3">
                      {segment.items.map((item: string, idx: number) => (
                        <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-2">
                          <CheckCircle2 size={12} className="text-primary-dynamic mt-1 flex-shrink-0" />
                          <span className="dynamic-body-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="planos" className={`${spacing.section} bg-slate-50/50`}>
          <div className={spacing.container}>
            <div className="text-center mb-16">
              <h2 className="tracking-tight text-slate-900 mb-6 dynamic-section-title">{content.plans.title}</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {content.plans.cards.map((plan: any, i: number) => {
                const isPremium = plan.name.toLowerCase().includes('premium');
                return (
                  <div key={i} className={`bg-white p-10 rounded-[32px] border ${isPremium ? 'border-primary-dynamic shadow-2xl ring-4 ring-primary-dynamic/5' : 'border-slate-100'} flex flex-col relative transition-transform hover:scale-[1.02]`}>
                    {isPremium && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-dynamic text-white text-[9px] tech-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Destaque</span>}
                    <div className="mb-8">
                      <h4 className="text-slate-400 text-[9px] tech-mono font-bold uppercase tracking-widest mb-4">{plan.name}</h4>
                      <div className="text-4xl font-extrabold text-slate-900 mb-3">{plan.price}</div>
                      <p className="text-slate-500 text-[12px] leading-relaxed dynamic-body-text">{plan.description}</p>
                    </div>
                    <div className="space-y-4 mb-10 flex-1 border-t border-slate-50 pt-8">
                      {plan.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-primary-dynamic mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-[12px] dynamic-body-text">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant={isPremium ? 'primary' : 'secondary'} className={`w-full ${isPremium ? 'bg-primary-dynamic' : ''} py-5 text-[10px]`}>{plan.buttonText}</Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-slate-100 bg-white w-full">
        <div className={spacing.container}>
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] tech-mono text-slate-400 tracking-widest uppercase font-bold text-center">
              <p>© 2024 {logoText}. TODOS OS DIREITOS RESERVADOS.</p>
              <div className="flex items-center gap-2 text-primary-dynamic">
                <div className="w-1.5 h-1.5 bg-primary-dynamic rounded-full animate-pulse"></div>
                CORE_OPERATIONAL
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
