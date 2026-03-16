import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './App.css'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function AnimatedSection({ children, className = '', delay = '', tag: Tag = 'section', ...props }) {
  const [ref, visible] = useInView()
  return (
    <Tag ref={ref} className={`fade-up ${visible ? 'in-view' : ''} ${delay} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

import logoSrc from './assets/logo.svg'
import iconUpload from './assets/icon-upload.svg'
import iconBuild from './assets/icon-build.svg'
import iconSpecifiers from './assets/icon-specifiers.svg'
import iconAi from './assets/icon-ai.svg'
import iconCustom from './assets/icon-custom.svg'
import iconCalc from './assets/icon-calc.svg'
import iconPdf from './assets/icon-pdf.svg'
import iconSync from './assets/icon-sync.svg'
import calcMain from './assets/calc-main.png'
import ctaImage from './assets/cta-painting.png'
import badgeEngineers from './assets/badge-engineers.svg'
import illusEyesOutline from './assets/illus-eyes-outline.svg'
import illusEyesIris from './assets/illus-eyes-iris.svg'
import illusEyesPupil from './assets/illus-eyes-pupil.svg'
import illusComputer from './assets/illus-computer.svg'
import illusChatBubble from './assets/illus-chat-bubble.svg'
import illusChatShadow from './assets/illus-chat-shadow.svg'
import illusChatLine1 from './assets/illus-chat-line1.svg'
import balloonP00 from './assets/balloon-p00.svg'
import balloonP01 from './assets/balloon-p01.svg'
import balloonP02 from './assets/balloon-p02.svg'
import balloonP03 from './assets/balloon-p03.svg'
import balloonP04 from './assets/balloon-p04.svg'
import balloonP05 from './assets/balloon-p05.svg'
import balloonP06 from './assets/balloon-p06.svg'
import balloonP07 from './assets/balloon-p07.svg'
import balloonP08 from './assets/balloon-p08.svg'
import balloonP09 from './assets/balloon-p09.svg'
import balloonP10 from './assets/balloon-p10.svg'
import balloonP11 from './assets/balloon-p11.svg'
import balloonP12 from './assets/balloon-p12.svg'
import balloonP13 from './assets/balloon-p13.svg'
import balloonP14 from './assets/balloon-p14.svg'
import balloonP15 from './assets/balloon-p15.svg'
import balloonP16 from './assets/balloon-p16.svg'
import balloonP17 from './assets/balloon-p17.svg'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#d7e0fd] text-[#102d92]">
      {children}
    </span>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card bg-[#f8f9fc] border border-[#eaecf5] rounded-2xl p-6 flex flex-col gap-5 flex-1">
      <div className="bg-[#1a41a6] rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
        <img src={icon} alt="" className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-[#101828] text-base leading-6">{title}</h3>
        <p className="text-[#475467] text-sm leading-[1.625]">{description}</p>
      </div>
    </div>
  )
}

const BLUE = '#1A41A6'
const LIGHT = '#f1f4fe'

const EyeGazeContext = createContext(null)

const EYE_PATH = "M69.8816 20.3198C69.8816 20.3198 54.5904 41.25 35.7277 41.25C16.8651 41.25 1.57388 20.3198 1.57388 20.3198C1.57388 20.3198 16.8651 1.25 35.7277 1.25C54.5904 1.25 69.8816 20.3198 69.8816 20.3198Z"
const EYE_CENTERS = [{ cx: 81.15, cy: 96.61 }, { cx: 169.86, cy: 96.61 }]

function EyesIllustration() {
  const cursor = useContext(EyeGazeContext)
  const svgRef = useRef(null)
  const [offsets, setOffsets] = useState([{ dx: 0, dy: 0 }, { dx: 0, dy: 0 }])

  useEffect(() => {
    if (!cursor || !svgRef.current) {
      setOffsets([{ dx: 0, dy: 0 }, { dx: 0, dy: 0 }])
      return
    }
    const rect = svgRef.current.getBoundingClientRect()
    const scaleX = 251 / rect.width
    const scaleY = 208 / rect.height
    const svgX = (cursor.x - rect.left) * scaleX
    const svgY = (cursor.y - rect.top) * scaleY
    const maxTravel = 5
    setOffsets(EYE_CENTERS.map(({ cx, cy }) => {
      const dx = svgX - cx
      const dy = svgY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist === 0) return { dx: 0, dy: 0 }
      const scale = Math.min(dist, maxTravel) / dist
      return { dx: dx * scale, dy: dy * scale }
    }))
  }, [cursor])

  return (
    <div className="w-full flex items-center justify-center" style={{ height: 208 }}>
      <svg ref={svgRef} width="251" height="208" viewBox="0 0 251 208" fill="none" xmlns="http://www.w3.org/2000/svg">
        {EYE_CENTERS.map(({ cx, cy }, i) => {
          const { dx, dy } = offsets[i]
          return (
            <g key={i}>
              <path d={EYE_PATH} transform={`translate(${cx - 35.728}, ${cy - 21.25})`} stroke={BLUE} strokeWidth="2.5" fill="none"/>
              <circle cx={cx + dx} cy={cy + dy} r={12.5962} stroke={BLUE} strokeWidth="2.5" fill="none"/>
              <circle cx={cx + dx} cy={cy + dy} r={6.4615} fill={BLUE}/>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function ComputerIllustration() {
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 208 }}>
      <img src={illusComputer} alt="" style={{ width: 126.936, height: 114.417 }} />
    </div>
  )
}

function ChatIllustration() {
  // Pattern: 5 rows × 6 cols of small connected-plus symbols
  const pattern = []
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 10; col++) {
      const x = 14 + col * 9
      const y = 59 + row * 9
      pattern.push(
        <g key={`${row}-${col}`} stroke={BLUE} strokeWidth="1.2" strokeLinecap="round">
          <line x1={x} y1={y - 3} x2={x} y2={y + 3}/>
          <line x1={x - 3} y1={y} x2={x + 3} y2={y}/>
        </g>
      )
    }
  }
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 208 }}>
      <svg width="168" height="98" viewBox="0 0 168 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bubble outline with tail */}
        <path d="M1 16C1 7.7 7.7 1 16 1H152C160.3 1 167 7.7 167 16V68C167 76.3 160.3 83 152 83H94C90 83 86.2 84.4 83.2 86.9L74.5 93.7C73.5 94.5 72.1 93.8 72.1 92.5C72.1 87.2 67.8 83 62.5 83H16C7.7 83 1 76.3 1 68V16Z"
          stroke={BLUE} strokeWidth="2"/>
        {/* Cursor */}
        <line x1="16" y1="16" x2="16" y2="34" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round"/>
        {/* Crosshatch pattern */}
        {pattern}
        {/* Blue dot */}
        <circle cx="151" cy="69" r="9" fill={BLUE}/>
      </svg>
    </div>
  )
}

function BalloonIllustration() {
  const pieces = [
    [balloonP00, 88.93,  44.99,  73.14, 118.02],
    [balloonP01, 115.36, 46.85,  20.28, 54.49],
    [balloonP02, 130.12, 46.85,  20.83, 54.07],
    [balloonP03, 100.0,  46.85,  20.28, 53.47],
    [balloonP04, 139.93, 49.92,  20.28, 46.70],
    [balloonP05, 90.79,  49.92,  19.65, 46.70],
    [balloonP06, 115.36, 147.64, 20.28, 13.51],
    [balloonP07, 103.06, 108.91, 15.99, 31.34],
    [balloonP08, 131.95, 108.91, 15.36, 31.34],
    [balloonP09, 118.42, 102.77, 14.16, 12.90],
    [balloonP10, 120.28, 129.82, 9.84,  10.44],
    [balloonP11, 112.90, 142.11, 24.57, 4.30],
    [balloonP12, 130.12, 100.31, 14.73, 15.97],
    [balloonP13, 106.15, 100.31, 15.36, 15.97],
    [balloonP14, 115.36, 117.52, 20.28, 4.93],
    [balloonP15, 135.64, 95.39,  20.28, 20.90],
    [balloonP16, 94.45,  94.78,  21.51, 20.90],
    [balloonP17, 118.42, 124.28, 14.16, 3.70],
  ]
  return (
    <div className="w-full" style={{ height: 208 }}>
      <svg width="100%" height="208" viewBox="0 0 251 208.77" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        {pieces.map(([src, x, y, w, h], i) => (
          <image key={i} href={src} x={x} y={y} width={w} height={h} />
        ))}
      </svg>
    </div>
  )
}

function EyeGazeSection({ children }) {
  const [cursor, setCursor] = useState(null)
  return (
    <EyeGazeContext.Provider value={cursor}>
      <AnimatedSection
        className="bg-white py-16 md:py-24 px-5 md:px-8"
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setCursor(null)}
      >
        {children}
      </AnimatedSection>
    </EyeGazeContext.Provider>
  )
}

function ProblemCard({ badge, title, illustration }) {
  return (
    <div className="bg-[#f1f4fe] rounded-2xl p-[21px] flex flex-col justify-between shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#fcfcfd] text-[#0e2267] w-fit">
        {badge}
      </span>
      {illustration}
      <p className="font-normal text-[#101828] text-[18px] leading-[28px]">{title}</p>
    </div>
  )
}

function YourInputPanel() {
  const fields = [
    { label: 'Concrete Grade', value: '32' },
    { label: 'Bar type', value: 'Standard' },
    { label: 'Slab depth', value: '160' },
    { label: 'Configuration', value: 'Slab to slab connection' },
    { label: 'Type', value: '5' },
  ]
  return (
    <div className="bg-[#f9fafb] border border-white/80 rounded-[4px] shadow-[-8px_18px_42px_0px_rgba(68,100,161,0.3)] p-[9px] flex flex-col gap-3 w-[116px]">
      <p className="text-[#1d2939] text-[9px] font-bold leading-none">Your input</p>
      <div className="flex flex-col gap-2">
        {fields.map(f => (
          <div key={f.label} className="flex flex-col gap-[3px]">
            <p className="text-[#344054] text-[5.5px] font-medium leading-none">{f.label}</p>
            <div className="bg-white border border-[#d0d5dd] rounded-[3px] px-[5px] py-[3px] flex items-center justify-between shadow-[0px_0.4px_0.8px_0px_rgba(16,24,40,0.05)]">
              <span className="text-[#101828] text-[6px] font-medium leading-none truncate">{f.value}</span>
              <span className="text-[#667085] text-[6px] ml-1">▾</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const featuresRef = useRef(null)

  function handleFeatureMouseMove(e) {
    const el = featuresRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const maxOffset = 40
    const shX = -((dx / (rect.width / 2)) * maxOffset).toFixed(1)
    const shY = ((dy / (rect.height / 2)) * maxOffset).toFixed(1)
    el.style.setProperty('--sh-x', `${shX}px`)
    el.style.setProperty('--sh-y', `${shY}px`)
  }

  function handleFeatureMouseLeave() {
    const el = featuresRef.current
    if (!el) return
    el.style.removeProperty('--sh-x')
    el.style.removeProperty('--sh-y')
  }

  return (
    <div className="font-sans text-[#101828] bg-white">

      {/* Header */}
      <header className="bg-[#f2f4f7] border-b border-[#e4e7ec]">
        <div className="max-w-[1232px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <img src={logoSrc} alt="SpectaCalc" style={{ width: 90, height: 46, objectFit: 'contain' }} />
          <div className="flex items-center gap-6 md:gap-16">
            <nav className="hidden md:flex gap-16 text-[#2a3036] font-medium text-base">
              <a href="#" className="hover:text-[#1a41a6] transition-colors">Listings</a>
              <a href="#" className="hover:text-[#1a41a6] transition-colors">Articles</a>
            </nav>
            <div className="flex gap-2 md:gap-3">
              <button className="hidden sm:block px-4 py-2.5 bg-white border border-[#d0d5dd] rounded-lg text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors">
                Sign up
              </button>
              <button className="px-4 py-2.5 bg-[#1a41a6] border border-[#1a41a6] rounded-lg text-sm font-semibold text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#153589] transition-colors">
                Log in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <AnimatedSection className="hero-animated py-24 md:py-36 px-5 md:px-8">
        <div className="max-w-[768px] mx-auto flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-1.5 bg-[#d7e0fd] px-2.5 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a41a6]" />
            <span className="text-xs font-medium text-[#102d92]">Engineering Product Discovery Platform</span>
          </div>
          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-semibold leading-[1.05] md:leading-none tracking-[-1px] md:tracking-[-1.5px] text-white">
            Turn product datasheets into{' '}
            <span className="text-[#bfcffc]">living design tools</span>
          </h1>
          <p className="text-[#bfcffc] text-base md:text-lg leading-[1.625] max-w-[672px]">
            Bridging manufacturers and specifiers through interactive calculations. Replace static PDFs with live parametric calculators that process actual project parameters and engineering formulas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
            <button className="bg-white text-[#1a41a6] font-semibold text-base px-6 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              Book a call <span>→</span>
            </button>
            <button className="bg-[#d7e0fd] border border-[#d0d5dd] text-[#1a41a6] font-semibold text-base px-6 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#c6d3fb] transition-colors">
              See how it works
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Trust bar */}
      <AnimatedSection className="bg-[#f9fafb] border-y border-[#e4e7ec] py-8">
        <div className="max-w-[1232px] mx-auto px-5 md:px-8 flex flex-col items-center gap-6">
          <p className="text-[#98a2b3] text-xs font-semibold uppercase tracking-[1.2px]">
            Trusted by engineers from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['ARUP', 'WSP', 'aurecon', 'BG&E'].map(name => (
              <span key={name} className="text-[#98a2b3] text-xl font-bold tracking-[-0.5px]">{name}</span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* How it works */}
      <AnimatedSection className="bg-white py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1232px] mx-auto flex flex-col items-center gap-12 md:gap-16">
          <div className="flex flex-col items-center gap-4 text-center max-w-[672px]">
            <Badge>How it works</Badge>
            <h2 className="text-2xl md:text-[36px] font-semibold leading-[1.2] md:leading-[1.11] tracking-[-0.6px] md:tracking-[-0.9px] text-[#101828]">
              From static PDF to interactive specification
            </h2>
            <p className="text-[#475467] text-base md:text-lg leading-[1.625]">
              A seamless workflow that bridges the gap between how manufacturers publish data and how engineers use it.
            </p>
          </div>
          <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[18%] right-[18%] h-px bg-[#e4e7ec]" />
            {[
              { num: '1', icon: iconUpload, title: 'Upload your product datasheet', desc: 'Share your existing PDF datasheets and technical specifications. No reformatting needed.' },
              { num: '2', icon: iconBuild, title: 'We build the interactive calculator', desc: 'Our engineers extract your formulas and parameters, building a live calculator that processes real project inputs.' },
              { num: '3', icon: iconSpecifiers, title: 'Specifiers find and use your product', desc: 'Engineers from Arup, WSP, Aurecon and more use your calculator to specify your product directly into their designs.' },
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center gap-6 text-center px-0 md:px-6">
                <div className="relative bg-[#f1f4fe] border border-[#d7e0fd] rounded-2xl w-16 h-16 flex items-center justify-center shrink-0">
                  <img src={step.icon} alt="" className="w-7 h-7" />
                  <div className="absolute -top-2 -right-2 bg-[#1a41a6] rounded-full w-6 h-6 flex items-center justify-center shadow-[0px_4px_8px_0px_rgba(16,24,40,0.1)]">
                    <span className="text-white text-xs font-semibold">{step.num}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 max-w-[320px]">
                  <h3 className="font-semibold text-[#101828] text-base leading-6">{step.title}</h3>
                  <p className="text-[#475467] text-sm leading-[1.625]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="bg-[#f9fafb] border-y border-[#e4e7ec] py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1232px] mx-auto flex flex-col items-center gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge>Features</Badge>
            <h2 className="text-2xl md:text-[36px] font-semibold leading-[1.2] md:leading-[1.11] tracking-[-0.6px] md:tracking-[-0.9px] text-[#101828] max-w-[513px]">
              Everything you need to specify with confidence
            </h2>
            <p className="text-[#475467] text-base md:text-lg leading-[1.555] max-w-[554px]">
              A comprehensive suite of tools designed for the rigorous demands of the AEC industry.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full items-stretch"
            ref={featuresRef}
            onMouseMove={handleFeatureMouseMove}
            onMouseLeave={handleFeatureMouseLeave}
          >
            {/* Left column */}
            <div className="flex flex-col gap-5 relative md:z-30">
              <FeatureCard icon={iconPdf} title="PDF to live data" description="Transform rigid tables and dense paragraphs into structured, searchable, computable datasets." />
              <FeatureCard icon={iconSync} title="Always up-to-date specs" description="Update a parameter once and it instantly propagates to every active calculator using that product." />
            </div>

            {/* Middle column — tall card with two-panel mockup */}
            <div className="feature-card bg-[#f8f9fc] border border-[#eaecf5] rounded-2xl p-6 flex flex-col gap-5 overflow-hidden relative md:z-20 order-first md:order-none">
              <div className="bg-[#1a41a6] rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
                <img src={iconCalc} alt="" className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-[#101828] text-base leading-6">Parametric calculators</h3>
                <p className="text-[#475467] text-sm leading-[1.625]">Generate bespoke UI interfaces instantly based on the unique formulas in your product datasheets.</p>
              </div>
              {/* Two-panel mockup: calc screenshot + Your input overlay */}
              <div className="relative" style={{ height: 285 }}>
                <div className="absolute left-0 top-8 rounded-[6px] overflow-hidden shadow-[-8px_18px_40px_0px_rgba(68,100,161,0.1)]" style={{ width: '77%', height: 273 }}>
                  <img src={calcMain} alt="SureLok calc" className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute right-0 top-0">
                  <YourInputPanel />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5 relative md:z-10">
              <FeatureCard icon={iconAi} title="AI-assisted product search" description="Let AI map natural language project needs to the exact technical parameters of your products." />
              <FeatureCard icon={iconCustom} title="Custom engineering apps" description="We build tailored engineering applications specific to your highly specialized product systems." />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Problems + Social proof */}
      <EyeGazeSection>
        <div className="max-w-[1232px] mx-auto flex flex-col items-center gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge>You should talk to us</Badge>
            <h2 className="text-2xl md:text-[36px] font-semibold leading-[1.2] md:leading-[1.11] tracking-[-0.6px] md:tracking-[-0.9px] text-[#101828] max-w-[438px]">
              We solve real problems for manufacturers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full">
            <ProblemCard badge="Overlooked at design stage" title="Your product is being overlooked by specifiers at design stage" illustration={<EyesIllustration />} />
            <ProblemCard badge="Weak web presence" title="Your website doesn't do justice to your products and needs renovation" illustration={<ComputerIllustration />} />
            <ProblemCard badge="AI-driven discovery" title="You believe specifiers will use AI chats to find the right products" illustration={<ChatIllustration />} />
            <ProblemCard badge="Custom dev needed" title="You need custom engineering application tailored to your product" illustration={<BalloonIllustration />} />
          </div>

          {/* Social proof */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-8 sm:gap-16 md:gap-20 py-8 sm:py-12 md:py-16 px-0 sm:px-10 md:px-20">
            <img src={badgeEngineers} alt="" className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44" />
            <p className="text-[#101828] text-xl sm:text-2xl md:text-[32px] font-normal leading-[1.35] tracking-[-0.5px] text-center sm:text-left">
              We list your products as interactive calculators on a platform with{' '}
              <span className="text-[#1a41a6] font-semibold">1,000+ unique visitors/month</span>{' '}
              — engineers from Arup, WSP, Aurecon, BG&E and more.
            </p>
          </div>
        </div>
      </EyeGazeSection>

      {/* CTA Section */}
      <AnimatedSection className="bg-[#0d1526] py-12 md:py-24 px-5 md:px-8">
        <div className="max-w-[1232px] mx-auto rounded-2xl overflow-hidden">
          {/* Painting with text overlay */}
          <div className="relative">
            <img src={ctaImage} alt="" className="w-full object-cover" style={{ maxHeight: 649, minHeight: 220 }} />
            <div className="absolute inset-0 flex items-start justify-end p-6 sm:p-10 md:p-16">
              <h2
                className="text-white text-xl sm:text-3xl md:text-[48px] font-semibold leading-[1.15] md:leading-[1.1] tracking-[-0.5px] md:tracking-[-1.2px] max-w-[471px] text-left"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
              >
                Is your product data buried in PDFs? Finding your product shouldn't be an excavation
              </h2>
            </div>
          </div>
          {/* Blue CTA strip */}
          <div className="bg-[#1a41a6] px-6 sm:px-10 md:px-16 py-8 md:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-2xl md:text-[36px] font-semibold leading-[1.2] md:leading-[1.11] tracking-[-0.6px] md:tracking-[-0.9px]">
                Get in touch today
              </h2>
              <p className="text-[#bfcffc] text-base md:text-lg leading-[1.625] max-w-[545px]">
                Start transforming your static product catalogs into powerful, living engineering tools.
              </p>
            </div>
            <button className="shrink-0 bg-white text-[#1a41a6] font-semibold px-6 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Book a call
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-[#0d1526] border-t border-white/10 py-8 px-5 md:px-8">
        <div className="max-w-[1232px] mx-auto">
          <p className="text-[#475467] text-sm">
            © 2025 SpectaCalc Inc. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
