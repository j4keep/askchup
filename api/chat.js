// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST");
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

  const messages = Array.isArray(req.body?.messages)
    ? req.body.messages
    : [{ role: "user", content: req.body?.prompt || "Say hello!" }];

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(500).json(data);
    const reply = data?.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
