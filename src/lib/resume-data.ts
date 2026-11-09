import { content, contact, type Language } from '@/lib/portfolio';

export interface ResumeBasics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: {
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: {
    network: string;
    username: string;
    url: string;
  }[];
}

export interface ResumeWork {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string | null;
  summary: string | null;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  area: string;
}

export interface ResumeCertificate {
  name: string;
  issuer: string;
  url: string;
}

export interface ResumeSkill {
  name: string;
  keywords: string[] | null;
}

export interface ResumeLanguage {
  language: string;
  fluency: string;
}

export interface Resume {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  certificates: ResumeCertificate[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
}

// Adapt the existing bilingual CV to the original terminal's data contract.
export function getResume(lang: Language): Resume {
  const cv = content[lang];
  const dates = [['2025-03', null], ['2025-02', '2025-03'], ['2024-09', '2025-02'], ['2022-02', '2022-08']];
  return {
    basics: {
      name: cv.name, label: cv.title, email: contact.email, phone: contact.phone,
      url: 'pablo-alvaro-cv.vercel.app', summary: cv.profile,
      location: { city: 'Madrid', countryCode: 'ES', region: lang === 'es' ? 'España' : 'Spain' },
      profiles: [
        { network: 'LinkedIn', username: 'pabblo2000', url: contact.linkedin },
        { network: 'GitHub', username: 'pabblo2000', url: contact.github },
      ],
    },
    work: cv.work.map((job, i) => ({
      name: job.name, position: job.position, url: '', startDate: dates[i][0]!,
      endDate: dates[i][1], summary: null, highlights: job.highlights,
    })),
    education: cv.education,
    certificates: cv.certificates.map(cert => ({
      ...cert, issuer: cert.issuer === 'Amazon Web Services' ? 'AWS' : cert.issuer,
      url: `/cv/Pablo-Alvaro-Hidalgo-${lang.toUpperCase()}.pdf`,
    })),
    skills: cv.skills.flatMap(group => group.value.split(/, (?![^()]*\))/).map(name => ({ name, keywords: null }))),
    languages: [
      { language: lang === 'es' ? 'Español' : 'Spanish', fluency: 'Native speaker' },
      { language: lang === 'es' ? 'Inglés' : 'English', fluency: 'C1 · Cambridge' },
      { language: lang === 'es' ? 'Alemán' : 'German', fluency: 'Beginner' },
    ],
  };
}
export const resume = getResume('en');
