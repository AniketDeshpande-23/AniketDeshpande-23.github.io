'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Mail, Phone, MapPin, Github, Linkedin, ExternalLink,
  Briefcase, Code2, BookOpen, Award, ChevronDown, Cpu
} from 'lucide-react'
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS, PAPERS, CERTS } from './data'

// ── Animation helpers ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Experience', 'Projects', 'Skills', 'Research', 'Contact']

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/90 backdrop-blur border-b border-gray-800' : ''
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-white tracking-tight">AD</span>
        <ul className="hidden md:flex gap-6 text-sm text-gray-400">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className="hover:text-indigo-400 transition-colors">{l}</a>
            </li>
          ))}
        </ul>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <Github size={16} /> GitHub
        </a>
      </nav>
    </header>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl"
      >
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Working Student Gen AI @ Allianz SE
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
          Aniket Deshpande
        </h1>

        <p className="text-xl md:text-2xl text-indigo-400 font-medium mb-6">
          AI Engineer · LLMs · RAG · Edge Deployment
        </p>

        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {PROFILE.tagline}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-center">
          {[
            { val: '95%', label: 'Object Detection Accuracy' },
            { val: '+25%', label: 'RAG Accuracy Uplift' },
            { val: '6+', label: 'Production Projects' },
            { val: '4', label: 'Research Papers' },
          ].map(s => (
            <div key={s.label} className="min-w-[110px]">
              <div className="text-3xl font-bold text-white">{s.val}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            <Github size={18} /> GitHub
          </a>
          <a href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-2 border border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors">
            <Mail size={18} /> Email
          </a>
        </div>
      </motion.div>

      <a href="#experience"
        className="absolute bottom-8 text-gray-600 hover:text-indigo-400 transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  )
}

// ── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="text-indigo-400" size={22} />
          <h2 className="section-heading">Experience</h2>
        </div>
      </FadeIn>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800 hidden md:block" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.1}>
              <div className="md:pl-12 relative">
                {/* Dot */}
                <div className={`hidden md:block absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 ${
                  exp.current
                    ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]'
                    : 'bg-gray-700 border-gray-600'
                } -translate-x-1/2`} />

                <div className="card">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{exp.company}</h3>
                      <p className="text-indigo-400 text-sm font-medium">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        exp.current
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {exp.current ? '● ' : ''}{exp.period}
                      </span>
                      <p className="text-gray-500 text-xs mt-1 flex items-center justify-end gap-1">
                        <MapPin size={10} /> {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map(b => (
                      <li key={b} className="text-gray-400 text-sm flex gap-2">
                        <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <Code2 className="text-indigo-400" size={22} />
          <h2 className="section-heading">Projects</h2>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((proj, i) => (
          <FadeIn key={proj.title} delay={i * 0.07}>
            <div
              className="card cursor-pointer h-full flex flex-col"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold leading-tight">{proj.title}</h3>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-gray-500 hover:text-indigo-400 transition-colors shrink-0 ml-2">
                    <Github size={16} />
                  </a>
                )}
              </div>

              <span className="text-xs text-gray-500 mb-3">{proj.period}</span>

              {/* Metric badge */}
              <span className="self-start text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full mb-4">
                {proj.metric}
              </span>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {proj.stack.map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>

              {/* Expanded bullets */}
              {expanded === i && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-1.5 border-t border-gray-800 pt-4"
                >
                  {proj.bullets.map(b => (
                    <li key={b} className="text-gray-400 text-sm flex gap-2">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span> {b}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="text-center text-gray-600 text-sm mt-6">Click any card to expand details</p>
    </section>
  )
}

// ── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <Cpu className="text-indigo-400" size={22} />
          <h2 className="section-heading">Skills</h2>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 gap-5">
        {SKILLS.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.08}>
            <div className="card">
              <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Research ─────────────────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="max-w-4xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <BookOpen className="text-indigo-400" size={22} />
          <h2 className="section-heading">Research Papers</h2>
        </div>
      </FadeIn>

      <div className="space-y-4">
        {PAPERS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div className="card flex gap-4">
              <span className="text-indigo-500 font-mono text-lg font-bold shrink-0">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Certifications ────────────────────────────────────────────────────────────
function Certs() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <FadeIn>
        <div className="flex items-center gap-3 mb-10">
          <Award className="text-indigo-400" size={22} />
          <h2 className="section-heading">Certifications</h2>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 gap-4">
        {CERTS.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.08}>
            <div className="card flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Award className="text-indigo-400" size={20} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{c.name}</p>
                <p className="text-gray-500 text-xs">{c.issuer}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="card text-center py-14">
          <h2 className="text-3xl font-bold text-white mb-3">Let's connect</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Open to AI/ML roles, research collaborations, and interesting problems.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              <Mail size={18} /> {PROFILE.email}
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              <Github size={18} /> GitHub
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Phone size={14} /> {PROFILE.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {PROFILE.location}</span>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-xs">
      © 2026 Aniket Deshpande · Built with Next.js + Tailwind
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
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
