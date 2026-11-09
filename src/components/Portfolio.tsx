"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { contact, pdfUrl } from "@/lib/portfolio";

export function Portfolio() {
  const { lang, setLang, resume, t } = useLanguage();

  return (
    <div className="cv-page">
      <a className="skip-link" href="#main">
        {lang === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <div className="cv-toolbar">
        <Link className="cv-terminal-link" href={`/terminal?lang=${lang}`}>
          {t.terminal} ↗
        </Link>
        <div className="cv-controls">
          <div className="cv-language" aria-label="Language">
            <button
              type="button"
              aria-pressed={lang === "es"}
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
          <a className="cv-download" href={pdfUrl(lang)} download>
            <span aria-hidden="true">↓</span> {t.download}
          </a>
        </div>
      </div>
      <main id="main" className="cv-sheet">
        <header className="cv-heading">
          <h1>{resume.name}</h1>
          <p className="cv-title">{resume.title}</p>
          <p className="cv-location">{t.location}</p>
          <address className="cv-contact">
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </address>
        </header>
        <section className="cv-section" aria-labelledby="about">
          <h2 id="about">{t.about}</h2>
          <p>{resume.profile}</p>
        </section>
        <section className="cv-section" aria-labelledby="experience">
          <h2 id="experience">{t.experience}</h2>
          {resume.work.map((job) => (
            <article className="cv-entry" key={job.name}>
              <div className="cv-entry-heading">
                <h3>{job.name}</h3>
                <span>{job.period}</span>
              </div>
              <div className="cv-entry-details">
                <p>{job.position}</p>
                <span>{job.location}</span>
              </div>
              <ul>
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        <section className="cv-section" aria-labelledby="skills">
          <h2 id="skills">{t.skills}</h2>
          <dl className="cv-skills">
            {resume.skills.map((skill) => (
              <div key={skill.name}>
                <dt>{skill.name}:</dt> <dd>{skill.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="cv-section" aria-labelledby="certifications">
          <h2 id="certifications">{t.certs}</h2>
          {resume.certificates.map((certificate) => (
            <article
              className="cv-entry cv-qualification"
              key={certificate.name}
            >
              <div className="cv-entry-heading">
                <h3>{certificate.name}</h3>
                <span>{certificate.date}</span>
              </div>
              <p className="cv-secondary">{certificate.issuer}</p>
            </article>
          ))}
        </section>
        <section className="cv-section" aria-labelledby="education">
          <h2 id="education">{t.education}</h2>
          {resume.education.map((education) => (
            <article
              className="cv-entry cv-qualification"
              key={education.institution}
            >
              <div className="cv-entry-heading">
                <h3>{education.institution}</h3>
                <span>{education.period}</span>
              </div>
              <p>{education.area}</p>
              <p className="cv-secondary">{education.location}</p>
            </article>
          ))}
        </section>
        <section className="cv-section" aria-labelledby="projects">
          <h2 id="projects">{t.projects}</h2>
          {resume.projects.map((project) => (
            <article className="cv-entry cv-project" key={project.name}>
              <h3>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.name} <span aria-hidden="true">↗</span>
                </a>
              </h3>
              <p>{project.description}</p>
            </article>
          ))}
        </section>
        <section className="cv-section" aria-labelledby="languages">
          <h2 id="languages">{t.languages}</h2>
          <p>{resume.languages}</p>
        </section>
      </main>
    </div>
  );
}
