'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Button } from '@headlessui/react';
import { DEFAULT_LOCALE, Locale, SupportedLanguages } from '@/locales/config';

export default function LocaleSwitcher() {
  const { locale = DEFAULT_LOCALE } = useParams();
  const nextLocale = locale === Locale.EN ? Locale.ZH : Locale.EN;

  // 检测是否为GitHub Pages或静态环境
  const isStaticEnvironment = () => {
    return (
      typeof window !== 'undefined' &&
      (window.location.hostname.includes('github.io') ||
        window.location.hostname.includes('pages.dev') ||
        (process.env.NODE_ENV === 'production' && !window.location.hostname.includes('localhost')))
    );
  };

  const parseCurrentPath = () => {
    const pathname = window.location.pathname;
    const localeRegex = new RegExp(`^/(${SupportedLanguages.join('|')})(/.*)?$`);
    const localeMatch = pathname.match(localeRegex);
    return {
      currentUrlLocale: localeMatch?.[1] || null,
      basePath: localeMatch?.[2] || '/',
    };
  };

  const handleLanguageSwitch = () => {
    try {
      localStorage.setItem('preferred-locale', nextLocale);
      document.cookie = `preferred-locale=${nextLocale}; max-age=${365 * 24 * 60 * 60}; path=/; samesite=lax`;

      if (isStaticEnvironment()) {
        const { basePath } = parseCurrentPath();
        const targetPath = `/${nextLocale}${basePath}${window.location.search}`;
        window.location.href = targetPath;
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  };

  return (
    <Button
      onClick={handleLanguageSwitch}
      className={clsx(
        'inline-flex items-center px-1.5 py-0.5',
        'rounded-md',
        'cursor-pointer',
        'text-sm/6 font-semibold',
        'hover:border-primary-600 dark:hover:border-primary-400 border border-black dark:border-white',
        'hover:text-primary-600 dark:hover:text-primary-400 text-black dark:text-white',
        'bg-transparent'
      )}
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
