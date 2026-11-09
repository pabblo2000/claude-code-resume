import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { getResponseLanguage } from "@/lib/response-language";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!process.env.AI_API_KEY)
    return Response.json({ error: "Chat not configured" }, { status: 503 });
  const raw = await req.text();
  if (raw.length > 6000)
    return Response.json({ error: "Request too large" }, { status: 413 });
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (
    !input ||
    typeof input !== "object" ||
    !("message" in input) ||
    typeof input.message !== "string" ||
    !input.message.trim() ||
    input.message.length > 1000
  )
    return Response.json({ error: "Invalid message" }, { status: 400 });
  const fallbackLanguage =
    "language" in input && input.language === "en" ? "en" : "es";
  const language = getResponseLanguage(input.message, fallbackLanguage) === "en" ? "English" : "Spanish";
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": process.env.AI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT + ` OUTPUT LANGUAGE: ${language}. Write the ENTIRE response in ${language}, including jokes, closing lines and command suggestions. Keep command names unchanged. The CV data and examples may use another language; translate their meaning instead of copying their wording.` }],
          },
          contents: [
            { role: "user", parts: [{ text: input.message }] },
          ],
          generationConfig: {
            maxOutputTokens: 600,
          },
        }),
        signal: AbortSignal.timeout(20000),
      },
    );
    if (!response.ok) {
      // Return only known diagnostic codes, never Google's raw error or the key.
      const failure = await response.json().catch(() => null);
      const knownReasons = new Set([
        "API_KEY_INVALID", "API_KEY_SERVICE_BLOCKED", "SERVICE_DISABLED",
        "API_KEY_HTTP_REFERRER_BLOCKED", "API_KEY_IP_ADDRESS_BLOCKED",
      ]);
      const details = failure?.error?.details;
      const providerReason = Array.isArray(details)
        ? details.find((detail: { reason?: string }) => knownReasons.has(detail.reason ?? ""))?.reason
        : undefined;
      return Response.json(
        { error: "Chat unavailable", providerStatus: response.status, providerReason },
        { status: response.status === 429 ? 429 : 502 },
      );
    }
    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts
          .filter((part: { text?: unknown; thought?: boolean }) =>
            !part.thought && typeof part.text === "string",
          )
          .map((part: { text: string }) => part.text)
          .join("")
      : "";
    if (typeof reply !== "string" || !reply)
      return Response.json({ error: "Empty response" }, { status: 502 });
    return Response.json(
      { reply },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Chat unavailable" }, { status: 502 });
  }
}
