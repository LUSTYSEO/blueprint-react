import React, { useState, useRef, useEffect } from 'react';

// Conteúdo dos 8 Módulos extraídos do Blueprint
const STAGES_DATA = [
  {
    id: "01",
    tag: "Mercado & Dados",
    title: "Mapeamento Universal de Mercado & Outliers",
    summary: "Arbitragem de audiência em moedas fortes (USD/EUR), matriz PUN de viabilidade e fórmula do Outlier Score (OS >= 3.0x).",
    content: `### 1.1 A Tese da Arbitragem de Moeda Forte
Operar a partir do Brasil com custos em Reais (BRL) e monetizar em Dólar (USD) ou Euro (EUR) cria uma assimetria financeira estrutural de 5x a 6x de margem líquida.

### 1.2 A Métrica de Demanda Outlier
Não criamos conteúdo por intuição. Mineramos anomalias estatísticas através da razão de Outlier Score:

OS = Visualizações do Vídeo / Mediana dos Últimos 15 Vídeos do Canal

• OS >= 3.0x: Pauta validada pelo algoritmo para públicos frios.
• V/H > 250 views/hora: Tráfego de descoberta ativa sustentada.`
  },
  {
    id: "02",
    tag: "Segurança de Rede",
    title: "Infraestrutura Anti-Bloqueio & Proxies ISP",
    summary: "Isolamento de impressões digitais de hardware (Canvas/WebGL), proxies residenciais fixos e protocolo de maturação de 14 dias.",
    content: `### 2.1 Browser Fingerprinting
Plataformas como YouTube e TikTok rastreiam a assinatura de renderização da GPU via Canvas e WebGL. O uso de navegadores anti-detect injeta ruído matemático único em cada perfil, isolando as máquinas.

### 2.2 Conexão Dedicada
• Proibido: VPNs comerciais (Nord, Express) e proxies de datacenter.
• Obrigatório: Proxies Residenciais Estáticos (ISP) com Fraud Score < 15/100 e status "Trustworthy" em iphey.com.
• Blindagem 2FA via chave TOTP sem dependência de números de telefone descartáveis.`
  },
  {
    id: "03",
    tag: "Retenção Algorítmica",
    title: "Engenharia Hub & Spoke & Neurociência",
    summary: "Arquitetura em cascata (Longo 8-15 min alimentado por Shorts de 60s), regra dos 2.5s e retenção para Mid-rolls.",
    content: `### 3.1 O Ecossistema Hub & Spoke
• Hub (Vídeo Longo): Foco em Watch Time profundo e inserção de anúncios intermediários (Mid-rolls a cada 3-4 minutos).
• Spoke (Shorts/Reels): Topo de funil viral para converter espectadores em tráfego para o Hub ou despachar links via DM.

### 3.2 A Regra dos 2.5 Segundos
Alternância mandatória de estímulos visuais a cada 1.5 a 2.5s (zooms, SFX de baixa frequência e quebra de padrão) para impedir o movimento involuntário de rolagem de tela.`
  },
  {
    id: "04",
    tag: "Automação CLI",
    title: "Arquitetura Multiagente com Claude Code",
    summary: "Controle determinístico via CLAUDE.md, scripts Python integrados via JSON e orquestração de linha de comando.",
    content: `### 4.1 Agentes Autônomos em Python
• analyzer.py: Consulta a YouTube Data API v3 e filtra os vídeos com maior Outlier Score.
• scriptwriter.py: Consome o JSON minerado e sintetiza roteiros com engenharia de ganchos em inglês nativo (en-US).
• orchestrator.py: Executa o fluxo de ponta a ponta sem intervenção manual no terminal.`
  },
  {
    id: "05",
    tag: "Renderização Headless",
    title: "Esteira Audiovisual & FFmpeg Programático",
    summary: "Síntese vocal com ElevenLabs/Fish Audio (word-level timestamps), download dinâmico de B-roll e compilação sem GUI.",
    content: `### 5.1 Alinhamento Temporal por Palavra
O script extrai os timestamps exatos de cada vocábulo para gerar legendas dinâmicas (.srt/.ass) em caixas curtas de 2 a 3 palavras no formato 9:16.

### 5.2 O Motor FFmpeg
Compilação programática com normalização de áudio para broadcast (-14 LUFS), áudio ducking na trilha sonora de fundo (-22dB) e corte automático de silêncios.`
  },
  {
    id: "06",
    tag: "Vendas sem Fricção",
    title: "Checkout Global Stripe & Funil Comment-to-DM",
    summary: "Micro-landing pages em Astro, gatilho de palavras-chave nos comentários e checkout em 1 clique (Apple/Google Pay).",
    content: `### 6.1 Psicologia do Consumidor Tier 1
O público americano compra infoprodutos de $9 a $27 USD por impulso puro. Formulários longos com CPF destroem a conversão.

### 6.2 O Mecanismo Comment-to-DM
O espectador comenta a palavra-chave (ex: 'SYSTEM'). O bot responde no feed inflando o engajamento do algoritmo e entrega o link rastreado instantaneamente na DM.`
  },
  {
    id: "07",
    tag: "Arbitragem de Moeda",
    title: "Monetização AdSense & Escala Horizontal 180D",
    summary: "Aprovação no YPP sem risco de Reused Content, testes A/B de CTR com publisher.py e replicação em Alemão/Espanhol.",
    content: `### 7.1 Blindagem Contra Reused Content
Linha editorial analítica e combinação de ativos proprietários garantem a aprovação do canal na análise do YouTube Partner Program.

### 7.2 Escala Horizontal por Localização
O mesmo vídeo validado nos EUA é redublado e localizado por IA para mercados de alto poder aquisitivo com baixa concorrência (Alemanha, Espanha, França).`
  },
  {
    id: "08",
    tag: "Operação & Caixa",
    title: "Playbook Diário (SOP) & Estrutura Fiscal PJ",
    summary: "Rotina de 45 min/dia, protocolos para destravar shadowban e recolhimento de apenas 6% de imposto no Simples Nacional.",
    content: `### 8.1 SOP Diário de 45 Minutos
Auditoria matinal de CTR, disparo do orchestrator.py no Claude Code e agendamento para o horário nobre de consumo da costa leste dos EUA.

### 8.2 Blindagem Fiscal no Brasil
Abertura de PJ enquadrada no Simples Nacional com isenção legal de PIS/COFINS/ISS na exportação de serviços de publicidade (alíquota efetiva de 6% a 8.5%).`
  }
];

export default function App() {
  // Fluxo de Cenas:
  // 'intro' (Olho piscando no escuro + 'A Caixa está aberta')
  // -> 'video' (Player de Vídeo)
  // -> 'reveal' (Personagem enigmático)
  // -> 'hub' (Documentos + Download)
  const [currentScene, setCurrentScene] = useState('intro');
  const [selectedStage, setSelectedStage] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showEyeText, setShowEyeText] = useState(false);
  const videoRef = useRef(null);

  // Animação da cena do olho (texto surge após 1.5s)
  useEffect(() => {
    if (currentScene === 'intro') {
      const timer = setTimeout(() => {
        setShowEyeText(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  // Transição do Olho para o Vídeo
  const handleStartExperience = () => {
    setCurrentScene('video');
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  // Gatilho disparado automaticamente quando o vídeo chega ao fim
  const handleVideoEnded = () => {
    setCurrentScene('reveal');
    setTimeout(() => {
      setCurrentScene('hub');
    }, 4200);
  };

  // Pular o vídeo para testes
  const handleSkipToReveal = () => {
    if (videoRef.current) videoRef.current.pause();
    handleVideoEnded();
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* ========================================================================= */}
      {/* CENA 0: O OLHO PISCANTE NO ESCURO // "A CAIXA ESTÁ ABERTA"                 */}
      {/* ========================================================================= */}
      {currentScene === 'intro' && (
        <section className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer" onClick={handleStartExperience}>
          
          {/* Luz de Fundo Pulsante do Olho */}
          <div className="absolute w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

          <div className="relative flex flex-col items-center max-w-lg z-10">
            
            {/* O Olho Enigmático com Animação de Piscar */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              
              {/* Anéis de Foco / Retícula Cibernética */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-spin [animation-duration:20s]"></div>
              <div className="absolute inset-3 rounded-full border border-dashed border-cyan-500/30 animate-spin [animation-duration:12s] [animation-direction:reverse]"></div>

              {/* Olho em SVG com animação de piscar nas pálpebras */}
              <div className="relative w-28 h-20 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                <svg className="w-full h-full text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" viewBox="0 0 100 60" fill="none">
                  
                  {/* Contorno do Olho */}
                  <path d="M5 30C20 10 80 10 95 30C80 50 20 50 5 30Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Íris com Glow */}
                  <circle cx="50" cy="30" r="16" stroke="#22d3ee" strokeWidth="2" fill="#042f2e" />
                  
                  {/* Pupila */}
                  <circle cx="50" cy="30" r="7" fill="#10b981" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx="50" cy="30" r="5" fill="#a7f3d0" />
                  
                  {/* Brilho da Córnea */}
                  <circle cx="47" cy="27" r="2" fill="#ffffff" />
                </svg>

                {/* Efeito de Pálpebra Piscando via CSS */}
                <div className="absolute inset-0 bg-black animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-0 pointer-events-none"></div>
              </div>
            </div>

            {/* Texto Enigmático Revelado */}
            <div className={`transition-all duration-1000 transform ${showEyeText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="font-mono text-xs text-emerald-400/80 uppercase tracking-[0.3em] block mb-3 animate-pulse">
                [ TRANSMISSÃO DETECTADA ]
              </span>

              <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wider mb-2">
                VEJA O VÍDEO.
              </h2>
              <h3 className="text-lg sm:text-xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-widest uppercase mb-8">
                A CAIXA ESTÁ ABERTA.
              </h3>

              <button
                onClick={handleStartExperience}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-500 hover:text-black text-emerald-400 font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:scale-105 cursor-pointer"
              >
                <span>[ ABRIR A CAIXA // INICIAR ]</span>
                <span className="text-base">&rarr;</span>
              </button>
            </div>

          </div>

          <div className="absolute bottom-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            Clique em qualquer lugar para acessar
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* CENA 1: VÍDEO CINEMATOGRÁFICO COM ABERTURA ENIGMÁTICA                     */}
      {/* ========================================================================= */}
      {currentScene === 'video' && (
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 animate-fadeIn">
          
          <div className="max-w-4xl w-full text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Transmissão Confidencial // A Caixa Aberta
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              O Protocolo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Arbitragem Global</span>
            </h1>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto font-mono">
              Assista à decodificação completa antes de desbloquear a documentação de engenharia.
            </p>
          </div>

          {/* Moldura Enigmática do Player */}
          <div className="relative max-w-4xl w-full rounded-2xl border border-emerald-500/30 bg-zinc-950/80 p-2 sm:p-3 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl group">
            
            {/* Linhas decorativas estilo HUD / Cyberpunk */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                onEnded={handleVideoEnded}
              >
                {/* Carrega o arquivo presente na pasta public/ */}
                <source src="/apresentacao_cinematica.mp4" type="video/mp4" />
                <source src="/video.mp4" type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>
          </div>

          {/* Botão de Atalho para Pular / Testar Transição */}
          <button
            onClick={handleSkipToReveal}
            className="mt-8 text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span>[ SIMULAR TÉRMINO DO VÍDEO &gt;&gt; ]</span>
          </button>
        </section>
      )}

      {/* ========================================================================= */}
      {/* CENA 2: A REVELAÇÃO DO PERSONAGEM (GLITCH & TRANSIÇÃO CINEMATOGRÁFICA)    */}
      {/* ========================================================================= */}
      {currentScene === 'reveal' && (
        <section className="fixed inset-0 z-50 bg-[#050608] flex flex-col items-center justify-center p-6 animate-fadeIn">
          
          <div className="relative flex flex-col items-center text-center max-w-md">
            
            {/* Avatar Enigmático com Olhos Neon / Glow */}
            <div className="relative w-44 h-44 mb-8">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl animate-pulse"></div>
              
              <div className="relative w-full h-full rounded-full border-2 border-emerald-400/80 p-1.5 shadow-[0_0_50px_rgba(16,185,129,0.3)] bg-zinc-950 flex items-center justify-center overflow-hidden">
                
                {/* Se avatar.png existir em public/, exibe a foto. Se não, exibe o avatar gráfico */}
                <img 
                  src="/avatar.png" 
                  alt="O Orquestrador" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                  className="w-full h-full object-cover rounded-full"
                />

                <svg className="w-32 h-32 text-emerald-400/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  <circle cx="10" cy="7.5" r="0.8" fill="#5eead4" />
                  <circle cx="14" cy="7.5" r="0.8" fill="#5eead4" />
                </svg>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent h-6 scanline pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-3 font-mono">
              <span className="text-emerald-400 text-xs uppercase tracking-widest block animate-pulse">
                // IDENTIDADE VERIFICADA // O ORQUESTRADOR
              </span>
              <p className="text-white text-lg font-bold tracking-tight">
                "A atenção global foi decodificada. Bem-vindo aos bastidores da máquina."
              </p>
              <p className="text-zinc-500 text-xs">
                Descriptografando os 8 módulos operacionais...
              </p>
            </div>

            <div className="w-56 h-1 bg-zinc-800 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
            </div>

            <button
              onClick={() => setCurrentScene('hub')}
              className="mt-6 text-xs font-mono text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Acessar Imediatamente &rarr;
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* CENA 3: CENTRAL DE DOCUMENTOS (LEITOR WEB INTERATIVO + DOWNLOAD)          */}
      {/* ========================================================================= */}
      {currentScene === 'hub' && (
        <div className="relative z-10 min-h-screen flex flex-col animate-fadeIn bg-[#07080b]">
          
          {/* Header Superior da Central */}
          <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm">
                  &gt;_
                </div>
                <div>
                  <span className="font-extrabold text-white text-base tracking-tight block leading-none">
                    GLOBAL ENGINE // DOCS
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400/80 uppercase tracking-widest">
                    Status: Online • A Caixa Aberta
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentScene('video')}
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                  Rever Vídeo
                </button>

                {/* BOTÃO MASTER DE DOWNLOAD (BAIXA O .ZIP QUE CRIAMOS) */}
                <a
                  href="/blueprint-global-ia.zip"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                >
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Baixar Blueprint (.ZIP)
                </a>
              </div>
            </div>
          </header>

          {/* Banner de Estatísticas da Operação */}
          <div className="border-b border-zinc-800/60 bg-zinc-900/30 py-3 px-6 font-mono text-xs text-zinc-400">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <span><strong className="text-white">RPM MÉDIO:</strong> $15 - $45 USD</span>
                <span className="hidden md:inline"><strong className="text-white">CÂMBIO:</strong> ~5.5x BRL</span>
                <span><strong className="text-white">ESTEIRA:</strong> Claude Code + FFmpeg</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                SISTEMA OPERACIONAL ATIVO
              </div>
            </div>
          </div>

          {/* Área Principal: Sidebar de Módulos + Leitor do Conteúdo */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Navegador Lateral dos 8 Módulos */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 px-1">
                // Índice dos Processos (8 Etapas)
              </span>

              {STAGES_DATA.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${
                    selectedStage === idx
                      ? 'border-emerald-500/80 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                      : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-xs font-bold ${selectedStage === idx ? 'text-emerald-400' : 'text-zinc-500'}`}>
                        ETAPA {stage.id}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border border-zinc-800 text-zinc-400 bg-zinc-950">
                        {stage.tag}
                      </span>
                    </div>
                    <h3 className={`text-sm font-semibold leading-snug ${selectedStage === idx ? 'text-white' : 'text-zinc-300'}`}>
                      {stage.title}
                    </h3>
                  </div>
                  <span className={`font-mono text-lg ${selectedStage === idx ? 'text-emerald-400' : 'text-zinc-700'}`}>
                    &rarr;
                  </span>
                </button>
              ))}
            </div>

            {/* Visualizador de Documentação */}
            <div className="lg:col-span-8">
              <div className="border border-zinc-800 bg-zinc-950/70 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative shadow-2xl">
                
                {/* Cabeçalho do Documento Atual */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-6">
                  <div>
                    <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-1">
                      Módulo Selecionado // ETAPA {STAGES_DATA[selectedStage].id}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {STAGES_DATA[selectedStage].title}
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(STAGES_DATA[selectedStage].content);
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 bg-zinc-900 font-mono text-xs text-zinc-300 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    {isCopied ? "Copiado!" : "Copiar Trecho"}
                  </button>
                </div>

                {/* Resumo Rápido */}
                <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 mb-8 font-mono text-xs text-emerald-300 leading-relaxed">
                  <strong>PROCESSO-CHAVE:</strong> {STAGES_DATA[selectedStage].summary}
                </div>

                {/* Corpo do Documento Markdown Pré-formatado */}
                <div className="prose prose-invert max-w-none font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-[#0b0c10] p-6 rounded-xl border border-zinc-800/80">
                  {STAGES_DATA[selectedStage].content}
                </div>

                {/* Navegação Inferior Próximo / Anterior */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800 font-mono text-xs">
                  <button
                    disabled={selectedStage === 0}
                    onClick={() => setSelectedStage(prev => prev - 1)}
                    className="text-zinc-500 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    &larr; Etapa Anterior
                  </button>

                  <span className="text-zinc-600">
                    {selectedStage + 1} de {STAGES_DATA.length}
                  </span>

                  <button
                    disabled={selectedStage === STAGES_DATA.length - 1}
                    onClick={() => setSelectedStage(prev => prev + 1)}
                    className="text-emerald-400 hover:text-emerald-300 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors flex items-center gap-1 font-bold cursor-pointer"
                  >
                    Próxima Etapa &rarr;
                  </button>
                </div>

              </div>
            </div>

          </main>
        </div>
      )}

    </div>
  );
}
