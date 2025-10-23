// api/voice.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST");
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

  const { text = "Welcome to AskChup!", voice = "alloy", format = "mp3" } = req.body || {};

  try {
    const r = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice,
        format,
      }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      return res.status(500).json({ error: err });
    }
    const arrayBuf = await r.arrayBuffer();
    const audio_base64 = Buffer.from(arrayBuf).toString("base64");
    return res.status(200).json({ audio_base64, format, voice });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
