import resumes from "@/data/resumes.json";
export type Language = "es" | "en";
export type ResumeContent = typeof resumes.es;
export const content: Record<Language, ResumeContent> = resumes;
export const contact = {
  email: "palvaroh2000@gmail.com",
  phone: "+34 605 054 449",
  github: "https://github.com/pabblo2000",
  linkedin: "https://www.linkedin.com/in/pabblo2000/",
};
export const pdfUrl = (lang: Language) =>
  `/cv/Pablo-Alvaro-Hidalgo-${lang.toUpperCase()}.pdf`;
export const copy = {
  es: {
    about: "Perfil",
    experience: "Experiencia",
    skills: "Competencias",
    projects: "Proyectos",
    education: "Formación",
    certs: "Certificaciones",
    languages: "Idiomas",
    contact: "Contacto",
    download: "Descargar CV",
    terminal: "Claude Code",
    classic: "Volver al CV",
    heroBody:
      "Del modelado y la transformación del dato a los dashboards y las decisiones de negocio.",
    current: "Actualmente en Ryanair",
    location: "Madrid, España",
    explore: "Explorar experiencia",
    intro: "Una perspectiva técnica. Una visión de negocio.",
    experienceTitle: "Donde los datos se convierten en decisiones.",
    skillsTitle: "Mi caja de herramientas.",
    projectsTitle: "Ideas llevadas al código.",
    educationTitle: "Aprender para seguir construyendo.",
    contactTitle: "Hablemos de datos.",
    contactBody:
      "BI, analítica e ingeniería de datos. Si crees que podemos encajar, escríbeme.",
    viewCode: "Ver proyecto",
    viewGithub: "Ver GitHub",
    copied: "Copiado",
    copyEmail: "Copiar email",
    terminalTitle: "Otra forma de conocerme.",
    terminalBody:
      "Explora mi experiencia como si estuvieras en tu terminal. Un comando, una respuesta.",
    tryTerminal: "Abrir terminal",
    footer: "Datos, contexto y curiosidad.",
    certSubtitle: "Certificaciones y formación complementaria",
    terminalHint:
      "Escribe /help para empezar. ↑ ↓ historial · Tab autocompletar",
    commandLabel: "Comando o pregunta sobre Pablo",
    send: "Enviar",
    welcome: "Mi CV, en modo Claude Code.",
    welcomeBody:
      "Puedes consultar mi experiencia, explorar mis competencias o descargar el CV. Prueba uno de estos comandos.",
    notFound: "Comando no encontrado. Prueba /help.",
    aiUnavailable:
      "El chat no está disponible todavía. Puedes consultar todo el CV con /about, /experience, /skills y /projects.",
    thinking: "Consultando…",
    clear: "Limpiar terminal",
    noKey: "Comandos disponibles",
    based: "Inspirado en Claude Resume, de Alfonso Baena.",
  },
  en: {
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    certs: "Certifications",
    languages: "Languages",
    contact: "Contact",
    download: "Download CV",
    terminal: "Claude Code",
    classic: "Back to resume",
    heroBody:
      "From modelling and transforming data to dashboards and business decisions.",
    current: "Currently at Ryanair",
    location: "Madrid, Spain",
    explore: "Explore experience",
    intro: "A technical perspective. A business mindset.",
    experienceTitle: "Where data becomes a decision.",
    skillsTitle: "The tools behind the work.",
    projectsTitle: "Ideas turned into code.",
    educationTitle: "Always learning. Always building.",
    contactTitle: "Let’s talk data.",
    contactBody:
      "BI, analytics and data engineering. If you think we could be a good fit, get in touch.",
    viewCode: "View project",
    viewGithub: "View GitHub",
    copied: "Copied",
    copyEmail: "Copy email",
    terminalTitle: "Get to know the other side.",
    terminalBody:
      "Explore my experience from a terminal. One command, one answer.",
    tryTerminal: "Open terminal",
    footer: "Data, context and curiosity.",
    certSubtitle: "Certifications & additional training",
    terminalHint: "Type /help to start. ↑ ↓ history · Tab autocomplete",
    commandLabel: "Command or question about Pablo",
    send: "Send",
    welcome: "My resume, Claude Code style.",
    welcomeBody:
      "Explore my experience, browse my skills or download my resume. Try one of these commands.",
    notFound: "Command not found. Try /help.",
    aiUnavailable:
      "Chat is not available yet. You can explore the full resume with /about, /experience, /skills and /projects.",
    thinking: "Thinking…",
    clear: "Clear terminal",
    noKey: "Commands available",
    based: "Inspired by Claude Resume, by Alfonso Baena.",
  },
} as const;
