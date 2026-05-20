# Apply

Apply is a modern AI SaaS product for Indian students and early-career job seekers. Users upload a master resume once, paste a job description for every application, and generate ATS-optimized resumes, cover letters, interview guides, and PDFs.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB and Mongoose
- Clerk protected authentication
- Groq/OpenAI-compatible AI workflow helpers
- React PDF generation
- UploadThing file uploads
- Umami analytics

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add credentials for MongoDB, Clerk, Groq, UploadThing, and Umami.

For text generation, add `GROQ_API_KEY`. The resume, interview, cover letter, critique, and photo-planning routes prefer Groq automatically. `OPENAI_API_KEY` is optional fallback only.

## Product Routes

- `/` - premium landing page
- `/dashboard` - overview
- `/dashboard/resumes` - resume version management
- `/dashboard/build` - guided student resume builder for users starting from zero
- `/dashboard/generate` - uploaded resume improvement workflow
- `/dashboard/interview` - interview prep guide
- `/dashboard/tools` - cover letter, PDF editing, photo generation modules
- `/dashboard/analytics` - resume analytics

## API Routes

- `POST /api/resumes/generate`
- `POST /api/resumes/build`
- `POST /api/resumes/import`
- `PATCH /api/resumes/:resumeId`
- `POST /api/interview`
- `POST /api/cover-letter`
- `POST /api/critique`
- `POST /api/photo`
- `POST /api/pdf`
- `GET /api/health`

The dashboard and API routes are protected with Clerk. Generated resumes and interview guides are stored in MongoDB per signed-in user.

## Folder Structure

- `app/` - Next.js routes, pages, metadata routes, and API endpoints.
- `components/landing/` - public marketing page sections.
- `components/dashboard/` - authenticated workspace shell and shared dashboard UI.
- `components/dashboard/resume-builder/` - guided new-resume builder UI.
- `components/dashboard/resume-improve/` - uploaded-resume improvement UI.
- `components/ui/` - reusable primitives.
- `lib/ai/` - Groq/OpenAI clients, prompts, scoring, and resume generation logic.
- `lib/data/` - MongoDB access with local fallback storage.
- `lib/pdf/` - PDF rendering and uploaded PDF preservation.
- `models/` - Mongoose schemas.
- `types/` - shared TypeScript declarations.

## Pricing Placeholder

- Free: up to 10 resume generations
- Pro: $4/month or ₹349/month
