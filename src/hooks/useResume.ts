"use client";
import { useLanguage } from '@/components/LanguageProvider';
import { getResume } from '@/lib/resume-data';
export function useResume() {
  return getResume(useLanguage().lang);
}
