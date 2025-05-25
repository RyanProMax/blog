// Enforce this module to only run on server side
import 'server-only';

import { ComponentProps } from '@/types/index';
import { Locale, SupportedLanguages } from './config';

export async function getDictionary(lang: Locale) {
  if (!SupportedLanguages.includes(lang)) {
    throw new Error(`Unsupported locale: ${lang}`);
  }
  const dictionary = await import(`./${lang}.json`).then((module) => module.default);
  return dictionary;
}

export const getDictionaryFromProps = async ({ params }: ComponentProps) => {
  const { locale } = await params;
  return getDictionary(locale);
};
