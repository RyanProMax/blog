import { SupportedLanguages } from './config';

export async function generateStaticParams() {
  return SupportedLanguages.map((locale) => ({ locale }));
}
