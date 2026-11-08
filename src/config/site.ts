export const siteConfig = {
  name: 'Pablo Resume', author: 'Pablo Álvaro Hidalgo', version: '1.0.0',
  modelName: 'Data & Digital Analyst', modelTier: 'BI & Analytics',
  email: 'palvaroh2000@gmail.com', path: '~/pablo/resume',
  description: 'Pablo Álvaro Hidalgo — Data & Digital Analyst. Databricks, SQL, Power BI and Analytics Engineering.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;
