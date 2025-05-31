'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Button } from '@headlessui/react';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';

export default function LocaleSwitcher() {
  const { locale = DEFAULT_LOCALE } = useParams();
  const nextLocale = locale === Locale.EN ? Locale.ZH : Locale.EN;

  const handleLanguageSwitch = () => {
    try {
      localStorage.setItem('preferred-locale', nextLocale);
      document.cookie = `preferred-locale=${nextLocale}; max-age=${365 * 24 * 60 * 60}; path=/; samesite=lax`;
      window.location.reload();
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
