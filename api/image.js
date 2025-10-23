// api/image.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST");
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

  const { prompt, size = "1024x1024" } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Missing 'prompt'" });

  try {
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size,
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(500).json(data);
    const image_base64 = data?.data?.[0]?.b64_json || "";
    return res.status(200).json({ image_base64, size });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
