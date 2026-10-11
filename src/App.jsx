import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./components/Intro";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  AudioLines,
  Command,
  Menu,
  X,
  Zap,
} from "lucide-react";

import Cursor from "./components/Cursor";
import Scene3D from "./components/Scene3D";
import ProjectWorld from "./components/ProjectWorld";

gsap.registerPlugin(ScrollTrigger);


const projects = [
  {
    id: "01",
    name: "VOID PROTOCOL",
    type: "UNKNOWN DIMENSION",
    description:
      "Bo‘shliq ichida yaratilgan geometrik artefakt. Obyektni sudrab aylantiring va yangi burchaklarni kashf qiling.",
    color: "#b7ff36",
    shape: "knot",
    className: "void",
  },
  {
    id: "02",
    name: "NO SIGNAL",
    type: "SIGNAL CORRUPTION",
    description:
      "Signalning parchalanishi va qayta tiklanishi asosida yaratilgan raqamli kristall.",
    color: "#ff286f",
    shape: "crystal",
    className: "signal",
  },
  {
    id: "03",
    name: "AFTER ERROR",
    type: "SYSTEM REBIRTH",
    description:
      "Tizim xatosidan keyin paydo bo‘lgan abstrakt raqamli olam.",
    color: "#62a8ff",
    shape: "sphere",
    className: "error",
  },
  {
    id: "04",
    name: "CYBER NEXUS",
    type: "NEURAL NETWORK",
    description:
      "Neon energiya halqalari va raqamli geometriyadan qurilgan futuristik o‘lcham.",
    color: "#b65cff",
    shape: "nexus",
    className: "nexus",
  },
  {
    id: "05",
    name: "VOID RUNNER",
    type: "GRAVITY ANOMALY",
    description:
      "Gravitatsiya qonunlariga bo‘ysunmaydigan, fazoda suzuvchi abstrakt artefakt.",
    color: "#ff9d36",
    shape: "runner",
    className: "runner",
  },
  {
    id: "06",
    name: "NEURAL CHAOS",
    type: "SYNTHETIC REALITY",
    description:
      "Sun’iy ong va buzilgan geometriya uyg‘unlashgan dinamik raqamli dunyo.",
    color: "#36ffe0",
    shape: "neural",
    className: "neural",
  },
  
  {
    id: "07",
    name: "QUANTUM REACTOR",
    type: "ENERGY SINGULARITY",
    description:
      "Ko‘p qatlamli mexanik halqalar ichida aylanadigan kvant energiya yadrosi. Har bir detal o‘z orbitasida harakatlanadi.",
    color: "#ff3df2",
    shape: "reactor",
    className: "reactor",
  },
  {
    id: "08",
    name: "ECLIPSE ENGINE",
    type: "STELLAR COLLAPSE",
    description:
      "Qorong‘i yadro, yorqin yulduz va egilgan orbitalardan yaratilgan kosmik mexanizm.",
    color: "#ff653d",
    shape: "eclipse",
    className: "eclipse",
  },
  {
    id: "09",
    name: "FRACTURE CORE",
    type: "FRACTAL COLLISION",
    description:
      "Bir-biriga bog‘langan kristall fragmentlar va murakkab geometrik qatlamlardan iborat raqamli artefakt.",
    color: "#7c6bff",
    shape: "fracture",
    className: "fracture",
  },
  
{
  id: "10",
  name: "CUBE MATRIX",
  type: "GEOMETRIC ANOMALY",
  description:
    "Neon energiya bilan qoplangan, ichki yadrosi va bir-birining ichidan o'tuvchi geometrik qatlamlarga ega futuristik kub.",
  color: "#48f5ff",
  shape: "cube",
  className: "cube",
},
{
  id: "11",
  name: "PYRAMID X",
  type: "ANCIENT FUTURE",
  description:
    "Qadimiy piramida shakli va kelajak texnologiyalari uyg'unlashgan, energiya yadrosi atrofida aylanadigan 3D artefakt.",
  color: "#ffcc4d",
  shape: "pyramid",
  className: "pyramid",
},
{
  id: "12",
  name: "CYBER BIRD",
  type: "SYNTHETIC LIFEFORM",
  description:
    "Metall korpus, neon ko'zlar va harakatlanuvchi mexanik qanotlarga ega raqamli qush.",
  color: "#ff4f9a",
  shape: "bird",
  className: "bird",
},

{
  id: "13",
  name: "CYBER WOLF",
  type: "MECHANICAL PREDATOR",
  description:
    "Neon energiya bilan ishlaydigan mexanik bo‘ri. Metall zirhi, yorqin ko‘zlari va futuristik geometriyasi bilan raqamli olam qo‘riqchisi.",
  color: "#a8ff60",
  shape: "wolf",
  className: "wolf",
},
{
  id: "14",
  name: "PHANTOM SERPENT",
  type: "QUANTUM CREATURE",
  description:
    "Energiya halqalaridan tuzilgan kosmik ilon. Uning segmentlari to‘lqinsimon harakatlanib, fazoda suzib yuradi.",
  color: "#50eaff",
  shape: "serpent",
  className: "serpent",
},
{
  id: "15",
  name: "NEON SCORPION",
  type: "CYBERNETIC HUNTER",
  description:
    "Mexanik oyoqlar, energiyali qisqichlar va egiluvchan dumga ega futuristik kiber-chayon.",
  color: "#ff536b",
  shape: "scorpion",
  className: "scorpion",
},


];


function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="label-dot" />
      {children}
    </div>
  );
}

function App() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(null);
  const [sound, setSound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState("--:--:--");
  const audioContext = useRef(null);

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setSystemTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const elements = gsap.utils.toArray("[data-reveal]");

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(elements);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close().catch(() => {});
      }
    };
  }, []);

  const playTone = (frequency = 140, duration = 0.07) => {
    if (!sound) return;

    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      if (
        !audioContext.current ||
        audioContext.current.state === "closed"
      ) {
        audioContext.current = new AudioContextClass();
      }

      const context = audioContext.current;

      if (context.state === "suspended") {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      gain.gain.setValueAtTime(0.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration);
    } catch {
      // Ovoz ishlamasa, saytning qolgan qismi ishlashda davom etadi.
    }
  };

  const toggleSound = () => {
    setSound((previous) => !previous);
  };

  const openProject = (project) => {
    setSelected(project);
    playTone(260, 0.12);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <Intro />
      <Cursor />

      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-symbol">
            <Zap size={19} strokeWidth={2.5} />
          </span>
          <span>
            GLITCH<span className="brand-dash">-</span>EXE
          </span>
        </a>

        <div className="header-center">
          <span className="status-light" />
          SYSTEM ONLINE
        </div>

        <div className="header-actions">
          <span className="system-clock">{systemTime}</span>

          <button
            className={`sound-button ${sound ? "sound-on" : ""}`}
            onClick={toggleSound}
            aria-label={sound ? "Ovozni o‘chirish" : "Ovozni yoqish"}
            data-cursor
          >
            <AudioLines size={17} />
            <span>{sound ? "SOUND ON" : "SOUND OFF"}</span>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menyuni ochish"
            aria-expanded={menuOpen}
            data-cursor
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <a href="#about" onClick={closeMenu}>ABOUT</a>
        <a href="#worlds" onClick={closeMenu}>WORLDS</a>
        <a href="#system" onClick={closeMenu}>SYSTEM</a>
      </nav>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid" />

          <div className="hero-copy">
            <SectionLabel>EXPERIMENTAL DIGITAL UNIVERSE</SectionLabel>

            <h1>
              REALITY
              <br />
              IS A <span className="glitch-word" data-text="RENDER.">RENDER.</span>
            </h1>

            <p className="hero-description">
              A digital playground where code
              <br className="desktop-break" /> breaks reality into new dimensions.
            </p>

            <a
              className="primary-button"
              href="#worlds"
              onClick={() => playTone(190)}
              data-cursor
            >
              <span>ENTER THE WORLDS</span>
              <ArrowDownRight size={19} />
            </a>

            <div className="hero-coordinates">
              <span>LAT: 00.0000</span>
              <span>LON: 00.0000</span>
              <span>DIMENSION: {String(Math.floor(progress * 99)).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-top-label">
              <span>FIG. 001</span>
              <span>LIVE RENDER</span>
            </div>

            <Scene3D progress={progress} />

            <div className="visual-bottom-label">
              <span className="visual-cross">+</span>
              <span>ARTIFACT / 3D-001</span>
            </div>
          </div>

          <div className="hero-index">
            <span>01 / 04</span>
            <span>SCROLL TO DESCEND</span>
            <div className="scroll-line"><span /></div>
          </div>

          <div className="hero-side-text">BEYOND THE PIXEL — BEYOND THE KNOWN</div>
        </section>

        <div className="ticker" aria-label="Digital experience">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>
                REALITY IS OPTIONAL <i>✳</i> EXPLORE THE UNKNOWN <i>✳</i>
                BREAK THE PATTERN <i>✳</i> ENTER THE VOID <i>✳</i>
              </span>
            ))}
          </div>
        </div>

        <section className="about-section section-shell" id="about">
          <div className="about-index" data-reveal>001 — THE EXPERIMENT</div>

          <div className="about-content" data-reveal>
            <SectionLabel>BEYOND CONVENTIONAL DESIGN</SectionLabel>

            <h2>
              NOT JUST A WEBSITE.
              <br />
              <span>A DIFFERENT REALITY.</span>
            </h2>

            <p>
              GLITCH-EXE is an experimental digital environment. A place where
              geometry moves, signals distort and every interaction has a
              reaction. Explore the system. Find what lives beyond the screen.
            </p>

            <div className="about-stats">
              <div>
                <strong>03</strong>
                <span>UNIQUE WORLDS</span>
              </div>
              <div>
                <strong>3D</strong>
                <span>REAL-TIME ENGINE</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>NEW PERSPECTIVES</span>
              </div>
            </div>
          </div>
        </section>

        <section className="worlds-section section-shell" id="worlds">
          <div className="section-heading" data-reveal>
            <div>
              <SectionLabel>SELECT YOUR DIMENSION</SectionLabel>
              <h2>
                PROJECT
                <br />
                <span>WORLDS<span className="accent-dot">.</span></span>
              </h2>
            </div>

            <p>
              Three systems.
              <br />
              Three realities.
              <br />
              Choose your entry point.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <button
                className={`project-card ${project.className}`}
                key={project.id}
                onClick={() => openProject(project)}
                onMouseEnter={() => playTone(110 + Number(project.id) * 45, 0.05)}
                data-cursor
                style={{ "--project-color": project.color }}
              >
                <div className="project-card-top">
                  <span>{project.id} / DIMENSION</span>
                  <ArrowUpRight size={21} />
                </div>

                <div className="project-card-art">
                  <div className="project-ring ring-one" />
                  <div className="project-ring ring-two" />
                  

<div className={`project-core core-${project.shape}`}>
  {project.shape === "knot" && (
    <Command size={55} strokeWidth={1} />
  )}

  {project.shape === "crystal" && (
    <Zap size={55} strokeWidth={1} />
  )}

  {project.shape === "sphere" && (
    <span className="error-symbol">Ø</span>
  )}

  {project.shape === "nexus" && (
    <span className="world-symbol">✳</span>
  )}

  {project.shape === "runner" && (
    <span className="world-symbol">⟁</span>
  )}

  {project.shape === "neural" && (
    <span className="world-symbol">⌘</span>
  )}

  {project.shape === "reactor" && (
    <span className="world-symbol">⎔</span>
  )}

  {project.shape === "eclipse" && (
    <span className="world-symbol">◉</span>
  )}

  {project.shape === "fracture" && (
    <span className="world-symbol">✳</span>
  )}

  {project.shape === "cube" && (
    <div className="card-cube">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  )}

  {project.shape === "pyramid" && (
    <div className="card-pyramid">
      <div className="pyramid-face pyramid-face-one" />
      <div className="pyramid-face pyramid-face-two" />
      <div className="pyramid-face pyramid-face-three" />
      <div className="pyramid-face pyramid-face-four" />
    </div>
  )}

  {project.shape === "bird" && (
    <svg
      className="card-bird"
      viewBox="0 0 180 130"
      fill="none"
      aria-label="Cyber bird"
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M25 65 L65 48 L92 60 L125 35 L158 42 L135 57 L113 80 L80 91 Z" />
        <path d="M65 48 L76 18 L99 55" />
        <path d="M92 60 L120 95 L113 80" />
        <path d="M125 35 L139 19 L140 39" />
        <path d="M158 42 L173 35 L165 48" />
        <path d="M80 91 L70 109 L91 94" />
        <circle cx="143" cy="46" r="2.5" fill="currentColor" />
      </g>
    </svg>
  )}
  
{project.shape === "wolf" && (
  <svg className="card-animal card-wolf" viewBox="0 0 220 160" fill="none" aria-label="Cyber wolf">
    <defs>
      <linearGradient id="wolfMetal" x1="45" y1="20" x2="170" y2="140">
        <stop stopColor="#ffffff" stopOpacity=".95" />
        <stop offset=".45" stopColor="currentColor" stopOpacity=".7" />
        <stop offset="1" stopColor="currentColor" stopOpacity=".15" />
      </linearGradient>
    </defs>
    <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M48 55 L35 18 L70 39 L103 27 L132 42 L167 30 L157 61 L180 81 L151 105 L112 118 L75 104 L49 81 Z" fill="url(#wolfMetal)" fillOpacity=".25" />
      <path d="M103 27 L91 54 L111 72 L132 42" />
      <path d="M48 55 L76 61 L91 54 L70 39" />
      <path d="M157 61 L132 70 L111 72 L151 105" />
      <path d="M76 61 L70 86 L49 81" />
      <path d="M91 54 L78 75 L111 72 L132 70" />
      <path d="M74 104 L65 137 L83 132 L94 111" />
      <path d="M130 112 L143 137 L158 134 L151 105" />
      <path d="M157 61 L190 67 L180 81" />
      <path d="M90 65 L103 69" strokeWidth="4" />
      <path d="M130 65 L142 60" strokeWidth="4" />
      <path d="M103 86 L119 91 L134 84" />
    </g>
    <path d="M92 65 L104 68 L98 72 Z M131 64 L141 60 L136 69 Z" fill="#fff" />
    <path d="M103 86 L119 91 L134 84" stroke="#fff" strokeWidth="2" />
  </svg>
)}

{project.shape === "serpent" && (
  <svg className="card-animal card-serpent" viewBox="0 0 220 160" fill="none" aria-label="Phantom serpent">
    <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M35 118 C18 89 56 70 76 94 S118 131 130 98 S103 59 137 43 S174 42 178 25" strokeWidth="15" strokeOpacity=".13" />
      <path d="M35 118 C18 89 56 70 76 94 S118 131 130 98 S103 59 137 43 S174 42 178 25" strokeWidth="5" />
      <path d="M35 118 C18 89 56 70 76 94 S118 131 130 98 S103 59 137 43 S174 42 178 25" strokeWidth="1" stroke="#fff" strokeOpacity=".8" />
      <path d="M160 31 L174 13 L190 24 L181 42 L166 43 Z" fill="currentColor" fillOpacity=".2" />
      <path d="M181 42 L200 47 L184 52" />
      <path d="M170 31 L179 28" strokeWidth="4" />
      <path d="M48 103 L61 92 M68 97 L80 103 M105 112 L117 105 M126 88 L137 87 M145 50 L154 45" />
    </g>
    <circle cx="178" cy="30" r="3" fill="#fff" />
  </svg>
)}

{project.shape === "scorpion" && (
  <svg className="card-animal card-scorpion" viewBox="0 0 220 160" fill="none" aria-label="Neon scorpion">
    <g stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M84 90 L65 71 L44 79 L29 62 L45 48 L65 61 L89 74" />
      <path d="M126 90 L147 71 L169 79 L186 62 L170 48 L149 61 L122 74" />
      <path d="M86 83 L99 70 L120 74 L136 91 L126 110 L94 110 Z" fill="currentColor" fillOpacity=".22" />
      <path d="M94 110 L76 124 L57 117 L45 132" />
      <path d="M101 110 L94 132 L78 140" />
      <path d="M122 109 L140 124 L157 117 L172 132" />
      <path d="M128 102 L143 111 L153 104 L167 115" />
      <path d="M108 73 C99 51 117 41 135 38 S163 30 158 13" strokeWidth="7" strokeOpacity=".2" />
      <path d="M108 73 C99 51 117 41 135 38 S163 30 158 13" strokeWidth="3.5" />
      <path d="M148 24 L158 9 L169 19 L158 30 Z" fill="currentColor" fillOpacity=".35" />
      <path d="M94 86 L106 95 L119 85" />
      <circle cx="100" cy="80" r="2.5" fill="#fff" />
      <circle cx="120" cy="80" r="2.5" fill="#fff" />
    </g>
  </svg>
)}

</div>


                  <span className="project-coordinates">
                    {project.id === "01" ? "0x00 / NULL" : project.id === "02" ? "0xFF / LOST" : "0xEX / REBOOT"}
                  </span>
                </div>

                <div className="project-card-bottom">
                  <div>
                    <span className="project-type">{project.type}</span>
                    <h3>{project.name}</h3>
                  </div>
                  <span className="project-open"><ArrowUpRight size={20} /></span>
                </div>

                <span className="project-card-glow" />
              </button>
            ))}
          </div>

          <div className="worlds-footnote">
            <span>INTERACTION REQUIRED</span>
            <span>CLICK A WORLD TO INITIALIZE <ArrowUpRight size={14} /></span>
          </div>
        </section>

        <section className="system-section" id="system">
          <div className="system-grid" />
          <div className="system-inner section-shell" data-reveal>
            <SectionLabel>SYSTEM DIAGNOSTICS</SectionLabel>
            <h2>
              EVERYTHING
              <br />
              IS <span className="system-highlight">CONNECTED.</span>
            </h2>

            <div className="system-status-list">
              <div><span>RENDER ENGINE</span><strong><i /> ONLINE</strong></div>
              <div><span>DIMENSIONAL ACCESS</span><strong><i /> AVAILABLE</strong></div>
              <div><span>REALITY INTEGRITY</span><strong className="unstable"><i /> UNSTABLE</strong></div>
              <div><span>USER AUTHENTICATION</span><strong>GUEST / 001</strong></div>
            </div>

            <div className="system-terminal">
              <span className="terminal-prompt">&gt;</span>
              <span>the system is waiting for your input</span>
              <span className="terminal-caret" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-symbol"><Zap size={18} /></span>
          GLITCH-EXE
        </a>

        <span className="footer-center">BUILT OUTSIDE THE ORDINARY.</span>

        <a className="back-to-top" href="#home" data-cursor>
          BACK TO TOP <ArrowUpRight size={16} />
        </a>

        <div className="footer-bottom">
          <span>© 2026 GLITCH-EXE / EXPERIMENTAL BUILD</span>
          <span>REACT · THREE.JS · WEBGL</span>
        </div>
      </footer>

      {selected && (
        <div
          className="world-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="world-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="world-panel" style={{ "--project-color": selected.color }}>
            <div className="world-panel-header">
              <button className="world-exit" onClick={() => setSelected(null)} data-cursor>
                <ArrowLeft size={17} /> EXIT DIMENSION
              </button>
              <span>WORLD {selected.id} / LIVE</span>
              <button className="world-close" onClick={() => setSelected(null)} aria-label="Yopish" data-cursor>
                <X />
              </button>
            </div>

            <div className="world-stage">
              <ProjectWorld project={selected} />
              <div className="world-stage-label">DRAG TO ROTATE / SCROLL TO EXPLORE</div>
              <span className="world-stage-coordinate">XYZ / REALTIME</span>
            </div>

            <div className="world-description">
              <div>
                <SectionLabel>{selected.type}</SectionLabel>
                <h2 id="world-title">{selected.name}<span>.</span></h2>
                <p>{selected.description}</p>
              </div>

              <div className="world-instruction">
                <span>INTERACTION</span>
                <strong>01 — DRAG</strong>
                <strong>02 — ROTATE</strong>
                <strong>03 — EXPLORE</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;