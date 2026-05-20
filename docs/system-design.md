# Apply System Design

## Product Flows

### Build Resume

For users who do not have a resume yet.

1. User answers guided student questions in `/dashboard/build`.
2. `POST /api/resumes/build` validates input.
3. `buildStudentResume` creates a one-page resume from role, education, skills, projects, certificates, and optional prompt.
4. Resume is saved as a generated resume with a selected template.
5. `/api/pdf?resumeId=...` renders the generated text with the selected PDF template.

### Improve Resume

For users who already have a resume.

1. User uploads PDF, Word, text, Markdown, or RTF in `/dashboard/generate`.
2. `POST /api/resumes/import` extracts text and, for PDFs, stores layout line positions.
3. `POST /api/resumes/generate` compares the uploaded resume with the target job.
4. The engine rewrites only supported resume content and saves before/after text.
5. `/api/pdf?resumeId=...` preserves the uploaded PDF source when available.

## Runtime Boundaries

- Auth: Clerk middleware protects dashboard and API routes.
- AI: `lib/ai` chooses Groq first, OpenAI second.
- Database: `lib/data/resumes.ts` uses MongoDB and falls back to local JSON only when MongoDB is unreachable in development.
- PDF: `lib/pdf/resume-document.tsx` renders new resumes; `lib/pdf/source-pdf.ts` patches uploaded PDFs safely.
- SEO: `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` keep public metadata centralized.

## File Ownership

- New resume builder UI lives in `components/dashboard/resume-builder`.
- Uploaded resume improvement UI lives in `components/dashboard/resume-improve`.
- Shared dashboard components stay directly under `components/dashboard`.
- API routes stay under `app/api` to match Next.js App Router conventions.
