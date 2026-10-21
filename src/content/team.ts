/* Founders shown in "Who you'll work with". The section renders only entries in this array.
   TODO: founder 2 — name, role, a one-line bio, and LinkedIn. Do not invent.
   TODO: founder 3 — name, role, a one-line bio, and LinkedIn. Do not invent.
   TODO: founder 4 — name, role, a one-line bio, and LinkedIn. Do not invent.
   TODO: founder 5 — name, role, a one-line bio, and LinkedIn. Do not invent. */
export type Founder = {
  name: string
  role: string
  bio: string
  linkedin?: string
}

export const founders: Founder[] = [
  {
    name: 'Ziad Khalifa',
    role: 'Lead Software Engineer',
    bio: 'About eight years in backend, data and AI. TypeScript and Node, Rails, Python, PostgreSQL, Spark, and LLM/RAG systems.',
    linkedin: 'https://www.linkedin.com/in/llmziad',
  },
]
