'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion'
import {
  Mail, MapPin, Github, Linkedin, ArrowUpRight,
  Briefcase, FolderGit2, BookOpen, Award, Cpu, GraduationCap,
  ArrowUp, Brain, Boxes, Server, Rocket, Eye, Bot, Wrench,
  type LucideIcon,
} from 'lucide-react'
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS, PAPERS, CERTS } from './data'

// ── Local-only data (permitted by spec) ──────────────────────────────────────
const EDUCATION = [
  {
    degree: 'MSc Artificial Intelligence & Robotics',
    institution: 'Hof University of Applied Sciences',
    location: 'Hof, Germany',
    period: 'Mar 2024 – Present',
    current: true,
    detail: 'Focus: LLMs, RAG systems, computer vision, and AI deployment on edge & cloud.',
  },
  {
    degree: "Bachelor's, Mechanical Engineering",
    institution: null,
    location: 'India',
    period: 'Jun 2018 – Jul 2022',
    current: false,
    detail: 'Foundations in systems, mechatronics, and robotics that bridged into AI/ML.',
  },
] as const

const STATS = [
  { value: 95, suffix: '%', label: 'Detection accuracy', mono: '95%' },
  { value: 25, suffix: '%', prefix: '+', label: 'RAG accuracy uplift', mono: '+25%' },
  { value: PROJECTS.length, suffix: '', label: 'Shipped projects', mono: `${PROJECTS.length}` },
  { value: PAPERS.length, suffix: '', label: 'Research papers', mono: `${PAPERS.length}` },
]

const SKILL_ICONS: Record<string, LucideIcon> = {
  'LLMs & NLP': Brain,
  'ML / DL': Boxes,
  Backend: Server,
  Deployment: Rocket,
  'Computer Vision': Eye,
  Robotics: Bot,
  Tools: Wrench,
}

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

// ── Animation primitives ─────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = '',
  y = 22,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) {
      setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1100
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setN(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="idx">{index}</span>
      <span className="h-px w-6 bg-white/15" />
      {children}
    </p>
  )
}

// ── Scroll-spy hook ──────────────────────────────────────────────────────────
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

// ── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-accent via-accent-2 to-signal"
    />
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-canvas/80 backdrop-blur-md border-b border-white/[0.06]' : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <a href="#about" className="font-mono text-sm font-semibold tracking-tightest text-ink">
          ~/aniket
        </a>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative px-3 py-2 rounded-md transition-colors ${
                  active === l.id ? 'text-ink' : 'text-ink-muted hover:text-ink-soft'
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-accent-2"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${PROFILE.email}`}
          className="btn-ghost !py-1.5 !px-3 text-xs font-mono"
        >
          <Mail size={14} /> Get in touch
        </a>
      </nav>
      {/* mobile section indicator */}
      <div className="md:hidden border-t border-white/[0.04] px-5 py-2 flex items-center justify-between bg-canvas/60 backdrop-blur-md">
        <span className="font-mono text-[0.65rem] text-ink-muted uppercase tracking-widest">
          {NAV.find((n) => n.id === active)?.label ?? 'About'}
        </span>
        <div className="flex gap-1.5">
          {NAV.map((n) => (
            <span
              key={n.id}
              className={`h-1 w-1 rounded-full transition-colors ${
                active === n.id ? 'bg-accent-2' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const reduce = useReducedMotion()
  const focus = ['LLM pipelines & RAG', 'Computer vision on edge', 'Agentic AI systems', 'Enterprise Gen AI']
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-20 px-5 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        {/* Left — identity */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2.5 border border-signal/25 bg-signal/[0.06] text-signal text-xs font-mono px-3 py-1.5 rounded-full mb-8">
            <span className="live-dot" />
            Working Student · Gen AI @ Allianz SE
          </span>

          <h1 className="text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.98] font-extrabold tracking-tightest text-ink">
            Aniket
            <br />
            Deshpande
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-ink-soft font-medium">
            AI Engineer building{' '}
            <span className="text-ink">production systems</span> — not demos.
          </p>

          <p className="mt-4 max-w-xl text-ink-soft/90 leading-relaxed">{PROFILE.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Github size={17} /> GitHub
            </a>
            <a href={`mailto:${PROFILE.email}`} className="btn-ghost">
              <Mail size={17} /> Email
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted font-mono">
            <MapPin size={13} /> {PROFILE.location}
          </p>
        </motion.div>

        {/* Right — terminal identity panel */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="card !p-0 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.015]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-ink-muted">aniket — focus.sh</span>
            </div>
            <div className="p-5 font-mono text-sm space-y-1.5">
              <p className="text-ink-muted">
                <span className="text-signal">›</span> whoami
              </p>
              <p className="text-ink">MSc AI &amp; Robotics · Hof University</p>
              <p className="text-ink-muted mt-3">
                <span className="text-signal">›</span> cat focus.txt
              </p>
              {focus.map((f) => (
                <p key={f} className="text-ink-soft pl-3">
                  <span className="text-accent-2">—</span> {f}
                </p>
              ))}
            </div>
          </div>

          {/* derived stat tiles */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            {STATS.map((s) => (
              <div key={s.label} className="card !p-4">
                <div className="font-mono text-2xl font-semibold text-ink tabular-nums">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-[0.7rem] text-ink-muted mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-8 lg:gap-16">
          <div>
            <Eyebrow index="00">PROFILE</Eyebrow>
            <h2 className="section-title">Senior craft, student energy.</h2>
          </div>
          <p className="text-ink-soft leading-[1.75] text-[0.98rem] self-center">
            {PROFILE.summary}
          </p>
        </div>
      </Reveal>
    </section>
  )
}

// ── Timeline row (shared by Experience + Education) ──────────────────────────
function TimelineItem({
  title,
  subtitle,
  period,
  location,
  current,
  bullets,
  detail,
  index,
}: {
  title: string
  subtitle?: string | null
  period: string
  location: string
  current?: boolean
  bullets?: readonly string[]
  detail?: string
  index: number
}) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="relative pl-8 md:pl-10">
        {/* node */}
        <span
          className={`absolute left-0 top-2 -translate-x-[5px] h-3 w-3 rounded-full border-2 ${
            current
              ? 'bg-signal border-signal shadow-[0_0_10px_rgba(16,185,129,0.7)]'
              : 'bg-surface-2 border-white/20'
          }`}
        />
        <div className="card">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div>
              <h3 className="text-ink font-semibold text-base">{title}</h3>
              {subtitle && <p className="text-accent-2 text-sm mt-0.5">{subtitle}</p>}
            </div>
            <div className="text-right shrink-0">
              <span
                className={`font-mono text-[0.7rem] px-2 py-1 rounded-md border ${
                  current
                    ? 'border-signal/25 bg-signal/[0.06] text-signal'
                    : 'border-white/[0.07] bg-white/[0.02] text-ink-soft'
                }`}
              >
                {current && <span className="mr-1.5">●</span>}
                {period}
              </span>
              <p className="text-ink-muted text-[0.7rem] mt-1.5 flex items-center justify-end gap-1 font-mono">
                <MapPin size={10} /> {location}
              </p>
            </div>
          </div>
          {detail && <p className="text-ink-soft text-sm mt-3 leading-relaxed">{detail}</p>}
          {bullets && (
            <ul className="mt-4 space-y-2">
              {bullets.map((b) => (
                <li key={b} className="text-ink-soft text-sm flex gap-2.5 leading-relaxed">
                  <span className="text-accent-2 mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent-2" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="01">EXPERIENCE</Eyebrow>
        <h2 className="section-title mb-12 flex items-center gap-3">
          <Briefcase className="text-accent-2" size={24} /> Where I&apos;ve worked
        </h2>
      </Reveal>
      <div className="relative max-w-3xl">
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/[0.08]" />
        <div className="space-y-6">
          {EXPERIENCE.map((e, i) => (
            <TimelineItem
              key={e.company}
              title={e.company}
              subtitle={e.role}
              period={e.period}
              location={e.location}
              current={e.current}
              bullets={e.bullets}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="02">EDUCATION</Eyebrow>
        <h2 className="section-title mb-12 flex items-center gap-3">
          <GraduationCap className="text-accent-2" size={24} /> Academic foundation
        </h2>
      </Reveal>
      <div className="relative max-w-3xl">
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/[0.08]" />
        <div className="space-y-6">
          {EDUCATION.map((e, i) => (
            <TimelineItem
              key={e.degree}
              title={e.degree}
              subtitle={e.institution}
              period={e.period}
              location={e.location}
              current={e.current}
              detail={e.detail}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects ─────────────────────────────────────────────────────────────────
function FeaturedCard({ proj, index }: { proj: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Reveal delay={index * 0.1} className="lg:col-span-3">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="group card h-full overflow-hidden hover:border-accent/40 hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.45)]"
        style={
          {
            backgroundImage:
              'radial-gradient(420px circle at var(--mx,-100%) var(--my,-100%), rgba(99,102,241,0.10), transparent 60%)',
          } as React.CSSProperties
        }
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-2">Featured</span>
            <h3 className="text-ink font-semibold text-lg mt-1.5 leading-tight">{proj.title}</h3>
            <p className="font-mono text-xs text-ink-muted mt-1">{proj.period}</p>
          </div>
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${proj.title} on GitHub`}
            className="text-ink-muted hover:text-ink transition-colors shrink-0"
          >
            <Github size={18} />
          </a>
        </div>

        <span className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs text-signal border border-signal/20 bg-signal/[0.06] px-2 py-0.5 rounded-md">
          <span className="h-1 w-1 rounded-full bg-signal" /> {proj.metric}
        </span>

        <ul className="mt-4 space-y-2">
          {proj.bullets.map((b) => (
            <li key={b} className="text-ink-soft text-sm flex gap-2.5 leading-relaxed">
              <span className="text-accent-2 mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent-2" />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.06]">
          {proj.stack.map((s) => (
            <span key={s} className="tag group-hover:border-white/15">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  )
}

function StandardCard({
  proj,
  index,
  expanded,
  onToggle,
}: {
  proj: (typeof PROJECTS)[number]
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()
  return (
    <Reveal delay={index * 0.05} className="lg:col-span-2">
      <motion.article
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="group card h-full flex flex-col hover:border-accent/40 hover:shadow-[0_0_34px_-14px_rgba(99,102,241,0.5)]"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-ink font-semibold leading-tight">{proj.title}</h3>
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${proj.title} on GitHub`}
            onClick={(e) => e.stopPropagation()}
            className="text-ink-muted hover:text-ink transition-colors shrink-0"
          >
            <Github size={16} />
          </a>
        </div>

        <p className="font-mono text-xs text-ink-muted mt-1.5">{proj.period}</p>

        <span className="self-start inline-flex items-center gap-1.5 mt-3 font-mono text-[0.7rem] text-signal border border-signal/20 bg-signal/[0.06] px-2 py-0.5 rounded-md">
          {proj.metric}
        </span>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {proj.stack.slice(0, expanded ? proj.stack.length : 4).map((s) => (
            <span key={s} className="tag group-hover:border-white/15">
              {s}
            </span>
          ))}
          {!expanded && proj.stack.length > 4 && (
            <span className="tag text-ink-muted">+{proj.stack.length - 4}</span>
          )}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              key="bullets"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mt-4 space-y-2 border-t border-white/[0.06] pt-4"
            >
              {proj.bullets.map((b) => (
                <li key={b} className="text-ink-soft text-sm flex gap-2.5 leading-relaxed">
                  <span className="text-accent-2 mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent-2" />
                  {b}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse details for ${proj.title}` : `Expand details for ${proj.title}`}
          className="mt-auto pt-4 self-start font-mono text-[0.65rem] text-ink-muted hover:text-accent-2 focus-visible:text-accent-2 transition-colors cursor-pointer"
        >
          {expanded ? '— collapse' : '+ details'}
        </button>
      </motion.article>
    </Reveal>
  )
}

function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const featured = PROJECTS.slice(0, 2)
  const rest = PROJECTS.slice(2)

  return (
    <section id="projects" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="03">PROJECTS</Eyebrow>
        <h2 className="section-title mb-12 flex items-center gap-3">
          <FolderGit2 className="text-accent-2" size={24} /> Selected work
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-6 gap-4">
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} proj={p} index={i} />
        ))}
        {rest.map((p, i) => (
          <StandardCard
            key={p.title}
            proj={p}
            index={i}
            expanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}

// ── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="04">CAPABILITIES</Eyebrow>
        <h2 className="section-title mb-12 flex items-center gap-3">
          <Cpu className="text-accent-2" size={24} /> Toolbox
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-4">
        {SKILLS.map((group, i) => {
          const Icon = SKILL_ICONS[group.category] ?? Cpu
          return (
            <Reveal key={group.category} delay={i * 0.05}>
              <div className="group card h-full hover:border-white/[0.12]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-9 w-9 rounded-lg border border-white/[0.07] bg-white/[0.02] grid place-items-center text-accent-2">
                    <Icon size={17} />
                  </span>
                  <h3 className="text-ink font-semibold text-sm">{group.category}</h3>
                  <span className="ml-auto font-mono text-[0.65rem] text-ink-muted">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <span
                      key={item}
                      className={`tag transition-colors hover:border-accent/40 hover:text-ink ${
                        j === 0 ? 'border-accent/25 text-ink-soft bg-accent/[0.05]' : ''
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

// ── Research ─────────────────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="05">RESEARCH</Eyebrow>
        <h2 className="section-title mb-12 flex items-center gap-3">
          <BookOpen className="text-accent-2" size={24} /> Papers &amp; writing
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4">
        {PAPERS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="group card h-full flex gap-4 hover:border-white/[0.12]">
              <span className="font-mono text-accent-2/70 text-sm font-medium shrink-0 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-ink font-medium leading-snug">{p.title}</h3>
                <p className="text-ink-soft text-sm mt-1.5 leading-relaxed">{p.desc}</p>
                <span className="block h-px w-0 group-hover:w-full bg-accent-2/50 mt-3 transition-all duration-500" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Certifications ───────────────────────────────────────────────────────────
function Certs() {
  return (
    <section id="certifications" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="06">CREDENTIALS</Eyebrow>
        <h2 className="section-title mb-12 flex items-center gap-3">
          <Award className="text-accent-2" size={24} /> Certifications
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-4">
        {CERTS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="card flex items-center gap-4 hover:border-white/[0.12]"
            >
              <span className="h-11 w-11 rounded-lg border border-white/[0.07] bg-white/[0.02] grid place-items-center font-mono text-sm font-semibold text-accent-2 shrink-0">
                {c.issuer
                  .split(/[\s–-]+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase()}
              </span>
              <div>
                <p className="text-ink font-medium text-sm leading-snug">{c.name}</p>
                <p className="text-ink-muted text-xs mt-0.5 font-mono">{c.issuer}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const channels = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, external: false },
    { icon: Linkedin, label: 'LinkedIn', value: '/in/deshpandeaniket8055', href: PROFILE.linkedin, external: true },
    { icon: Github, label: 'GitHub', value: 'AniketDeshpande-23', href: PROFILE.github, external: true },
  ]
  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 border-t border-white/[0.05]">
      <Reveal>
        <Eyebrow index="07">CONTACT</Eyebrow>
        <div className="grid lg:grid-cols-[0.5fr_0.5fr] gap-8 lg:gap-16 mt-3">
          <div>
            <h2 className="section-title">Let&apos;s build something.</h2>
            <p className="mt-4 text-ink-soft leading-relaxed max-w-md">
              Open to AI/ML engineering roles, research collaboration, and hard problems worth solving.
              Based in {PROFILE.location}.
            </p>
          </div>
          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group card flex items-center gap-4 hover:border-accent/40 hover:bg-white/[0.02]"
              >
                <span className="h-10 w-10 rounded-lg border border-white/[0.07] bg-white/[0.02] grid place-items-center text-accent-2">
                  <c.icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">{c.label}</p>
                  <p className="text-ink text-sm truncate">{c.value}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-ink-muted group-hover:text-accent-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="font-mono text-xs text-ink-muted">
          © 2026 Aniket Deshpande — built with Next.js, Tailwind &amp; Framer Motion
        </p>
        <div className="flex items-center gap-3">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-muted hover:text-ink transition-colors">
            <Linkedin size={17} />
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-ink-muted hover:text-ink transition-colors">
            <Github size={17} />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="text-ink-muted hover:text-ink transition-colors">
            <Mail size={17} />
          </a>
          <a href="#about" aria-label="Back to top" className="btn-ghost !p-2 ml-2">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const active = useScrollSpy(NAV.map((n) => n.id))
  return (
    <>
      <ProgressBar />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Research />
        <Certs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
