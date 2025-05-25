// Enforce this module to only run on server side
import 'server-only';

import { ComponentProps } from '@/types/index';

export const supportedLanguages = ['en', 'zh'] as const;
export type Lang = (typeof supportedLanguages)[number];

export async function getDictionary(lang: string) {
  if (!supportedLanguages.includes(lang as Lang)) {
    throw new Error(`Unsupported locale: ${lang}`);
  }
  const dictionary = await import(`./${lang}.json`).then((module) => module.default);
  return dictionary;
}

export const getDictionaryFromProps = async ({ params }: ComponentProps) => {
  const { locale } = await params;
  return getDictionary(locale);
};
