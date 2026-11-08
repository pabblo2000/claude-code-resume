"use client";
import Link from "next/link";
import { ArrowUpRight, TerminalSquare, ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
export function Navigation({ terminal = false }: { terminal?: boolean }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <header className={`site-header ${terminal ? "terminal-header" : ""}`}>
      <div className="nav-inner">
        <Link
          className="wordmark"
          href={`/?lang=${lang}`}
          aria-label="Pablo Álvaro Hidalgo — Home"
        >
          <span className="monogram">
            pa<span>.</span>
          </span>
          <span className="wordmark-name">
            pablo álvaro<span> / {terminal ? "terminal" : "resume"}</span>
          </span>
        </Link>
        {!terminal && (
          <nav
            className="desktop-nav"
            aria-label={
              lang === "es" ? "Navegación principal" : "Main navigation"
            }
          >
            {(["about", "experience", "projects"] as const).map((id) => (
              <a key={id} href={`#${id}`}>
                {t[id]}
              </a>
            ))}
          </nav>
        )}
        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language">
            <button
              type="button"
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          {terminal ? (
            <Link className="nav-terminal" href={`/?lang=${lang}`}>
              <ArrowLeft size={15} />
              <span>{t.classic}</span>
            </Link>
          ) : (
            <Link className="nav-terminal" href={`/terminal?lang=${lang}`}>
              <TerminalSquare size={16} />
              <span>{t.terminal}</span>
              <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
