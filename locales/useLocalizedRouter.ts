import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Locale } from '@/types/index';
import { DEFAULT_LOCALE } from '@/locales/config';

export const useLocalizedRouter = (locale: Locale) => {
  const router = useRouter();

  useEffect(() => {
    const originalPush = router.push;

    router.push = ((href: string, options) => {
      if (href.startsWith('http')) return originalPush(href, options);

      const isDefault = locale === DEFAULT_LOCALE;
      const prefixedHref = isDefault
        ? href
        : `/${locale}${href.startsWith('/') ? href : '/' + href}`;

      console.log('useLocalizedRouter push', { href });
      return originalPush(prefixedHref, options);
    }) as typeof router.push;

    return () => {
      router.push = originalPush;
    };
  }, [locale, router]);
};
