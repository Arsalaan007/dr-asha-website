# Dr. Asha Menon — Back Neck & Joints (Next.js)

## Run
npm install
npm run dev        # http://localhost:3000

## Deploy
- GitHub Pages: pushing to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).
  In the repo, Settings → Pages → Source must be **GitHub Actions**.
- Vercel: import the folder, no config needed.
- Any static host: `STATIC_EXPORT=1 npm run build` → upload the `out/` folder.

## Edit content
All text, phone, WhatsApp number, email, addresses and timings live in `lib/site.ts`.
Before going live, replace the placeholder phone/WhatsApp, the Mira Road address and timings.

## Doctor photo
The About photo is `public/dr-asha.jpg`.
