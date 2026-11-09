"use client";
import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUpRight, Download, ArrowRight, Trash2 } from "lucide-react";
import { Navigation } from "./Navigation";
import { useLanguage } from "./LanguageProvider";
import { useCommandHistory } from "@/lib/useCommandHistory";
import {
  contact,
  pdfUrl,
  type ResumeContent,
  type Language,
} from "@/lib/portfolio";
import {
  findCommand,
  fuzzyMatch,
  filterCommands,
  commands,
} from "@/lib/commands";
type Entry = {
  id: number;
  input: string;
  command?: string;
  text?: string;
  language: Language;
};
function Result({
  command,
  r,
  lang,
}: {
  command: string;
  r: ResumeContent;
  lang: Language;
}) {
  switch (command) {
    case "/about":
      return (
        <div>
          <h3>{r.name}</h3>
          <p className="terminal-accent">{r.title}</p>
          <p>{r.profile}</p>
        </div>
      );
    case "/experience":
      return (
        <div>
          {r.work.map((w) => (
            <article className="term-work" key={w.name}>
              <h3>
                {w.name}
                <span>{w.period}</span>
              </h3>
              <p className="terminal-accent">{w.position}</p>
              <ul>
                {w.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      );
    case "/skills":
      return (
        <div>
          {r.skills.map((s) => (
            <p key={s.name}>
              <b className="terminal-accent">{s.name}</b>
              <br />
              {s.value}
            </p>
          ))}
        </div>
      );
    case "/projects":
      return (
        <div>
          {r.projects.map((p) => (
            <p key={p.name}>
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.name} ↗
              </a>
              <br />
              {p.description}
            </p>
          ))}
        </div>
      );
    case "/education":
      return (
        <div>
          {r.education.map((e) => (
            <p key={e.institution}>
              <b className="terminal-accent">{e.institution}</b> · {e.period}
              <br />
              {e.area}
            </p>
          ))}
        </div>
      );
    case "/certs":
      return (
        <div>
          {r.certificates.map((c) => (
            <p key={c.name}>
              <b className="terminal-accent">{c.name}</b>
              <br />
              {c.issuer} · {c.date}
            </p>
          ))}
        </div>
      );
    case "/languages":
      return <p>{r.languages}</p>;
    case "/contact":
      return (
        <div>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>
              {contact.phone}
            </a>
          </p>
          <p>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>{" "}
            ·{" "}
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </p>
        </div>
      );
    case "/resume":
      return (
        <p>
          <a className="term-download" href={pdfUrl(lang)} download>
            <Download size={15} />
            {lang === "es"
              ? "Descargar CV original (ES)"
              : "Download original CV (EN)"}
          </a>
        </p>
      );
    case "/help":
      return (
        <div className="term-help">
          {commands.map((c) => (
            <div key={c.name}>
              <b>{c.name}</b>
              <span>{lang === "es" ? helpEs[c.name] : c.description}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
const helpEs: Record<string, string> = {
  "/help": "Lista de comandos",
  "/about": "Perfil y puesto actual",
  "/experience": "Experiencia profesional",
  "/skills": "Competencias técnicas",
  "/projects": "Proyectos y repositorios",
  "/education": "Formación académica",
  "/certs": "Certificaciones y cursos",
  "/contact": "Email y redes profesionales",
  "/languages": "Idiomas",
  "/resume": "Descargar CV original",
  "/clear": "Limpiar la terminal",
};
export function Terminal() {
  const { lang, resume: r, t } = useLanguage();
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const requestRef = useRef<AbortController | null>(null);
  const [menuIndex, setMenuIndex] = useState(0);
  const cmdHistory = useCommandHistory();
  const matches = input.startsWith("/") ? filterCommands(input) : [];
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [entries, loading]);
  useEffect(() => () => requestRef.current?.abort(), []);
  const execute = async (raw: string) => {
    const value = raw.trim();
    if (!value || loading) return;
    setInput("");
    setMenuIndex(0);
    cmdHistory.push(value);
    const command = findCommand(value.startsWith("/") ? value : `/${value}`);
    if (command?.name === "/clear") {
      setEntries([]);
      return;
    }
    const id = ++idRef.current;
    if (command) {
      setEntries((prev) => [
        ...prev,
        { id, input: value, command: command.name, language: lang },
      ]);
      inputRef.current?.focus();
      return;
    }
    if (value.startsWith("/")) {
      const suggestion = fuzzyMatch(value);
      setEntries((prev) => [
        ...prev,
        {
          id,
          input: value,
          text: `${t.notFound}${suggestion ? ` → ${suggestion}` : ""}`,
          language: lang,
        },
      ]);
      return;
    }
    setEntries((prev) => [
      ...prev,
      { id, input: value, text: t.thinking, language: lang },
    ]);
    setLoading(true);
    const controller = new AbortController();
    requestRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value, language: lang }),
        signal: controller.signal,
      });
      const data = await response.json();
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, text: response.ok ? data.reply : t.aiUnavailable }
            : e,
        ),
      );
    } catch {
      if (!controller.signal.aborted)
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, text: t.aiUnavailable } : e)),
        );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        requestRef.current = null;
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    void execute(matches.length ? matches[menuIndex]?.name || input : input);
  };
  const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && matches.length) {
      e.preventDefault();
      setInput(matches[menuIndex].name);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (matches.length) setMenuIndex((i) => Math.max(0, i - 1));
      else setInput(cmdHistory.navigateUp(input) || input);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (matches.length)
        setMenuIndex((i) => Math.min(matches.length - 1, i + 1));
      else setInput(cmdHistory.navigateDown() || "");
    }
    if (e.key === "Escape") setInput("");
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setEntries([]);
    }
  };
  return (
    <div className="terminal-page">
      <Navigation terminal />
      <main className="terminal-main">
        <div className="terminal-topline">
          <span>
            <span className="status-dot" />
            ~/pablo/resume
          </span>
          <div>
            <span>{t.noKey}</span>
            <button
              type="button"
              onClick={() => setEntries([])}
              aria-label={t.clear}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
        <div className="terminal-launch" aria-hidden="true">
          <span>❯</span> claude
        </div>
        <section className="terminal-welcome" aria-label={t.welcome}>
          <div className="terminal-frame-title">
            Claude Code <span>· CV</span>
          </div>
          <div className="terminal-welcome-panels">
            <div className="terminal-profile">
              <h1>{lang === "es" ? "¡Bienvenido!" : "Welcome!"}</h1>
              <pre
                className="terminal-logo"
                aria-hidden="true"
              >{`  ▐▛███▜▌\n ▝▜█████▛▘\n   ▘▘ ▝▝`}</pre>
              <h2>{r.name}</h2>
              <p className="terminal-profile-role">{r.title}</p>
              <p className="terminal-path">~/pablo/resume</p>
            </div>
            <div className="terminal-tips">
              <h2>
                {lang === "es" ? "Para empezar" : "Tips for getting started"}
              </h2>
              <div className="terminal-command-grid">
                {["/about", "/experience", "/skills", "/projects"].map(
                  (cmd) => (
                    <button
                      type="button"
                      disabled={loading}
                      key={cmd}
                      onClick={() => void execute(cmd)}
                    >
                      <span>{cmd}</span>
                      <small>
                        {lang === "es"
                          ? helpEs[cmd]
                          : commands.find((c) => c.name === cmd)?.description}
                      </small>
                      <ArrowUpRight size={13} />
                    </button>
                  ),
                )}
              </div>
              <p className="terminal-tip-hint">{t.welcomeBody}</p>
              <div className="terminal-recent">
                <h2>{t.certs}</h2>
                <p>{r.certificates[0]?.name}</p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="terminal-history"
          role="log"
          aria-label={
            lang === "es" ? "Historial de la terminal" : "Terminal history"
          }
          aria-relevant="additions text"
          aria-busy={loading}
        >
          {entries.map((e) => (
            <section className="terminal-entry" key={e.id}>
              <div className="terminal-echo">
                <span>❯</span>
                {e.input}
              </div>
              <div className="terminal-output">
                {e.command ? (
                  <Result command={e.command} r={r} lang={lang} />
                ) : (
                  <p>{e.text}</p>
                )}
              </div>
            </section>
          ))}
        </div>
        <div ref={endRef} />
        <form className="terminal-input-form" onSubmit={submit}>
          <label htmlFor="terminal-input">
            ❯<span className="sr-only">{t.commandLabel}</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setMenuIndex(0);
              cmdHistory.reset();
            }}
            onKeyDown={keyDown}
            disabled={loading}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={1000}
            placeholder={
              loading
                ? t.thinking
                : lang === "es"
                  ? "Escribe un comando o pregunta…"
                  : "Type a command or ask a question…"
            }
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label={t.send}
          >
            <ArrowRight size={18} />
          </button>
        </form>
        {matches.length > 0 && (
          <div
            className="terminal-suggestions"
            role="listbox"
            aria-label={
              lang === "es" ? "Comandos sugeridos" : "Suggested commands"
            }
          >
            {matches.map((c, i) => (
              <button
                role="option"
                aria-selected={menuIndex === i}
                type="button"
                key={c.name}
                onClick={() => void execute(c.name)}
              >
                <span>{c.name}</span>
                <small>{lang === "es" ? helpEs[c.name] : c.description}</small>
              </button>
            ))}
          </div>
        )}
        <div className="terminal-hint">{t.terminalHint}</div>
        <footer className="terminal-footer">
          <span>{t.based}</span>
          <a
            href="https://github.com/ambaena/claude-code-resume"
            target="_blank"
            rel="noreferrer"
          >
            Source <ArrowUpRight size={12} />
          </a>
        </footer>
      </main>
    </div>
  );
}
