import { useEffect, useState, FormEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  Award,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Shield,
  Code,
  Layers,
  Star,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  personalInfo,
  skillsData,
  experiencesData,
  projectsData,
  educationData,
  certificationsData,
  portfolioSections,
  portfolioCopy,
} from '../data';

const desktopSections = portfolioSections.filter((section) => section.id !== 'Home');
const whatsappNumber = personalInfo.phone.replace(/\D/g, '');

type Section = (typeof desktopSections)[number];

type SectionTheme = {
  mode: 'light' | 'dark';
  shell: string;
  shellHover: string;
  activeShell: string;
  activeFx: string;
  shellOverlay: string;
  text: string;
  muted: string;
  border: string;
  panel: string;
  panelSoft: string;
  panelStrong: string;
  input: string;
  inputBorder: string;
  header: string;
  headerText: string;
  chip: string;
  chipText: string;
  previewText: string;
  previewDot: string;
  accent: string;
  accentText: string;
};

function getSectionTheme(index: number): SectionTheme {
  const isLight = index % 2 === 1;

  if (isLight) {
    return {
      mode: 'light',
      shell: 'bg-[#F7F9FC]',
      shellHover: 'bg-[#FFFFFF]',
      activeShell: 'bg-[#FFFFFF]',
      activeFx: 'shadow-[0_24px_52px_rgba(15,23,42,0.08)]',
      // Add a subtle grid + original radial accent so the preview area is readable on white
      shellOverlay: 'bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.035)_0px,rgba(0,0,0,0.035)_1px,transparent_1px,transparent_18px),repeating-linear-gradient(90deg,rgba(0,0,0,0.035)_0px,rgba(0,0,0,0.035)_1px,transparent_1px,transparent_18px),radial-gradient(circle_at_1px_1px,rgba(45,107,255,0.12)_1px,transparent_0)] bg-[length:18px_18px]',
      text: 'text-slate-950',
      muted: 'text-slate-700',
      border: 'border-slate-200',
      panel: 'bg-white',
      panelSoft: 'bg-[#F8FBFF]',
      panelStrong: 'bg-white',
      input: 'bg-white',
      inputBorder: 'border-slate-200 focus:border-[#2D6BFF]/70',
      header: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_100%)]',
      headerText: 'text-slate-950',
      chip: 'bg-white',
      chipText: 'text-slate-900',
      previewText: 'text-slate-500',
      // Strong black preview dot in light sections with a subtle ring for visibility
      previewDot: 'bg-black opacity-100 ring-1 ring-black/70',
      accent: 'bg-[#2D6BFF]',
      accentText: 'text-[#2D6BFF]',
    };
  }

  return {
    mode: 'dark',
    shell: 'bg-[#070B0F]',
    shellHover: 'bg-[#090D12]',
    activeShell: 'bg-[#0A0F14]',
    activeFx: 'shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_24px_54px_rgba(0,0,0,0.45)]',
    shellOverlay: 'bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_0)] bg-[length:18px_18px]',
    text: 'text-white',
    muted: 'text-white/82',
    border: 'border-white/10',
    panel: 'bg-[#0C1015]',
    panelSoft: 'bg-white/[0.035]',
    panelStrong: 'bg-[#090D11]',
    input: 'bg-[#070B0F]',
    inputBorder: 'border-white/10 focus:border-sky-400/60',
    header: 'bg-[#060A0E]/92',
    headerText: 'text-white',
    chip: 'bg-white/[0.04]',
    chipText: 'text-white/90',
    previewText: 'text-white/62',
    previewDot: 'bg-emerald-300',
    accent: 'bg-emerald-400',
    accentText: 'text-emerald-300',
  };
}

function openWhatsapp(message: string) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

function openEmail(subject: string, body: string) {
  window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type PortfolioActivityDetail = {
  kind: string;
  label: string;
  section?: string;
  component?: string;
  status?: string;
};

function dispatchPortfolioActivity(detail: PortfolioActivityDetail) {
  window.dispatchEvent(new CustomEvent('portfolio-activity', { detail }));
}

export default function InteractiveColumns() {
  const [activeCol, setActiveCol] = useState<string>(desktopSections[0]?.id ?? 'About');
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [selectedSkillCat, setSelectedSkillCat] = useState<string>(skillsData[0]?.category ?? 'Programming');
  const [expandedProject, setExpandedProject] = useState<number>(0);
  const [contactMode, setContactMode] = useState<'recruiter' | 'client'>('client');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatchPortfolioActivity({ kind: 'section', label: activeCol, section: activeCol, component: 'Section Shell', status: 'active' });
  }, [activeCol]);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    const message = `Hi Hemanth, I am ${contactForm.name}. My email is ${contactForm.email}. ${contactForm.message}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setContactForm({ name: '', email: '', message: '' });
      openWhatsapp(message);
    }, 200);
  };

  const handlePrimaryContact = () => {
    dispatchPortfolioActivity({ kind: 'contact', label: 'WhatsApp contact initiated', section: 'Contact', component: 'Primary Contact Button', status: 'clicked' });
    openWhatsapp('Hi Hemanth, I saw your portfolio and want to discuss a project.');
  };

  const handleEmailContact = () => {
    dispatchPortfolioActivity({ kind: 'contact', label: 'Email contact initiated', section: 'Contact', component: 'Email Contact Button', status: 'clicked' });
    openEmail('Project enquiry', 'Hi Hemanth, I would like to discuss a project with you.');
  };

  const highlightExperienceText = (text: string, strongClassName = 'font-semibold text-white') => {
    const keywords = [
      'React-based frontend',
      'clean UI components',
      'PHP-based CMS',
      'MySQL',
      'deployment workflows',
      'performance',
      'accessibility',
      'multilingual structure',
      'Google Lighthouse audits',
      'server-side form handling',
      'admin panels',
      'legacy website',
      // RF / antenna terms
      'ANSYS HFSS',
      'phased array',
      'microstrip patch',
      'beam steering',
      'S-parameters',
      'VSWR',
      'radiation patterns',
      'EIRP',
      'Free Space Path Loss',
      '28 GHz',
      'Ka-Band',
      'antenna',
      'gain',
      'bandwidth'
    ];

    const pieces: Array<string | ReactNode> = [];
    let cursor = 0;

    while (cursor < text.length) {
      const match = keywords
        .map((keyword) => ({ keyword, index: text.toLowerCase().indexOf(keyword.toLowerCase(), cursor) }))
        .filter((entry) => entry.index >= cursor)
        .sort((a, b) => a.index - b.index)[0];

      if (!match) {
        pieces.push(text.slice(cursor));
        break;
      }

      if (match.index > cursor) {
        pieces.push(text.slice(cursor, match.index));
      }

      pieces.push(<strong key={`${match.keyword}-${match.index}`} className={strongClassName}>{text.slice(match.index, match.index + match.keyword.length)}</strong>);
      cursor = match.index + match.keyword.length;
    }

    return pieces;
  };

  const highlightTerms = (text: string, terms: string[], strongClassName: string) => {
    const pieces: Array<string | ReactNode> = [];
    let cursor = 0;

    while (cursor < text.length) {
      const match = terms
        .map((term) => ({ term, index: text.toLowerCase().indexOf(term.toLowerCase(), cursor) }))
        .filter((entry) => entry.index >= cursor)
        .sort((a, b) => a.index - b.index)[0];

      if (!match) {
        pieces.push(text.slice(cursor));
        break;
      }

      if (match.index > cursor) {
        pieces.push(text.slice(cursor, match.index));
      }

      pieces.push(<strong key={`${match.term}-${match.index}`} className={strongClassName}>{text.slice(match.index, match.index + match.term.length)}</strong>);
      cursor = match.index + match.term.length;
    }

    return pieces;
  };

  const renderAbout = (theme: SectionTheme) => (
    <div className="space-y-6 max-w-4xl">
      <div className={`rounded-3xl border p-4 sm:p-5 relative overflow-hidden ${theme.border} ${theme.panelStrong}`}>
        {theme.mode === 'light' && (
          <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-3xl" />
        )}
        <p className={`text-sm leading-relaxed ${theme.muted}`}>
          {highlightTerms(
            personalInfo.summary,
            ['Full Stack Developer', 'scalable web applications', 'APIs', 'SaaS platforms', 'Python', 'Django', 'DRF', 'React', 'PostgreSQL'],
            theme.mode === 'light' ? 'font-semibold text-slate-950' : 'font-semibold text-white'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className={`rounded-2xl border p-4 ${theme.border} ${theme.panelSoft}`}>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className={`h-4 w-4 ${theme.accentText}`} />
            <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${theme.previewText}`}>Location</span>
          </div>
          <p className={`text-sm ${theme.text}`}>{personalInfo.location}</p>
        </div>
        <div className={`rounded-2xl border p-4 ${theme.border} ${theme.panelSoft}`}>
          <div className="flex items-center gap-2 mb-2">
            <Shield className={`h-4 w-4 ${theme.accentText}`} />
            <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${theme.previewText}`}>Focus</span>
          </div>
          <p className={`text-sm leading-relaxed ${theme.text}`}>{portfolioCopy.home.focusText}</p>
        </div>
      </div>

      <div className={`rounded-3xl border p-4 sm:p-5 ${theme.border} ${theme.panelStrong}`}>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Award className={`h-4 w-4 ${theme.accentText}`} />
          <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${theme.previewText}`}>Education</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
          <div className="sm:col-span-4 rounded-2xl border border-white/70 bg-white p-4 text-slate-900 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
            <p className="font-semibold">{educationData.institution}</p>
            <p className="text-sm mt-1 text-slate-700">{educationData.degree}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{educationData.location}</p>
          </div>
          <div className={`sm:col-span-2 rounded-2xl border p-4 flex flex-col justify-center relative overflow-hidden ${theme.border} ${theme.panelSoft}`}>
            {theme.mode === 'light' && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-2xl" />
            )}
            <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${theme.previewText}`}>Period</p>
            <span className={`mt-1 text-sm font-semibold ${theme.text}`}>{educationData.period}</span>
          </div>
        </div>
      </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {certificationsData.map((cert, idx) => (
          <div key={cert.name} className={`rounded-3xl border p-4 relative overflow-hidden ${theme.border} ${idx % 2 === 0 ? theme.panelSoft : theme.panel}`}>
            {theme.mode === 'light' && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-3xl" />
            )}
            <p className={`font-mono text-[9px] uppercase tracking-[0.22em] mb-2 ${theme.accentText}`}>{cert.issuer}</p>
            <p className={`text-sm font-medium leading-relaxed ${theme.text}`}>{cert.name}</p>
          </div>
        ))}
      </div>

    </div>
  );

  const renderSkills = (theme: SectionTheme) => {
    const activeGroup = skillsData.find((group) => group.category === selectedSkillCat) ?? skillsData[0];
    const lightCard = 'bg-[#C9D1DB]';
    const lightCardAlt = 'bg-[#BFC8D4]';
    const lightPanel = 'bg-[#C4CCD7] shadow-[0_18px_40px_rgba(15,23,42,0.12)]';

    return (
      <div className="space-y-5 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-4 flex flex-col gap-2">
            {skillsData.map((group) => {
              const selected = selectedSkillCat === group.category;
              return (
                <button
                  key={group.category}
                  onClick={() => {
                    setSelectedSkillCat(group.category);
                    dispatchPortfolioActivity({ kind: 'click', label: group.category, section: 'Capabilities', component: 'Capability Filter', status: 'selected' });
                  }}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${selected ? (theme.mode === 'light' ? 'border-[#2D6BFF] bg-[#2D6BFF] text-white shadow-[0_14px_28px_rgba(45,107,255,0.18)]' : 'border-blue-400/80 bg-blue-500/12 text-white shadow-[0_10px_20px_rgba(37,99,235,0.14)]') : theme.mode === 'light' ? `${theme.border} ${lightCardAlt} text-slate-950` : `${theme.border} ${theme.panelSoft} ${theme.muted}`} hover:border-[#2D6BFF]/70 hover:bg-[#2D6BFF]/8`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${selected ? (theme.mode === 'light' ? 'font-bold text-white' : 'font-bold text-white') : theme.mode === 'light' ? 'text-slate-950' : theme.previewText}`}>{group.category}</span>
                    <span className={`h-2 w-2 rounded-full ${selected ? 'bg-white' : 'bg-[#2D6BFF]'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`md:col-span-8 rounded-3xl border p-5 space-y-5 relative overflow-hidden ${theme.border} ${theme.mode === 'light' ? lightPanel : theme.panelStrong}`}>
            {theme.mode === 'light' && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-3xl" />
            )}
            <div className={`flex items-center justify-between gap-3 border-b pb-3 ${theme.border}`}>
              <p className={`font-semibold ${theme.mode === 'light' ? 'text-slate-950' : theme.text}`}>{activeGroup?.category}</p>
              <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${theme.mode === 'light' ? 'text-slate-800' : theme.previewText}`}>Current set</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeGroup?.skills.map((skill) => (
                <span key={skill} className={`rounded-full border px-3 py-1.5 text-xs font-mono ${theme.border} ${theme.mode === 'light' ? `${lightCard} text-slate-950 shadow-[0_6px_14px_rgba(15,23,42,0.08)]` : `${theme.chip} ${theme.text}`}`}>
                  {skill}
                </span>
              ))}
            </div>

            {/* 'How I build' card removed to simplify capabilities display */}
          </div>
        </div>
      </div>
    );
  };

  const renderProjects = (theme: SectionTheme) => (
    <div className="space-y-5 max-w-6xl">
      <p className={`text-sm leading-relaxed ${theme.muted}`}>
        {highlightTerms(portfolioCopy.projects.intro, ['stronger contrast', 'visual SaaS feel'], theme.mode === 'light' ? 'font-semibold text-slate-950' : 'font-semibold text-white')}
      </p>
      <div className="grid grid-cols-1 gap-4">
        {projectsData.map((project, index) => (
          <div key={project.title} className={`overflow-hidden rounded-[28px] border relative ${theme.border} ${index % 2 === 0 ? theme.panel : theme.panelSoft}`}>
            {theme.mode === 'light' && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-[28px]" />
            )}
            <button
              type="button"
              onClick={() => {
                const nextState = expandedProject === index ? 'collapsed' : 'expanded';
                setExpandedProject(expandedProject === index ? -1 : index);
                dispatchPortfolioActivity({ kind: 'click', label: project.title, section: 'Projects', component: 'Project Card', status: nextState });
              }}
              className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${theme.accentText}`}>Project {index + 1}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${index % 2 === 0 ? 'bg-sky-400' : 'bg-orange-400'}`} />
                </div>
                <h3 className={`text-2xl font-semibold tracking-tight ${theme.text}`}>{project.title}</h3>
                <p className={`text-xs uppercase tracking-[0.16em] font-mono ${theme.previewText}`}>{project.subtitle}</p>
              </div>
              <ChevronRight className={`h-5 w-5 shrink-0 transition-transform ${theme.mode === 'light' ? 'text-slate-700' : 'text-white/70'} ${expandedProject === index ? 'rotate-90' : 'rotate-0'}`} />
            </button>

            {expandedProject === index && (
              <div className="px-5 pb-5">
                <div className={`h-px w-full bg-gradient-to-r ${index % 2 === 0 ? 'from-sky-500/40 via-slate-400/20 to-transparent' : 'from-orange-500/35 via-slate-400/20 to-transparent'}`} />
                <div className="mt-4 space-y-4">
                  <p className={`text-sm leading-relaxed ${theme.muted}`}>
                    {highlightTerms(
                      project.description[0],
                      // include tech names and domain keywords to bold them when present
                      [...project.technologies, 'NLP', 'TF-IDF', 'Logistic Regression', 'Streamlit', 'CoinGecko', 'Tkinter', 'SQLite', 'EIRP', 'Free Space Path Loss'],
                      theme.mode === 'light' ? 'font-semibold text-slate-950' : 'font-semibold text-white'
                    )}
                  </p>

                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${theme.muted}`}>
                    {project.highlights.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {highlightTerms(
                          item,
                          [...project.technologies, 'policy pipeline', 'request checks', 'idempotency', 'audit logs', 'JWT', 'role-based access', 'bookings', 'real-time', 'live prices'],
                          theme.mode === 'light' ? 'font-semibold text-slate-950' : 'font-semibold text-white'
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 border-t pt-4 ${theme.border}`}>
                    {project.technologies.map((tech) => {
                      const chipClasses = theme.mode === 'light'
                        ? 'bg-white text-[#07111F] shadow-[0_6px_14px_rgba(15,23,42,0.06)]'
                        : 'bg-white text-[#07111F] shadow-[0_6px_14px_rgba(2,6,23,0.6)]';

                      return (
                        <span
                          key={tech}
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] ${theme.border} ${chipClasses}`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Project lab removed per request to simplify Projects section */}
    </div>
  );

  const renderExperience = (theme: SectionTheme) => (
    <div className="space-y-3 max-w-4xl">
      {experiencesData.map((experience) => (
          <div key={`${experience.company}-${experience.period}`} className={`rounded-[20px] border p-4 relative overflow-hidden ${theme.border} ${theme.mode === 'light' ? 'bg-[#C4CCD7] shadow-[0_12px_28px_rgba(15,23,42,0.12)]' : theme.panelStrong}`}>
            {theme.mode === 'light' && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-[20px]" />
            )}
          <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b pb-3 mb-3 ${theme.border}`}>
            <div>
              <h4 className={`text-base font-semibold ${theme.text}`}>
                {experience.role} <span className={theme.accentText}>&mdash; {experience.company}</span>
              </h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {experience.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className={`rounded-full border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em] ${theme.border} ${theme.mode === 'light' ? 'bg-[#B8C2D0] text-slate-950' : 'bg-black text-white/80'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.14em] ${theme.border} ${theme.panelSoft} ${theme.previewText}`}>
              {experience.period}
            </span>
          </div>
          <ul className={`list-disc list-inside space-y-2 text-sm ${theme.mode === 'light' ? 'text-slate-950' : theme.muted}`}>
            {experience.highlights.map((item) => (
              <li key={item} className="leading-relaxed">{highlightExperienceText(item, theme.mode === 'light' ? 'font-semibold text-slate-950' : 'font-semibold text-white')}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderContact = (theme: SectionTheme) => (
    <div className="space-y-5 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-5 space-y-4">
          <h3 className={`text-2xl font-semibold tracking-tight ${theme.text}`}>{portfolioCopy.contact.title}</h3>
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handlePrimaryContact}
              className={`w-full rounded-2xl border px-3 py-2.5 text-left text-sm transition-colors ${theme.border} ${theme.panelSoft} ${theme.text}`}
            >
              <span className={`block font-mono text-[10px] uppercase tracking-[0.22em] ${theme.accentText}`}>{portfolioCopy.contact.whatsappLabel}</span>
              <span className={`mt-1 block text-sm ${theme.text}`}>{personalInfo.phone}</span>
            </button>
            <button
              type="button"
              onClick={handleEmailContact}
              className={`w-full rounded-2xl border px-3 py-2.5 text-left text-sm transition-colors ${theme.border} ${theme.panelSoft} ${theme.text}`}
            >
              <span className={`block font-mono text-[10px] uppercase tracking-[0.22em] ${theme.accentText}`}>{portfolioCopy.contact.emailLabel}</span>
              <span className={`mt-1 block text-sm break-all ${theme.text}`}>{personalInfo.email}</span>
            </button>
            <p className={`mt-2 text-xs leading-tight ${theme.previewText}`}>
              {highlightTerms(
                contactMode === 'recruiter' ? portfolioCopy.contact.recruiterIntro : portfolioCopy.contact.clientIntro,
                contactMode === 'recruiter' ? ['role', 'team', 'timeline'] : ['project goal', 'scope'],
                theme.mode === 'light' ? 'font-semibold text-slate-800' : 'font-semibold text-white/80'
              )}
            </p>
          </div>
        </div>

        <div className={`md:col-span-7 rounded-[28px] border p-5 relative overflow-hidden ${theme.border} ${theme.panelStrong}`}>
            {theme.mode === 'light' && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[length:14px_14px] rounded-[28px]" />
            )}
          <form id="contact-panel-form" onSubmit={handleContactSubmit} className="space-y-4">
            <div className={`flex items-center justify-between border-b pb-3 mb-2 ${theme.border}`}>
              <h4 className={`font-mono text-xs uppercase tracking-[0.24em] ${theme.previewText}`}>{portfolioCopy.contact.formTitle}</h4>
              <span className={`font-mono text-[10px] ${theme.previewText}`}>{portfolioCopy.contact.formNote}</span>
            </div>

            <div className={`rounded-2xl border p-3 ${theme.border} ${theme.panelSoft}`}>
              <p className={`mb-2 font-mono text-[10px] uppercase tracking-[0.24em] ${theme.previewText}`}>{portfolioCopy.contact.audienceLabel}</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setContactMode('recruiter'); dispatchPortfolioActivity({ kind: 'click', label: 'Recruiter mode', section: 'Contact', component: 'Audience Toggle', status: 'selected' }); }} className={`rounded-xl border px-2 py-1.5 text-left text-[10px] font-mono uppercase tracking-[0.16em] transition-colors ${contactMode === 'recruiter' ? 'border-blue-400 bg-blue-500/10 text-white' : `${theme.border} bg-black/20 text-white/70 hover:border-blue-400/50`}`}>
                  {portfolioCopy.contact.recruiterLabel}
                </button>
                <button type="button" onClick={() => { setContactMode('client'); dispatchPortfolioActivity({ kind: 'click', label: 'Client mode', section: 'Contact', component: 'Audience Toggle', status: 'selected' }); }} className={`rounded-xl border px-3 py-2 text-left text-[10px] font-mono uppercase tracking-[0.16em] transition-colors ${contactMode === 'client' ? 'border-blue-400 bg-blue-500/10 text-white' : `${theme.border} bg-black/20 text-white/70 hover:border-blue-400/50`}`}>
                  {portfolioCopy.contact.clientLabel}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`font-mono text-[10px] uppercase font-semibold ${theme.previewText}`}>{contactMode === 'recruiter' ? 'Recruiter name or company' : 'Client name or company'}</label>
              <input
                id="input-name"
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder={contactMode === 'recruiter' ? portfolioCopy.contact.recruiterNamePlaceholder : portfolioCopy.contact.clientNamePlaceholder}
                className={`w-full rounded-2xl border px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none ${theme.input} ${theme.inputBorder} ${theme.text}`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`font-mono text-[10px] uppercase font-semibold ${theme.previewText}`}>Email address</label>
              <input
                id="input-email"
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder={contactMode === 'recruiter' ? portfolioCopy.contact.recruiterEmailPlaceholder : portfolioCopy.contact.clientEmailPlaceholder}
                className={`w-full rounded-2xl border px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none ${theme.input} ${theme.inputBorder} ${theme.text}`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`font-mono text-[10px] uppercase font-semibold ${theme.previewText}`}>{contactMode === 'recruiter' ? 'Recruiter note' : 'Client note'}</label>
              <textarea
                id="input-message"
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder={contactMode === 'recruiter' ? portfolioCopy.contact.recruiterMessagePlaceholder : portfolioCopy.contact.clientMessagePlaceholder}
                className={`w-full resize-none rounded-2xl border px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none ${theme.input} ${theme.inputBorder} ${theme.text}`}
              />
            </div>

            <button
              id="btn-submit-connection"
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-orange-400 disabled:opacity-60"
            >
              {isSubmitting ? 'Opening WhatsApp...' : 'Send Query'}
              {!isSubmitting && <Send className="h-3.5 w-3.5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderSectionBody = (sectionId: Section['id'], theme: SectionTheme, compact = false) => {
    if (sectionId === 'About') return renderAbout(theme);
    if (sectionId === 'Skills') return renderSkills(theme);
    if (sectionId === 'Projects') return renderProjects(theme);
    if (sectionId === 'Experience') return renderExperience(theme);
    if (sectionId === 'Contact') return renderContact(theme);
    return null;
  };

  return (
    <div id="interactive-columns-container" className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-[#0A0F14] text-white">
      <div className="hidden lg:flex flex-row h-screen w-full overflow-hidden relative">
        {desktopSections.map((section, index) => {
          const isActive = activeCol === section.id;
          const isHovered = hoveredCol === section.id;
          const theme = getSectionTheme(index);

          return (
            <div
              key={section.id}
              id={`col-${section.id.toLowerCase()}`}
              className={`relative flex h-full min-w-0 flex-col border-r transition-all duration-500 ease-out ${theme.border} ${isActive ? `flex-[6] ${theme.activeShell} ${theme.activeFx}` : isHovered ? `flex-[1.35] ${theme.shellHover}` : `flex-[1] ${theme.shell}`} cursor-pointer`}
              onMouseEnter={() => setHoveredCol(section.id)}
              onMouseLeave={() => setHoveredCol(null)}
              onClick={() => setActiveCol(section.id)}
            >
              {!isActive && theme.shellOverlay && <div className={`pointer-events-none absolute inset-0 opacity-80 ${theme.shellOverlay}`} />}
              {isActive && theme.shellOverlay && <div className={`pointer-events-none absolute inset-0 opacity-60 ${theme.shellOverlay}`} />}
              {theme.mode === 'light' && (
                <div className="pointer-events-none absolute inset-0 opacity-[0.32] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_0)] bg-[length:18px_18px]" />
              )}
              {!isActive && (
                <div className="pointer-events-none absolute inset-0 flex h-full flex-col items-center justify-start pt-6 px-4">
                  <div className="flex items-center gap-2 whitespace-nowrap mx-auto">
                    <span className={`font-display text-[12px] font-medium tracking-[0.14em] uppercase ${theme.previewText}`}>{section.label}</span>
                    <span className={`h-1.5 w-1.5 rounded-full ${theme.previewDot} opacity-90`} />
                  </div>
                  <div className={`mt-2 flex h-5 w-5 items-center justify-center rounded-full border ${theme.border} ${theme.panelSoft} absolute bottom-4 right-4`}>
                    <span className={`block h-2.5 w-2.5 rounded-full ${index === 0 ? theme.previewDot : theme.previewDot} ${isHovered ? 'scale-125' : 'scale-75'} transition-transform`} />
                  </div>
                </div>
              )}

              {isActive && (
                <div className={`relative z-10 flex min-h-0 flex-1 flex-col ${theme.text}`}>
                  <header className={`sticky top-0 z-20 flex items-center justify-between border-b px-8 py-5 backdrop-blur ${theme.border} ${theme.header}`}>
                    <h2 className={`font-display text-xl font-semibold tracking-tight ${theme.text}`}>{section.label}</h2>
                  </header>

                  <div className="flex-1 overflow-y-auto p-8 lg:p-10">
                    {renderSectionBody(section.id, theme)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="lg:hidden flex-1 overflow-y-auto bg-[#070B0F] p-4 space-y-4 text-white">
        <div className="rounded-3xl border border-white/10 bg-[#0C1015] p-4 space-y-2">
          <span className="font-mono text-[10px] uppercase font-bold tracking-[0.24em] text-emerald-300">Mobile Workspace</span>
          <h2 className="font-display text-2xl font-bold text-white">Portfolio Overview</h2>
          <p className="text-sm text-white/70">Tap a section to open a compact SaaS-style card view.</p>
        </div>

        {desktopSections.map((section, index) => {
          const isOpen = activeCol === section.id;
          const theme = getSectionTheme(index);

          return (
            <div key={section.id} className={`overflow-hidden rounded-3xl border ${theme.border} ${theme.shell} relative`}>
              {theme.shellOverlay && <div className={`pointer-events-none absolute inset-0 opacity-80 ${theme.shellOverlay}`} />}
              <button
                id={`mobile-sec-btn-${section.id.toLowerCase()}`}
                onClick={() => setActiveCol(isOpen ? desktopSections[0]?.id ?? 'About' : section.id)}
                className="relative z-10 flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-display text-sm font-bold uppercase tracking-[0.18em] ${theme.text}`}>{section.label}</span>
                </div>
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${isOpen ? `${theme.border} ${theme.panelSoft} ${theme.text}` : `${theme.border} ${theme.panelSoft} ${theme.previewText}`}`}>
                  {isOpen ? 'Close' : 'Open'}
                </span>
              </button>

              {isOpen && <div className={`relative z-10 border-t px-4 py-4 ${theme.border}`}>{renderSectionBody(section.id, theme, true)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
