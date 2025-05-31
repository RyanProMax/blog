'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';

export default function LocaleSwitcher() {
  const { locale = DEFAULT_LOCALE } = useParams();
  const nextLocale = locale === Locale.EN ? Locale.ZH : Locale.EN;

  // 使用查询参数进行语言切换，让middleware处理
  const switchUrl = `?locale=${nextLocale}`;

  const handleLanguageSwitch = () => {
    try {
      localStorage.setItem('preferred-locale', nextLocale);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Link href={switchUrl} className={clsx('select-none')} onClick={handleLanguageSwitch}>
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
