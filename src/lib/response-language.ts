import { detect } from "tinyld";
import type { Language } from "@/lib/portfolio";

export function getResponseLanguage(message: string, fallback: Language): Language {
  const text = message.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const requested = text.match(
    /\b(?:answer|reply|respond|respondeme|responde|contesta|contestame|habla|hablame|speak|write|escribe)\s+(?:to me\s+)?(?:in|en)\s+(english|ingles|spanish|espanol)\b/,
  )?.[1];
  if (requested) return /^(english|ingles)$/.test(requested) ? "en" : "es";
  if (/^(hi|hello|hey)([!?. ,]|$)/.test(text.trim())) return "en";
  if (/^(hola|buenas)([!?. ,]|$)/.test(text.trim())) return "es";
  const detected = detect(message);
  return detected === "en" || detected === "es" ? detected : fallback;
}
