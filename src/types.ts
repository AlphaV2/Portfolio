export interface Project {
  title: string;
  subtitle: string;
  technologies: string[];
  description: string[];
  highlights: string[];
  metrics?: string;
  links?: { label: string; url: string }[];
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  technologies: string[];
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
}

export interface SkillsGroup {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  url?: string;
}
