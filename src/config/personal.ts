/**
 * Centralized personal configuration.
 * Career data, fun command content, and display settings.
 */

import { resume } from '@/lib/resume-data';

const careerStartYear = Math.min(
  ...resume.work.map((w) => new Date(w.startDate).getFullYear()),
);

export const personalConfig = {
  careerStartYear,
  timezone: 'Europe/Madrid',
  status: 'Open to interesting opportunities',

  careerModels: [
    { name: 'Data Analyst', subtitle: 'BI · Analytics Engineering', description: 'SQL, Databricks and business insights' },
    { name: 'BI Analyst', subtitle: 'Power BI · DAX', description: 'Reporting, semantic models and KPIs' },
    { name: 'Data Engineering', subtitle: 'AWS DEA · Learning Airflow', description: 'Certified foundations and continued learning' },
  ],

  doctorChecks: [
    { label: 'Checking SQL proficiency', result: 'ADVANCED', severity: 'success' as const },
    { label: 'Checking Power BI skills', result: 'ADVANCED', severity: 'success' as const },
    { label: 'Checking Python skills', result: 'OK', severity: 'success' as const },
    { label: 'Checking AWS Data Engineer certification', result: 'PASSED', severity: 'success' as const },
    { label: 'Checking Airflow learning', result: 'IN PROGRESS', severity: 'warning' as const },
    { label: 'Checking coffee levels', result: 'LOW ⚠', severity: 'warning' as const },
  ],

  usageStats: [
    { label: 'Coffee consumed', percent: 94, status: 'critical' },
    { label: 'Stack Overflow tabs', percent: 100, status: 'always' },
    { label: 'Patience remaining', percent: 16, status: 'depleting' },
    { label: 'Confidence in prod', percent: 72, status: 'stable' },
    { label: 'Meetings survived', percent: 88, status: 'high' },
    { label: 'Code quality', percent: 85, status: 'strong' },
  ],

  costItems: [
    { label: 'Hours debugging', value: 'incalculable' },
    { label: 'SQL queries written', value: 'too many' },
    { label: 'Times said "it works on my machine"', value: 'classified' },
  ],

  initContent: [
    '# CLAUDE.md', '',
    'This file provides guidance to any human visiting this portfolio.', '',
    '## Pablo Álvaro Hidalgo', '',
    '- CRM Data Analyst at Ryanair, with a technical and business perspective.',
    '- Explore /experience, /skills and /certs for the details.',
    '- Currently learning Airflow; AWS knowledge supported by the DEA certification.',
    '- Use /contact to get in touch, or /resume for the document version.', '',
    '## Build Commands', '', '```bash',
    'pnpm hire-pablo        # Start a conversation',
    '```',
  ],

  welcomeTips: [
    { cmd: '/init', desc: 'Generate CLAUDE.md with instructions for Claude' },
    { cmd: '/about', desc: 'Who am I — summary & current role' },
    { cmd: '/experience', desc: 'Full work history timeline' },
    { cmd: '/clear', desc: 'Clear the terminal' },
  ],

  recentActivity: [
    'AWS Certified Data Engineer · Associate',
    'Learning Apache Airflow',
  ],

  skillCategories: [
    { name: 'Languages', skills: ['SQL (advanced)', 'SQL (avanzado)', 'Python (pandas, NumPy, scikit-learn)', 'DAX', 'Power Query (M)'], color: '#F5A623' },
    { name: 'Cloud & Data', skills: ['Databricks (SQL, Notebooks, Spark)', 'Snowflake', 'BigQuery', 'AWS (S3, Glue, Lambda, Redshift)'], color: '#4FC3F7' },
    { name: 'BI', skills: ['Power BI', 'Tableau', 'Celonis (Process Mining)', 'Excel (advanced)', 'Excel (avanzado)'], color: '#00C853' },
    { name: 'Engineering', skills: ['Git', 'PostgreSQL', 'MySQL', 'MongoDB', 'Data Modeling', 'Modelado de datos', 'Data Quality', 'Calidad del dato', 'ETL/ELT Pipelines', 'Pipelines ETL/ELT'], color: '#FF6B6B' },
  ],
} as const;

export type CareerModel = (typeof personalConfig.careerModels)[number];
export type DoctorCheck = (typeof personalConfig.doctorChecks)[number];
export type UsageStat = (typeof personalConfig.usageStats)[number];
export type CostItem = (typeof personalConfig.costItems)[number];
