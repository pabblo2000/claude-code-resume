import { SYSTEM_PROMPT } from "@/lib/system-prompt";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY)
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
  const language =
    "language" in input && input.language === "en" ? "English" : "Spanish";
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT + ` Answer in ${language}.`,
            },
            { role: "user", content: input.message },
          ],
          max_completion_tokens: 600,
        }),
        signal: AbortSignal.timeout(20000),
      },
    );
    if (!response.ok)
      return Response.json(
        { error: "Chat unavailable" },
        { status: response.status === 429 ? 429 : 502 },
      );
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
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
