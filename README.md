# Pablo Álvaro Hidalgo — CV & Terminal

Frontend bilingüe para Vercel basado en los CV **originales** ES y EN. Adaptación de [Claude Resume](https://github.com/ambaena/claude-code-resume), de Alfonso Baena, con su historial y licencia MIT conservados. Portada clásica en `/` y terminal en `/terminal`.

## CV y copias de seguridad

- `Docs/CV ES - Pablo Álvaro Hidalgo.*` y `Docs/CV EN - Pablo Álvaro Hidalgo.*`: originales intactos.
- `Docs/src/CV-ES.tex`, `CV-EN.tex` y `Docs/pdf/`: restaurados a los originales.
- `Docs/archive/2026-11-08-original/`: copia de seguridad original.
- `Docs/archive/2026-11-08-revision/`: revisión descartada, conservada por si se quiere recuperar.
- `public/cv/`: los PDF originales que descarga la web.
- `src/data/resumes.json`: contenido ES/EN extraído de los LaTeX originales; fuente compartida de portada y terminal.

## Desarrollo

```powershell
pnpm install
pnpm dev
```

Abrir la dirección local indicada por Next.js. Cambiar idioma con ES/EN; `?lang=en` permite compartir la versión inglesa.

```powershell
pnpm typecheck
pnpm build
pnpm start
```

## Funcionalidad

- Navegación por secciones, enlaces profesionales, copia del email y descarga del CV por idioma.
- Comandos `/help`, `/about`, `/experience`, `/skills`, `/projects`, `/education`, `/certs`, `/contact`, `/languages`, `/resume`, `/clear` y alias.
- Historial ↑/↓, autocompletado Tab y botones para móvil. Los comandos funcionan sin IA ni claves.
- Chat opcional con Groq, desactivado mientras no haya `GROQ_API_KEY`; nunca se simulan respuestas de IA.
- La clave vive en el servidor. Si se activa el chat público, configurar cuotas del proveedor y protección de tráfico en Vercel. El plan gratuito del proveedor tiene límites; no es un servicio ilimitado.
- El proyecto de interpolación enlaza al perfil de GitHub porque aún no se ha identificado un repositorio directo.

## GitHub y Vercel

`upstream` apunta al repositorio original. El historial original está integrado en el repositorio local. El fork remoto en la cuenta del usuario requiere una sesión autenticada de GitHub; no se ha publicado el código ni los datos personales durante el desarrollo local.

Una vez creado el fork remoto y subidos los cambios, importar el repositorio en Vercel como proyecto Next.js; usar `pnpm install --frozen-lockfile` y `pnpm build`. No hace falta dominio propio. Variables opcionales: copiar los nombres de `.env.example` a Vercel y configurar la URL pública. Nunca subir `.env.local`.

El contenido publicado corresponde a los CV originales, por petición del usuario, sin incorporar la revisión editorial posterior.
