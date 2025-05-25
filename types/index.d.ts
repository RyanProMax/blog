export interface ComponentProps {
  params: Promise<{ locale: import('@/locales/config').Locale }>;
  children?: React.ReactNode;
}

export interface LocaleProps {
  locale: Locale;
  children?: React.ReactNode;
}
