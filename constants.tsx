
import React from 'react';

/**
 * DESIGN SYSTEM: PRECISION 3.0
 */
export const DESIGN_SYSTEM = {
  colors: {
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    secondary: '#0F172A',
    accent: '#38BDF8',
    bgLight: '#FFFFFF',
    bgSoft: '#F8FAFC',
    bgDark: '#020617',
    textMain: '#0F172A',
    textMuted: '#64748B',
    borderLight: '#F1F5F9',
  },
  typography: {
    display: 'font-bold tracking-tighter leading-[1.1] md:leading-[0.9]',
    mono: 'tech-mono font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]',
    body: 'text-slate-500 leading-relaxed text-xs md:text-sm',
  },
  shadows: {
    soft: 'shadow-sm',
    premium: 'shadow-xl shadow-blue-500/5',
    cta: 'shadow-xl shadow-blue-200',
    dark: 'shadow-2xl shadow-blue-500/10',
  },
  borderRadius: {
    full: 'rounded-full',
    large: 'rounded-[32px] md:rounded-[40px]',
    medium: 'rounded-2xl md:rounded-3xl',
    card: 'rounded-xl md:rounded-2xl',
    small: 'rounded-lg',
  },
  spacing: {
    section: 'py-20 px-4 md:py-32 md:px-12 lg:px-24',
    container: 'max-w-7xl mx-auto'
  }
};

export const COLOR_PALETTES = [
  { id: 'corporate', name: 'Corporate Blue', primary: '#2563EB', highlight: '#2563EB' },
  { id: 'royal', name: 'Royal Purple', primary: '#7C3AED', highlight: '#8B5CF6' },
  { id: 'emerald', name: 'Forest Elite', primary: '#059669', highlight: '#10B981' },
  { id: 'noir', name: 'Midnight Noir', primary: '#0F172A', highlight: '#64748B' },
  { id: 'crimson', name: 'Crimson Tech', primary: '#DC2626', highlight: '#EF4444' },
  { id: 'amber', name: 'Amber Luxury', primary: '#D97706', highlight: '#F59E0B' }
];

export const CONTENT = {
  settings: {
    logoText: "IA 3.0 Precision",
    logoIcon: "cpu",
    primaryColor: "#2563EB",
    highlightColor: "#2563EB",
    fontSizeHero: "72",
    fontSizeSubheadline: "18",
    fontSizeSectionTitle: "48",
    fontSizeBody: "14"
  },
  nav: [
    { label: 'SOLUÇÕES', href: '#solucoes' },
    { label: 'SEGMENTOS', href: '#segmentos' },
    { label: 'PLANOS', href: '#planos' }
  ],
  hero: {
    tag: "THE ROLE OF AI SOLUTIONS",
    headline: "A nova *consciência* do seu negócio.",
    subheadline: "Onde a precisão encontra o atendimento. Transforme cada contato em uma experiência de luxo tecnológico e alta conversão.",
    ctaPrimary: "Inicie a Revolução",
    ctaSecondary: "Conheça nossos planos",
    socialProof: "+500 CORPORAÇÕES DE ELITE"
  },
  inefficiency: {
    title: "O custo da ineficiência",
    subtitle: "Perdas invisíveis que comprometem o posicionamento da sua marca no mercado premium.",
    cards: [
      {
        icon: "chat",
        title: "Vácuo de Resposta",
        description: "A ausência de prontidão reflete falta de exclusividade e cuidado com o cliente."
      },
      {
        icon: "zap",
        title: "Latência Operacional",
        description: "No mercado B2B, o tempo é o ativo mais valioso. Cada minuto de espera é uma perda de status."
      },
      {
        icon: "cpu",
        title: "Ruído Cognitivo",
        description: "Atendimentos genéricos falham em captar a alma e as necessidades do seu lead."
      }
    ]
  },
  architecture: {
    title: "Arquitetura 3.0",
    features: [
      {
        icon: "bot",
        title: "Cognição de Elite",
        description: "Nossa rede neural é treinada para discernir a intenção real, não apenas responder palavras-chave."
      },
      {
        icon: "sparkles",
        title: "Disponibilidade Infinita",
        description: "Sua marca presente 24/7 com a mesma elegância e precisão técnica em qualquer horário."
      },
      {
        icon: "layers",
        title: "Integração Simbiótica",
        description: "Dados que fluem sem atrito para seu CRM, mantendo o histórico de inteligência centralizado."
      }
    ]
  },
  segments: {
    title: "Segmentos de Alta Precisão",
    cards: [
      {
        icon: "building",
        name: "Real Estate",
        items: ["Triagem de Perfil", "Visitas VIP"]
      },
      {
        icon: "sparkles",
        name: "Estética de Luxo",
        items: ["Protocolos VIP", "Agendamento Elite"]
      },
      {
        icon: "medical",
        name: "Medical Suite",
        items: ["Triagem Analítica", "Zero No-Show"]
      },
      {
        icon: "legal",
        name: "Legal Advisor",
        items: ["Intake Especializado", "Sigilo Total"]
      }
    ]
  },
  plans: {
    title: "Planos de Implementação",
    cards: [
      {
        name: "Plano One",
        price: "R$ 497/mês",
        description: "Ideal para profissionais autônomos que buscam automação básica.",
        features: ["1 Assistente Dedicado", "Integração WhatsApp", "Atendimento 24/7"],
        buttonText: "Começar Agora"
      },
      {
        name: "Plano Premium",
        price: "R$ 997/mês",
        description: "Foco em clínicas e escritórios que precisam de qualificação avançada.",
        features: ["IA Customizada", "Integração CRM", "Suporte Prioritário"],
        buttonText: "Mais Vendido"
      },
      {
        name: "Plano Elite",
        price: "Consultar",
        description: "Solução sob medida para corporações de grande porte.",
        features: ["Multi-Agente", "API Customizada", "SLA Garantido"],
        buttonText: "Falar com Consultor"
      }
    ]
  },
  roadmap: {
    title: "Jornada de Evolução",
    steps: [
      { id: "01", name: "Fusão de Canais", desc: "Unificamos seu hub inteligente." },
      { id: "02", name: "DNA Ingest", desc: "Absorção de tom de voz." }
    ]
  },
  sovereignty: {
    title: "Soberania Digital",
    cards: [
      {
        icon: "shield",
        title: "Tailor-Made AI",
        description: "Ajuste semântico total."
      }
    ]
  },
  finalCta: {
    title: "Domine o futuro hoje.",
    subtitle: "Seja a referência de inovação em seu setor."
  }
};
