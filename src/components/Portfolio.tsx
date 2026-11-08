"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Database,
  Braces,
  ChartNoAxesCombined,
  TerminalSquare,
  Award,
  GraduationCap,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { useLanguage } from "./LanguageProvider";
import { contact, pdfUrl } from "@/lib/portfolio";
const projectIcons = [Database, ChartNoAxesCombined, Braces];
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}
export function Portfolio() {
  const { lang, resume: r, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">
        {lang === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <Navigation />
      <main id="main" className="page-container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              {t.current}
              <span className="eyebrow-divider">/</span>DATA & DIGITAL ANALYST
            </div>
            <h1 id="hero-title">
              Pablo Álvaro
              <br />
              <span>Hidalgo</span>
            </h1>
            <p className="hero-name">{r.title}</p>
            <p className="hero-description">{t.heroBody}</p>
            <div className="hero-actions">
              <a className="button button-dark" href={pdfUrl(lang)} download>
                <ArrowDownToLine size={17} />
                {t.download}
              </a>
              <a className="text-link" href="#experience">
                {t.explore}
                <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={14} />
              {t.location}
              <span>·</span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Mail size={15} />
              </a>
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label={
              lang === "es"
                ? "Datos, analítica y negocio"
                : "Data, analytics and business"
            }
          >
            <div className="visual-grid" />
            <div className="profile-window">
              <div className="window-bar">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>profile.sql</span>
                <Database size={13} />
              </div>
              <div className="sql-code" aria-hidden="true">
                <div>
                  <em>01</em>
                  <span className="sql-key">SELECT</span>
                </div>
                <div>
                  <em>02</em>
                  <span> curiosity, technical_skills,</span>
                </div>
                <div>
                  <em>03</em>
                  <span> business_understanding</span>
                </div>
                <div>
                  <em>04</em>
                  <span className="sql-key">
                    FROM <b>pablo.profile</b>
                  </span>
                </div>
                <div>
                  <em>05</em>
                  <span className="sql-key">
                    WHERE <b>focus</b> = <strong>'impact'</strong>;
                  </span>
                </div>
              </div>
              <div className="query-result">
                <div className="result-caption">
                  <span className="status-dot" />1{" "}
                  {lang === "es"
                    ? "perfil, muchas perspectivas"
                    : "profile, many perspectives"}
                </div>
                <div className="result-row">
                  <span>{lang === "es" ? "ANALÍTICA" : "ANALYTICS"}</span>
                  <span>SQL & Databricks</span>
                  <ArrowUpRight size={14} />
                </div>
                <div className="result-row">
                  <span>BUSINESS INTELLIGENCE</span>
                  <span>Power BI</span>
                  <ArrowUpRight size={14} />
                </div>
                <div className="result-row">
                  <span>CLOUD</span>
                  <span>AWS Certified</span>
                  <Award size={14} />
                </div>
              </div>
            </div>
            <Link className="visual-terminal" href={`/terminal?lang=${lang}`}>
              <span className="terminal-tile-icon">
                <TerminalSquare size={23} />
              </span>
              <span>
                <small>
                  {lang === "es"
                    ? "¿Prefieres la línea de comandos?"
                    : "More of a command-line person?"}
                </small>
                <strong>
                  ❯ /about<span className="cursor-blink">_</span>
                </strong>
              </span>
              <ArrowUpRight size={18} />
            </Link>
            <span className="visual-note">SQL MINDSET. BUSINESS CONTEXT.</span>
          </div>
        </section>
        <div className="stack-strip">
          <span>{lang === "es" ? "EN MI DÍA A DÍA" : "IN MY TOOLKIT"}</span>
          <strong>Databricks</strong>
          <span className="stack-cross">+</span>
          <strong>SQL</strong>
          <span className="stack-cross">+</span>
          <strong>Power BI</strong>
          <span className="stack-cross">+</span>
          <strong>Python</strong>
          <div className="strip-cert">
            <Award size={17} />
            <span>
              AWS Certified
              <br />
              <b>Data Engineer · Associate</b>
            </span>
          </div>
        </div>
        <section id="about" className="content-section split-section">
          <SectionLabel number="01" title={t.about} />
          <div>
            <h3 className="section-heading">{t.intro}</h3>
            <p className="profile-text">{r.profile}</p>
            <div className="profile-tags">
              <span>Business Intelligence</span>
              <span>Analytics Engineering</span>
              <span>Digital Analytics</span>
            </div>
          </div>
        </section>
        <section id="experience" className="content-section split-section">
          <SectionLabel number="02" title={t.experience} />
          <div>
            <h3 className="section-heading">{t.experienceTitle}</h3>
            <div className="experience-list">
              {r.work.map((job, i) => (
                <article className="experience-item" key={job.name}>
                  <div
                    className={`company-mark company-${i}`}
                    aria-hidden="true"
                  >
                    {["R", "m", "p", "M"][i]}
                  </div>
                  <div className="job-body">
                    <div className="job-heading">
                      <h4>{job.name}</h4>
                      <span
                        className={`job-period ${i === 0 ? "current" : ""}`}
                      >
                        {job.period}
                      </span>
                    </div>
                    <p className="job-role">{job.position}</p>
                    <p className="job-location">{job.location}</p>
                    <ul>
                      {job.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="skills" className="content-section split-section">
          <SectionLabel number="03" title={t.skills} />
          <div>
            <h3 className="section-heading">{t.skillsTitle}</h3>
            <div className="skills-table">
              {r.skills.map((skill, i) => (
                <div className="skill-row" key={skill.name}>
                  <span className="skill-index">0{i + 1}</span>
                  <h4>{skill.name}</h4>
                  <p>{skill.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="content-section projects-section">
          <div className="projects-heading">
            <SectionLabel number="04" title={t.projects} />
            <h3 className="section-heading">{t.projectsTitle}</h3>
            <a
              className="text-link"
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="project-grid">
            {r.projects.map((p, i) => {
              const Icon = projectIcons[i];
              return (
                <article className="project-card" key={p.name}>
                  <div className="project-top">
                    <Icon size={26} strokeWidth={1.4} />
                    <span>0{i + 1}</span>
                  </div>
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <a
                    className="project-link"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {i === 2 ? t.viewGithub : t.viewCode}
                    <ArrowUpRight size={17} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>
        <section id="education" className="content-section split-section">
          <SectionLabel number="05" title={t.education} />
          <div>
            <h3 className="section-heading">{t.educationTitle}</h3>
            <div className="qualification-heading">
              <GraduationCap size={18} />
              <h4>{t.education}</h4>
            </div>
            <div className="education-list">
              {r.education.map((e) => (
                <article key={e.institution}>
                  <div>
                    <h5>{e.institution}</h5>
                    <p>{e.area}</p>
                    <small>{e.location}</small>
                  </div>
                  <span>{e.period}</span>
                </article>
              ))}
            </div>
            <div className="qualification-heading cert-heading">
              <Award size={18} />
              <h4>{t.certSubtitle}</h4>
            </div>
            <div className="certificate-list">
              {r.certificates.map((c, i) => (
                <article key={c.name}>
                  <span className={i === 0 ? "aws-mark" : "certificate-mark"}>
                    {i === 0 ? "aws" : <Award size={18} />}
                  </span>
                  <div>
                    <h5>{c.name}</h5>
                    <p>{c.issuer}</p>
                  </div>
                  <time>{c.date}</time>
                </article>
              ))}
            </div>
            <div className="language-note">
              <h4>{t.languages}</h4>
              <p>{r.languages}</p>
            </div>
          </div>
        </section>
        <section className="terminal-invite">
          <div>
            <span className="eyebrow">❯ HELLO, TERMINAL.</span>
            <h2>{t.terminalTitle}</h2>
            <p>{t.terminalBody}</p>
            <Link
              className="button button-light"
              href={`/terminal?lang=${lang}`}
            >
              <TerminalSquare size={17} />
              {t.tryTerminal}
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mini-terminal" aria-hidden="true">
            <span>
              pablo@portfolio <b>~</b>
            </span>
            <p>
              <b>❯</b> /skills
            </p>
            <p className="mini-response">
              SQL · Python · Power BI
              <br />
              Databricks · AWS · BigQuery
            </p>
            <p>
              <b>❯</b> <span className="cursor-blink">▍</span>
            </p>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div>
            <div className="eyebrow">{t.contact.toUpperCase()}</div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
          </div>
          <div className="contact-actions">
            <a className="email-link" href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight size={23} />
            </a>
            <div className="contact-links">
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
                <ArrowUpRight size={14} />
              </a>
              <button type="button" onClick={copyEmail}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span aria-live="polite">
                  {copied ? t.copied : t.copyEmail}
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-container">
          <span>© {new Date().getFullYear()} Pablo Álvaro Hidalgo</span>
          <span>{t.footer}</span>
          <a
            href="#main"
            aria-label={lang === "es" ? "Volver arriba" : "Back to top"}
          >
            ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
