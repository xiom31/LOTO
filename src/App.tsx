/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  Tag, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Zap, 
  Droplets, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  XCircle,
  ClipboardCheck,
  RotateCcw,
  Power,
  Wrench,
  Eye,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

// --- Types & Data ---

type ModuleId = "intro" | "concepts" | "energy" | "steps" | "lototo" | "devices" | "sim" | "quiz" | "result";

interface Slide {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface Module {
  id: ModuleId;
  title: string;
  slides: Slide[];
}

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1.5 bg-slate-200 overflow-hidden rounded-full mt-4">
    <motion.div 
      className="h-full bg-amber-400"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const Badge = ({ children, color = "yellow" }: { children: React.ReactNode, color?: string }) => {
  const colors: Record<string, string> = {
    yellow: "bg-amber-100 text-amber-700 border-amber-200",
    red: "bg-rose-100 text-rose-700 border-rose-200",
    blue: "bg-indigo-100 text-indigo-700 border-indigo-200",
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState<ModuleId[]>([]);
  const [score, setScore] = useState(0);

  const modules: Module[] = [
    {
      id: "intro",
      title: "Bienvenida",
      slides: [
        {
          title: "SDE Piura SAC - Capacitación LOTO",
          content: (
            <div className="space-y-8">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1200" 
                  alt="Industrial Plant"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 space-y-3">
                  <Badge color="blue">SDE Piura Operaciones</Badge>
                  <h2 className="text-4xl font-black tracking-tight text-white leading-none">Seguridad LOTO</h2>
                  <p className="text-white/90 text-sm max-w-lg font-medium">Control vital de energía peligrosa en la generación eléctrica de Piura.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-indigo-600 rounded-[2rem] text-white shadow-xl flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight italic">Nuestro Objetivo</h3>
                    <p className="text-indigo-50 text-sm font-medium leading-relaxed">Garantizar que todo equipo esté aislado de energías críticas antes de ser intervenido.</p>
                  </div>
                </div>
                <div className="p-8 bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                      <AlertTriangle size={28} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight italic text-slate-900">Alerta de Riesgo</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">El 10% de fatalidades industriales se deben a fallas en el bloqueo de energía.</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "concepts",
      title: "Conceptos Clave",
      slides: [
        {
          title: "¿Qué es LOTO?",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div className="space-y-6">
                <div className="p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:border-amber-400 transition-colors group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-rose-600 rounded-2xl text-white flex items-center justify-center shadow-lg shadow-rose-200">
                      <Lock size={28} />
                    </div>
                    <h3 className="text-2xl font-black italic text-slate-900 tracking-tight">LOCKOUT</h3>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">Bloqueo físico que impide que una máquina sea operada o energizada accidentalmente.</p>
                </div>
                <div className="p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:border-amber-400 transition-colors group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-amber-400 rounded-2xl text-white flex items-center justify-center shadow-lg shadow-amber-100">
                      <Tag size={28} />
                    </div>
                    <h3 className="text-2xl font-black italic text-slate-900 tracking-tight">TAGOUT</h3>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">Etiquetado visual que comunica al personal la prohibición de operar el equipo.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-12 bg-indigo-600 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <motion.div 
                   animate={{ rotate: [0, 10, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="text-white mb-8 relative z-10"
                >
                  <Lock size={160} strokeWidth={1.5} />
                </motion.div>
                <div className="relative z-10 text-center space-y-2">
                  <p className="text-white font-black uppercase tracking-[0.2em] text-sm italic">Protección Industrial</p>
                  <div className="h-1 w-16 bg-amber-400 mx-auto rounded-full" />
                  <p className="text-indigo-100 text-xs italic font-semibold">"Seguridad en cada conexión"</p>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "energy",
      title: "Fuentes de Energía",
      slides: [
        {
          title: "Identificando Peligros en SDE Piura",
          content: (
            <div className="space-y-8">
              <p className="text-slate-500 font-bold italic border-l-4 border-amber-400 pl-4">En SDE Piura, el control de energías críticas evita paros no programados y protege la vida.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <Zap />, label: "Eléctrica", color: "bg-blue-500", text: "text-blue-600", desc: "Motores & Paneles" },
                  { icon: <Wrench />, label: "Mecánica", color: "bg-orange-500", text: "text-orange-600", desc: "Ejes & Volantes" },
                  { icon: <Droplets />, label: "Hidráulica", color: "bg-cyan-500", text: "text-cyan-600", desc: "Aceite a Presión" },
                  { icon: <Power />, label: "Neumática", color: "bg-emerald-500", text: "text-emerald-600", desc: "Aire Comprimido" },
                  { icon: <Flame />, label: "Térmica", color: "bg-rose-500", text: "text-rose-600", desc: "Vapor & Calor" },
                  { icon: <Droplets />, label: "Química", color: "bg-violet-500", text: "text-violet-600", desc: "Gas Natural" },
                  { icon: <RotateCcw />, label: "Potencial", color: "bg-slate-500", text: "text-slate-600", desc: "Gravedad" },
                  { icon: <Info />, label: "Especial", color: "bg-indigo-600", text: "text-indigo-600", desc: "Magnética" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-6 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm flex flex-col items-center text-center space-y-4 group transition-all hover:border-amber-400"
                  >
                    <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.label}</div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-tight">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "steps",
      title: "Los 7 Pasos",
      slides: [
        {
          title: "Secuencia de Consignación",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Preparación", d: "Identificar fuentes de energía en motores y turbinas." },
                { t: "Notificación", d: "Avisar a todos los empleados sobre la intervención." },
                { t: "Apagado", d: "Cierre ordenado según el manual de operación." },
                { t: "Aislamiento", d: "Separar físicamente el equipo de su alimentación." },
                { t: "Bloqueo y Etiqueta", d: "Instalar dispositivos personales de seguridad." },
                { t: "Energía Cero", d: "Liberar presiones y gases residuales del sistema." },
                { t: "Verificación", d: "Try-Out: Confirmar que el equipo no arranca." }
              ].map((step, i) => (
                <div key={i} className={`flex items-center gap-6 p-6 bg-white border-2 rounded-[2rem] shadow-sm transition-all hover:scale-[1.01] ${i === 4 ? "border-amber-400 ring-4 ring-amber-50" : "border-slate-100 hover:border-amber-200"}`}>
                  <div className={`flex-none w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-md ${i === 4 ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-400"}`}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-black uppercase text-sm tracking-tight">{step.t}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-tight mt-1">{step.d}</p>
                  </div>
                  <div className="ml-auto opacity-0 md:opacity-40">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              ))}
            </div>
          )
        }
      ]
    },
    {
      id: "piura",
      title: "Contexto Plantas",
      slides: [
        {
          title: "Turbinas y Motores SDE",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed border-l-4 border-amber-400 pl-6 font-medium text-lg">
                  En <span className="font-black text-slate-900 italic">SDE Piura SAC</span>, la seguridad es nuestra prioridad operacional. La transformación de gas requiere maestros en control de riesgo.
                </p>
                <ul className="space-y-4">
                  {[
                    "Motores de alta potencia (Gensets)",
                    "Turbinas a gas (Main TG)",
                    "Sistemas de Alta Tensión",
                    "Redes de Gas Natural"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold uppercase tracking-tight text-sm">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-600 rounded-[3rem] p-10 flex flex-col justify-center items-center gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="p-6 bg-white/20 rounded-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Power size={64} className="text-white" />
                 </div>
                 <div className="text-center space-y-2 relative z-10">
                   <h4 className="font-black text-white text-xl uppercase tracking-tighter italic whitespace-nowrap px-4 py-1 bg-amber-400 rounded-lg text-slate-900 inline-block shadow-lg">MISIÓN CERO ACCIDENTES</h4>
                   <p className="text-indigo-100 text-xs font-bold leading-relaxed max-w-[200px]">Respetar LOTO es el primer paso antes de tocar cualquier herramienta.</p>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "lototo",
      title: "LOTOTO",
      slides: [
        {
          title: "LOCK OUT - TAG OUT - TRY OUT",
          content: (
            <div className="space-y-8 flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <div className="text-center space-y-3">
                  <div className="w-24 h-24 bg-rose-600 rounded-[2rem] shadow-xl shadow-rose-200 text-white flex items-center justify-center border-4 border-white"><Lock size={40} /></div>
                  <p className="text-[11px] font-black tracking-widest text-rose-600 uppercase italic">BLOQUEO</p>
                </div>
                <div className="hidden md:block w-8 h-1 bg-slate-100 rounded-full" />
                <div className="text-center space-y-3">
                  <div className="w-24 h-24 bg-amber-400 rounded-[2rem] shadow-xl shadow-amber-100 text-white flex items-center justify-center border-4 border-white"><Tag size={40} /></div>
                  <p className="text-[11px] font-black tracking-widest text-amber-600 uppercase italic">ETIQUETADO</p>
                </div>
                <div className="hidden md:block w-8 h-1 bg-slate-100 rounded-full" />
                <div className="text-center space-y-3">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-24 h-24 bg-indigo-600 rounded-[2rem] shadow-xl shadow-indigo-200 text-white flex items-center justify-center border-4 border-white"
                  >
                    <Eye size={40} />
                  </motion.div>
                  <p className="text-[11px] font-black tracking-widest text-indigo-600 uppercase italic">VERIFICACIÓN</p>
                </div>
              </div>
              <div className="max-w-3xl bg-white border-2 border-slate-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h4 className="text-3xl font-black tracking-tight text-slate-900 leading-tight">La comprobación es <span className="text-indigo-600 italic underline decoration-amber-400 decoration-4 underline-offset-4">OBLIGATORIA</span>.</h4>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    "Try-Out" es la prueba de fuego. No confíes en el candado hasta que intentes arrancar el sistema y veas que <span className="text-rose-600 font-black">NO RESPONDE</span>. Solo allí estarás seguro.
                  </p>
                  <div className="pt-4 flex items-center gap-3">
                    <Badge color="blue">Regla de Oro</Badge>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Protocolo de Energía Cero • SDE Piura</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "sim",
      title: "Simulacro Virtual",
      slides: [
        {
          title: "Pon a prueba tus reflejos de seguridad",
          content: <LockoutSim onComplete={() => confetti()} />
        }
      ]
    },
    {
      id: "quiz",
      title: "Evaluación",
      slides: [
        {
          title: "Demuestra lo aprendido",
          content: <Quiz onFinish={(s) => setScore(s)} />
        }
      ]
    },
    {
      id: "result",
      title: "Capacitación Finalizada",
      slides: [
        {
          title: "¡Misión Cumplida, Operador!",
          content: (
            <div className="flex flex-col items-center justify-center py-10 space-y-12">
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 12 }}
                  className="w-48 h-48 bg-indigo-600 rounded-[3.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.3)] border-8 border-white ring-1 w-full h-full"
                >
                  <ShieldCheck size={80} className="text-white" />
                </motion.div>
                <div className="absolute -top-6 -right-6">
                   <div className="bg-amber-400 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-slate-900 shadow-xl">
                      <Zap size={24} fill="currentColor" />
                   </div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-5xl font-black italic tracking-tighter text-slate-900 uppercase">CAPACITACIÓN APROBADA</h3>
                <p className="text-slate-500 font-bold max-w-lg mx-auto text-lg leading-[1.2]">Haz completado con éxito el entrenamiento teórico y operacional para la planta <span className="text-indigo-600">SDE Piura SAC</span>.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-6">
                <div className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-center shadow-sm relative overflow-hidden group">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mb-2">Conocimiento LOTO</p>
                  <p className="text-4xl font-black tracking-tighter text-slate-900 italic">100% LISTO</p>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-400 group-hover:h-3 transition-all" />
                </div>
                <div className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-center shadow-sm relative overflow-hidden group">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mb-2">Aptitud Planta</p>
                  <p className="text-4xl font-black tracking-tighter text-emerald-600 italic uppercase">OPERATIVO</p>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-emerald-500 group-hover:h-3 transition-all" />
                </div>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="group flex items-center gap-3 text-xs font-black tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all uppercase"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                  <RotateCcw size={16} />
                </div>
                REINICIAR ENTRENAMIENTO
              </button>
            </div>
          )
        }
      ]
    }
  ];

  const currentModule = modules[currentModuleIndex];
  const currentSlide = currentModule.slides[currentSlideIndex];

  useEffect(() => {
    if (currentModule.id === "result") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FBBF24", "#EF4444", "#FFFFFF"]
      });
    }
  }, [currentModule.id]);

  const handleNext = () => {
    if (currentSlideIndex < currentModule.slides.length - 1) {
      setCurrentSlideIndex(s => s + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(m => m + 1);
      setCurrentSlideIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(s => s - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(m => m - 1);
      setCurrentSlideIndex(modules[currentModuleIndex - 1].slides.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-900 antialiased overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex-none h-20 px-8 border-b-4 border-amber-400 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-indigo-600 flex items-center justify-center rounded-xl shadow-lg ring-4 ring-indigo-50 group overflow-hidden">
            <Lock className="text-white group-hover:-rotate-12 transition-transform" size={24} />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight leading-none text-slate-900">SDE PIURA SAC</h1>
            <p className="text-[10px] text-amber-600 font-bold tracking-widest mt-1 uppercase italic">HSE • Seguridad Industrial</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {modules.map((m, i) => (
            <div 
              key={m.id}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentModuleIndex ? "bg-amber-400 scale-125 shadow-lg shadow-amber-200" : "bg-slate-200"}`}
            />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.article
            key={`${currentModuleIndex}-${currentSlideIndex}`}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            className="space-y-8"
          >
            <header className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge color="blue">{currentModule.title}</Badge>
                <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase">PÁGINA {currentSlideIndex + 1}/{currentModule.slides.length}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                {currentSlide.title}
              </h2>
            </header>

            <section className="min-h-[400px]">
              {currentSlide.content}
            </section>
          </motion.article>
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="flex-none h-20 px-12 border-t border-slate-100 bg-slate-900 text-white z-50">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-8">
          <div className="hidden md:block w-64">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black italic">Avance del Curso</p>
            <ProgressBar current={currentModuleIndex + 1} total={modules.length} />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={currentModuleIndex === 0 && currentSlideIndex === 0}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={handleNext}
              className="flex items-center gap-4 h-12 px-10 bg-amber-400 text-slate-900 font-black uppercase italic tracking-tighter transition-all hover:bg-amber-300 hover:scale-105 active:scale-95 rounded-2xl group shadow-xl shadow-amber-500/20"
            >
              <span>{currentModuleIndex === modules.length - 1 ? "Finalizar" : "Siguiente"}</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-components ---

function LockoutSim({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { text: "Identificar Válvula de Gas Principal", icon: <AlertTriangle /> },
    { text: "Cerrar flujo de combustible", icon: <Power /> },
    { text: "Colocar Candado de Seguridad", icon: <Lock /> },
    { text: "Instalar Tarjeta de Advertencia", icon: <Tag /> },
    { text: "Paso Final: Realizar Try-Out (Prueba)", icon: <Eye /> },
  ];

  const handleStep = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setStep(s => s + 1);
      onComplete();
    }
  };

  if (step >= steps.length) {
    return (
      <div className="h-[450px] flex flex-col items-center justify-center text-center space-y-6 bg-white border-2 border-slate-100 rounded-[3rem] shadow-sm">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200">
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black italic tracking-tighter text-slate-900">¡ÁREA ASEGURADA!</h3>
          <p className="text-slate-500 font-medium">Has ejecutado cada paso con precisión industrial.</p>
        </div>
        <button onClick={() => setStep(0)} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-lg">
          <RotateCcw size={16} /> REPETIR SIMULACIÓN
        </button>
      </div>
    );
  }

  return (
    <div className="h-[450px] relative group cursor-pointer bg-white overflow-hidden rounded-[3rem] border-2 border-slate-100 p-12 flex shadow-sm hover:border-amber-400 transition-all active:scale-[0.99]" onClick={handleStep}>
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-8 border-dashed border-indigo-600 rounded-full animate-spin-slow" />
        <div className="grid grid-cols-12 h-full gap-4 p-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-slate-200 rounded-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-between w-full">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge color="red">Simulación en Vivo</Badge>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">PASO {step + 1} DE 5</span>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter text-slate-900 max-w-lg leading-tight uppercase underline decoration-amber-400 decoration-8 underline-offset-8">
            {steps[step].text}
          </h3>
          <p className="text-indigo-600 text-sm font-black italic tracking-tight uppercase flex items-center gap-2">
            <Play size={14} fill="currentColor" /> Click para ejecutar acción en planta
          </p>
        </div>

        <div className="flex justify-center translate-y-4">
            <div className="relative">
                <motion.div 
                    key={step}
                    initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative z-10 border-4 border-white ring-8 ring-indigo-50"
                >
                    {React.cloneElement(steps[step].icon as React.ReactElement, { size: 56 })}
                </motion.div>
                <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full scale-150 animate-pulse" />
            </div>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner mt-8">
            <motion.div 
                className="h-full bg-amber-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
        </div>
      </div>
    </div>
  );
}

function Quiz({ onFinish }: { onFinish: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions = [
    {
      q: "¿Qué significan las siglas LOTO?",
      a: ["Lock Oil, Take Out", "Lock Out, Tag Out", "Light On, Time Off", "Level Over, Temperature On"],
      c: 1
    },
    {
      q: "¿Cuál es el propósito del 'Try Out'?",
      a: ["Limpiar el equipo", "Verificar que no haya energía residual", "Notificar a gerencia", "Pintar la válvula"],
      c: 1
    },
    {
      q: "Según OSHA, ¿quién puede retirar un candado?",
      a: ["Cualquier trabajador capacitado", "Solo la persona que lo colocó", "El guardia de seguridad", "El director de HSE únicamente"],
      c: 1
    },
    {
      q: "¿Qué se debe hacer ANTES de colocar los candados?",
      a: ["Notificar a los afectados", "Retirar las herramientas", "Limpiar la zona", "Irse a casa"],
      c: 0
    }
  ];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === questions[index].c;
    setIsCorrect(correct);
    if (correct) setCurrentScore(s => s + 1);

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(i => i + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        setComplete(true);
        onFinish(currentScore + (correct ? 1 : 0));
      }
    }, 1500);
  };

  if (complete) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-8 bg-white border-2 border-slate-100 rounded-[3rem] shadow-sm">
        <div className="relative">
            <div className="w-32 h-32 bg-amber-400 rounded-[2.5rem] flex items-center justify-center border-8 border-amber-50 shadow-xl relative z-10">
              <h3 className="text-4xl font-black text-white italic tracking-tighter">{Math.round((currentScore / questions.length) * 100)}%</h3>
            </div>
            <div className="absolute -top-4 -right-10 rotate-12">
                <Badge color={currentScore === questions.length ? "green" : "blue"}>OFICIAL</Badge>
            </div>
        </div>
        <div className="space-y-2">
            <p className="text-2xl font-black text-slate-900 leading-none">Evaluación Completada</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">Resultado: {currentScore} correctas de {questions.length}</p>
        </div>
        <button 
            onClick={() => { setIndex(0); setComplete(false); setCurrentScore(0); }}
            className="flex items-center gap-3 px-10 py-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all text-xs font-black tracking-widest uppercase shadow-lg shadow-indigo-100"
        >
            <RotateCcw size={16} /> REPETIR TEST
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="space-y-6">
        <div className="space-y-2">
           <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] italic">Pregunta de Seguridad</p>
           <h3 className="text-4xl font-black text-slate-900 leading-[1] tracking-tighter">
             {questions[index].q}
           </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {questions[index].a.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-6 text-left rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between group shadow-sm ${
                selected === i 
                  ? (isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-emerald-100" : "bg-rose-50 border-rose-500 text-rose-700 shadow-rose-100")
                  : selected !== null
                    ? "bg-slate-50 border-slate-100 opacity-40 grayscale"
                    : "bg-white border-slate-100 hover:border-amber-400 hover:scale-[1.02] hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-xs ${selected === i ? "bg-white text-slate-900" : "bg-slate-100 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600"}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="font-bold text-lg tracking-tight">{opt}</span>
              </div>
              {selected === i && (
                isCorrect ? <CheckCircle2 size={28} className="animate-bounce" /> : <XCircle size={28} className="animate-shake" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Interrogante {index + 1} de {questions.length}</span>
          <div className="flex gap-2">
            {questions.map((_, i) => (
                <div key={i} className={`w-10 h-2 rounded-full transition-all duration-500 ${i <= index ? "bg-indigo-600 shadow-lg shadow-indigo-100" : "bg-slate-200"}`} />
            ))}
          </div>
      </div>
    </div>
  );
}
