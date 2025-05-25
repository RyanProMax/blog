'use client';

import clsx from 'clsx';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';

export default function LocaleSwitcher() {
  const { locale = DEFAULT_LOCALE } = useParams();
  const pathname = usePathname();
  const nextLocale = locale === Locale.EN ? Locale.ZH : Locale.EN;

  return (
    <Link href={pathname.replace(`/${locale}`, `/${nextLocale}`)} className={clsx('select-none')}>
      <Button
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
    </Link>
  );
}
