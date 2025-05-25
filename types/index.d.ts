export type Locale = 'en' | 'zh';

export interface ComponentProps {
  params: Promise<{ locale: Locale }>;
  children?: React.ReactNode;
}

export interface LocaleProps {
  locale: Locale;
  children?: React.ReactNode;
}
