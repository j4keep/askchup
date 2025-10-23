# AskChup API (Vercel)

Endpoints:
- `POST /api/chat` – ChatGPT-style text
- `POST /api/image` – Image generation (base64)
- `POST /api/voice` – Text-to-speech (base64)

## Deploy
1. Create a new GitHub repo (empty).
2. Upload the *contents* of this folder to the repo root (api/, package.json, vercel.json).
3. In Vercel: **Add New Project** → select the repo → Deploy.
4. In Vercel **Settings → Environment Variables** add:
   - `OPENAI_API_KEY` = your `sk-...` (Preview + Production, Sensitive ON)
5. Visit `/api/hello` to verify. Then use `/api/chat`, `/api/image`, `/api/voice` with POST.
