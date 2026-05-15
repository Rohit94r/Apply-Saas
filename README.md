# Apply

Apply is a modern AI SaaS product for Indian students and early-career job seekers. Users upload a master resume once, paste a job description for every application, and generate ATS-optimized resumes, cover letters, interview guides, and PDFs.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB and Mongoose
- Clerk-ready auth helper
- Groq/OpenAI-compatible AI workflow helpers
- React PDF generation
- UploadThing/Cloudinary-ready storage placeholders

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add credentials when you want live MongoDB, Clerk, Groq/OpenAI, or upload storage.

For low-cost text generation, add `GROQ_API_KEY`. The resume, interview, and cover letter routes prefer Groq automatically. `OPENAI_API_KEY` is optional unless you want AI professional photo generation.

## Product Routes

- `/` - premium landing page
- `/dashboard` - overview
- `/dashboard/resumes` - resume version management
- `/dashboard/generate` - AI resume tailoring workflow
- `/dashboard/interview` - interview prep guide
- `/dashboard/tools` - cover letter, PDF editing, photo generation modules
- `/dashboard/analytics` - resume analytics

## API Routes

- `POST /api/resumes/generate`
- `POST /api/interview`
- `POST /api/cover-letter`
- `POST /api/photo`
- `POST /api/pdf`
- `GET /api/health`

The AI routes use deterministic fallback responses when both `GROQ_API_KEY` and `OPENAI_API_KEY` are missing, so the app remains demoable locally.

## Pricing Placeholder

- Free: up to 10 resume generations
- Pro: $4/month or ₹349/month
