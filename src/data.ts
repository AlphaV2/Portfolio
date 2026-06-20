import { Project, Experience, Education, SkillsGroup, Certification } from './types';

export const personalInfo = {
  name: "Hemanth Goshika",
  title: "Full Stack Developer",
  subTitle: "Python, Django, DRF, React, and scalable web systems",
  phone: "+91 8340952114",
  email: "hemanthgoshika3@gmail.com",
  linkedin: "linkedin.com/in/hemanth-goshika",
  linkedinUrl: "https://linkedin.com/in/hemanth-goshika",
  github: "github.com/AlphaV2",
  githubUrl: "https://github.com/AlphaV2",
  location: "Hyderabad, India",
  summary:
    "Backend-focused Full Stack Developer with hands-on experience building scalable web applications, APIs, SaaS platforms, and workflow-driven systems using Python, Django, DRF, React, and PostgreSQL. Interested in practical product engineering, clean backend architecture, and solving real business problems through reliable digital systems."
};

export const skillsData: SkillsGroup[] = [
  {
    category: "Programming",
    skills: ["Python", "Core Java", "Object-Oriented Programming (OOP)", "MySQL"]
  },
  {
    category: "Backend Engineering",
    skills: ["Django", "Django REST Framework (DRF)", "RESTful APIs", "JWT Auth", "RBAC",]
  },
  {
    category: "Automation & AI",
    skills: ["NLP Pipelines", "Retrieval-Augmented Generation (RAG)", "LLM API Integration", "Chatbots", "Yolo Object Detection"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "PostgreSQL Schema Design"]
  },
  {
    category: "Frontend & Web Tech",
    skills: ["HTML5 / CSS3", "JavaScript (ES6+)", "React.js", "Vite", "Tailwind CSS"]
  },
  {
    category: "SaaS Dev Tools",
    skills: ["Git & GitHub", "Vercel", "cPanel Deployment", "Postman Testing", "API Testing"]
  }
  ,
  {
    category: "RF & Simulation",
    skills: ["ANSYS HFSS", "Antenna Design", "Beam Steering", "RF Analysis", "Oscilloscope (CRO)", "Spectrum Analyzer", "Function Generator", "Antenna & EM Coursework"]
  }
];

export const experiencesData: Experience[] = [
  {
    role: "React Developer-Contract",
    company: "PCEBV",
    period: "Mar 2026 – Present",
    technologies: ["React.js", "PHP", "MySQL", "Vercel", "UI/UX Assembly"],
    highlights: [
      "Migrated a legacy corporate website from Wix to a responsive React-based frontend, improving performance, layout control, and long-term maintainability.",
      "Designed and delivered clean UI components aligned with the company’s branding and modern usability standards.",
      "Built a lightweight PHP-based CMS with MySQL, giving non-technical users control over content and contact management.",
      "Set up deployment workflows on Vercel and helped improve performance through structured updates and fixes."
    ]
  },
  {
    role: "React/Web Developer",
    company: "Radar Snipers",
    period: "Dec 2025 – Mar 2026",
    technologies: ["React (Vite)", "PHP", "MySQL", "cPanel Hosting", "SEO Optimization"],
    highlights: [
      "Upgraded a legacy website with a modern React (Vite) setup, including improved navigation and a multilingual structure for Dutch and English.",
      "Built secure server-side form handling, database operations, and admin panels using PHP and MySQL.",
      "Improved performance, accessibility, and best-practice standards, and validated changes through Google Lighthouse audits."
    ]
  }
  ,
  {
    role: "Founder / Developer",
    company: "InterXect Labs — Development Studio",
    period: "Nov 2025 – Present",
    technologies: ["Python", "Django", "React", "PostgreSQL", "SaaS Workflows"],
    highlights: [
      "Started InterXect Labs as a small development studio to explore building websites, backend systems, and solving practical business problems for startups and businesses.",
      "Worked directly with directors and founders on communication, proposals, negotiations, delivery, and project handling while learning real business workflows and distribution.",
      "Successfully closed and delivered projects for two international clients.",
      "Built and redesigned modern websites and backend systems; experimented with SaaS-style workflows, automation ideas, and scalable system thinking.",
      "Currently experimenting with ‘Aegis Control Layer’ — an AI-agent workflow/control system under MVP stage."
    ]
  }
  ,
  {
    role: "Project Research Lead (RF & Antenna Systems)",
    company: "SIET",
    period: "Aug 2024 – Dec 2025",
    technologies: ["ANSYS HFSS", "Phased Array", "Microstrip Patch", "RF Simulation"],
    highlights: [
      "Led research and simulation work on phased array and microstrip patch antennas for 5G communication systems using ANSYS HFSS.",
      "Worked on antenna array configurations, beam steering concepts, impedance matching, RF transmission behavior, and performance optimization through simulation and analysis.",
      "Designed and simulated 28 GHz phased array antennas achieving >12 dBi gain, 1.07 GHz bandwidth, and ±45° beam steering performance.",
      "Analyzed S-parameters, VSWR, radiation patterns, and optimized array spacing; research published in ICAECT-2026 IEEE Conference."
    ]
  },
  {
    role: "Antenna Research Intern",
    company: "Doordarshan Kendra",
    period: "May 2024 – Jun 2024",
    technologies: ["ANSYS HFSS", "Microstrip Patch", "RF Testing"],
    highlights: [
      "Worked on RF communication and antenna system concepts with exposure to broadcasting and satellite communication workflows.",
      "Designed and analyzed microstrip patch antennas for 28 GHz applications and performed RF performance evaluation using ANSYS HFSS.",
      "Gained practical understanding of antenna arrays, impedance matching, uplink/downlink workflows, and RF transmission analysis."
    ]
  }
];

export const projectsData: Project[] = [
  {
  title: "Procurement & Tender Portal Automation System",
  subtitle: "Workflow automation platform for procurement operations",
  technologies: [
    "Python",
    "Playwright",
    "Browser Automation",
    "Workflow Automation",
    "Audit Logging",
    "File Management"
  ],
  description: [
    "Developed a custom procurement workflow automation platform that streamlines opportunity tracking, document retrieval, file organization, and audit tracking for procurement operations."
  ],
  highlights: [
    "Automated procurement document retrieval and RFx processing workflows, reducing repetitive administrative effort by up to 80%.",
    "Implemented structured document organization, automated routing, and audit logging to improve operational visibility and consistency.",
    "Built resilient session management, validation checks, and recovery mechanisms for stable long-term execution.",
    "Reduced document processing time significantly while enabling procurement teams to focus on bid preparation and opportunity evaluation."
  ]
},
{
  title: "Lead  & Data Collection Platform",
  subtitle: "Business discovery and prospect research automation",
  technologies: [
    "Python",
    "Playwright",
    "Data Processing",
    "CSV Automation",
    "Business Intelligence",
    "Workflow Automation"
  ],
  description: [
    "Built a scalable lead intelligence platform that automates business discovery, prospect research, contact enrichment, and structured data collection workflows."
  ],
  highlights: [
    "Automated company discovery and lead collection workflows across multiple industry categories.",
    "Reduced lead research activities from hours of manual searching to minutes of automated processing.",
    "Organized collected records into structured and export-ready datasets for business development teams.",
    "Reduced dependency on expensive third-party lead generation platforms through local-first automation workflows."
  ]
},
  {
    title: "Guardrail API",
    subtitle: "Safe backend checks for automated workflows",
    technologies: ["Python", "PostgreSQL", "Cryptographic HMAC", "API Gateway Core"],
    description: [
      "A real-time validation API that checks backend actions before they run, helping teams avoid unsafe requests, duplicate writes, and costly mistakes."
    ],
    highlights: [
      "Built a policy pipeline for request checks, rate limits, and daily usage boundaries.",
      "Implemented HMAC request verification, idempotency rules, and audit logs.",
      "Kept the design lightweight so it fits common Python and Django-based stacks."
    ]
  },
  {
    title: "Resonance",
    subtitle: "SaaS marketplace for Music creators and studios",
    technologies: ["Django", "Django REST Framework (DRF)", "React.js", "PostgreSQL"],
    description: [
      "A clean SaaS platform built for bookings, collaboration, and contract-based workflows between creators, venues, and studios."
    ],
    highlights: [
      "Built a secure REST API with JWT authentication and role-based access.",
      "Created modular booking flows, profile sections, and flexible templates.",
      "Focused on a practical product layout that is easy for non-technical users to understand."
    ]
  }
  ,
  {
    title: "CryptoQuery",
    subtitle: "NLP Crypto Chatbot (Streamlit)",
    technologies: ["Python", "Scikit-learn", "Streamlit", "CoinGecko API", "TF-IDF"],
    description: [
      "An NLP-powered cryptocurrency chatbot that answers user queries and fetches live prices for the Top 20 cryptocurrencies using the CoinGecko API."
    ],
    highlights: [
      "Implemented a TF-IDF vectorizer and Logistic Regression intent classifier trained on a custom dataset.",
      "Built a Streamlit interface with conversation history, chat logging, and live price lookup for major coins (Bitcoin, Ethereum, Solana, XRP, Dogecoin, etc.).",
      "Learned practical NLP workflows, model training, API integration, and real-time data handling."
    ]
  },
  {
    title: "P2P Agent System Monitor",
    subtitle: "Lightweight system monitoring (desktop)",
    technologies: ["Python", "Tkinter", "SQLite"],
    description: [
      "A desktop-based monitoring and logging app inspired by peer-to-peer monitoring concepts, using a local SQLite backend."
    ],
    highlights: [
      "Built a Tkinter UI for real-time system event tracking and local storage using SQLite.",
      "Explored concepts around decentralized monitoring, process tracking, and local data management.",
      "Strengthened understanding of desktop workflows and lightweight persistence patterns."
    ]
  },
  {
    title: "Satellite Link Budget Analysis Tool",
    subtitle: "Link budget calculator (Java)",
    technologies: ["Java", "RF Engineering", "Communication Systems"],
    description: [
      "A Java-based tool developed during an internship to calculate satellite link budget parameters such as EIRP and Free Space Path Loss."
    ],
    highlights: [
      "Implemented calculations for EIRP, FSPL, and other key satellite communication metrics.",
      "Applied the tool to practical broadcasting scenarios while interning at Doordarshan Kendra.",
      "Gained exposure to RF communication principles and performance analysis techniques."
    ]
  }
  ,
  {
    title: "Phased Array Project",
    subtitle: "Design & Analysis of Phased Array Antennas for 5G Applications",
    technologies: ["ANSYS HFSS", "Phased Array", "Beam Steering"],
    description: [
      "Designed and simulated phased array microstrip patch antennas for 28 GHz 5G communication systems focusing on beam steering and high-gain performance."
    ],
    highlights: [
      "Achieved >12 dBi gain and 1.07 GHz bandwidth.",
      "Implemented ±45° electronic beam steering using phase-shifting techniques.",
      "Performed S-parameter, VSWR, and radiation pattern analysis; contributed to ICAECT-2026 IEEE Conference paper."
    ]
  },
  {
    title: "MSPA Project",
    subtitle: "Design & Gain Enhancement of Rectangular Microstrip Patch Antenna",
    technologies: ["ANSYS HFSS", "Microstrip Patch", "Gain Optimization"],
    description: [
      "Designed and optimized a rectangular microstrip patch antenna for Ka-Band (28 GHz) applications with focus on gain improvement and impedance matching."
    ],
    highlights: [
      "Improved antenna gain and impedance matching using inset feed techniques.",
      "Analyzed S11, VSWR, bandwidth, directivity, and radiation patterns.",
      "Explored practical RF optimization and antenna simulation concepts."
    ]
  }
];

export const educationData: Education = {
  institution: "Sreyas Institute of Engineering and Technology",
  degree: "B.Tech in Electronics and Communication Engineering",
  location: "Hyderabad, Telangana",
  period: "2021 – 2025"
};

export const certificationsData: Certification[] = [
  {
    name: "SQL Associate Certification",
    issuer: "DataCamp"
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford University (Coursera)"
  },
  {
    name: "Python for Data Science, AI, and Development",
    issuer: "IBM"
  }
];

export const portfolioSections = [
  {
    id: 'Home',
    num: '01',
    label: 'Overview',
    tagline: 'Simple web products, backend APIs, and practical delivery',
    tone: 'text-[#E7F5EE]',
    accent: 'bg-emerald-400',
    collapsedBg: 'bg-[#10161D]',
    activeBg: 'bg-[#0F1720]'
  },
  {
    id: 'About',
    num: '02',
    label: 'Academics',
    tagline: 'Hyderabad based, focused on useful work and clean handoff',
    tone: 'text-[#E8EEF7]',
    accent: 'bg-[#4E8BFF]',
    collapsedBg: 'bg-[#0E131A]',
    activeBg: 'bg-[#111923]'
  },
  {
    id: 'Skills',
    num: '03',
    label: 'Capabilities',
    tagline: 'Python, Django, DRF, React, and reliable databases',
    tone: 'text-[#F1F4F8]',
    accent: 'bg-sky-400',
    collapsedBg: 'bg-[#11151B]',
    activeBg: 'bg-[#0F141B]'
  },
  {
    id: 'Projects',
    num: '04',
    label: 'Projects',
    tagline: 'Visual, easy-to-read product cards with stronger contrast',
    tone: 'text-[#F3F6FA]',
    accent: 'bg-orange-400',
    collapsedBg: 'bg-[#0E1218]',
    activeBg: 'bg-[#101722]'
  },
  {
    id: 'Experience',
    num: '05',
    label: 'Experience',
    tagline: 'Delivery, site upgrades, and backend support work',
    tone: 'text-[#EAF1F8]',
    accent: 'bg-indigo-400',
    collapsedBg: 'bg-[#0E1318]',
    activeBg: 'bg-[#111823]'
  },
  {
    id: 'Contact',
    num: '06',
    label: 'Contact',
    tagline: 'Quick WhatsApp and email access with a direct message',
    tone: 'text-[#F2F7FB]',
    accent: 'bg-green-400',
    collapsedBg: 'bg-[#0D141A]',
    activeBg: 'bg-[#0F1820]'
  }
] as const;

export const portfolioCopy = {
  home: {
    eyebrow: 'Python Developer | Django | DRF | React',
    title: 'HEMANTH GOSHIKA',
    description: 'I build clean websites and backend systems that are easy to use, quick to understand, and reliable to run.',
    basedInLabel: 'Based In',
    basedInValue: 'Hyderabad, India',
    focusText: 'Python, Django, DRF, React, and clean backend delivery.',
    cards: [
      { label: 'Clear builds', value: 'Fast, readable, practical' },
      { label: 'Backend focus', value: 'Python + Django + DRF' },
      { label: 'Delivery style', value: 'Simple handoff, low friction' }
    ],
    focusTitle: 'What I Focus On',
    styleTitle: 'Working Style',
    styleText: 'Minimal language, strong contrast, and a clean result that feels ready for a client demo.'
  },
  about: {
    profileLine: 'I keep the work simple, useful, and presentable so it feels good for clients, teams, and non-technical people.'
  },
  skills: {
    intro: 'Pick a category to see the core tools and how I use them in real work.',
    buildStyle: 'Build style',
    buildText: 'Clean code, practical structure, and enough detail to keep handoff easy.',
    outcomeTitle: 'Outcome',
    outcomeText: 'A result that works for both developer teams and non-technical users.'
  },
  projects: {
    intro: 'LEARNING VIA BUILDING'
  },
  experience: {
    intro: ''
  },
  contact: {
    title: 'Let\'s keep it simple.',
    intro: '',
    audienceLabel: 'Who is this for?',
    recruiterLabel: 'Recruiter',
    clientLabel: 'Client',
    recruiterIntro: 'Recruiter Overview',
    clientIntro: 'Project goal, scope',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    locationLabel: 'Location',
    locationValue: 'Hyderabad, India',
    formTitle: 'Tell me what you need',
    formNote: 'WhatsApp first',
    recruiterFormTitle: 'Recruiter brief',
    clientFormTitle: 'Client brief',
    recruiterNamePlaceholder: 'Recruiter name / company',
    clientNamePlaceholder: 'Client name / studio',
    recruiterEmailPlaceholder: 'work@email.com',
    clientEmailPlaceholder: 'hello@studio.com',
    recruiterMessagePlaceholder: 'Role, Job Decription, Location Etc',
    clientMessagePlaceholder: 'Project goal, scope, and what you want improved.',
    recruiterSubmitLabel: 'Send Query',
    clientSubmitLabel: 'Send Query'
  },
  mobile: {
    introTitle: 'Clean websites and backend systems, kept simple.',
    introBody: 'Open a section below to view the full details.'
  }
} as const;
