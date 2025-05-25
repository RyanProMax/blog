import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { DEFAULT_LOCALE, SupportedLanguages } from '@/locales/config';

export const useLocalizedRouter = () => {
  const router = useRouter();

  useEffect(() => {
    const originalPush = router.push;

    router.push = ((href: string, options) => {
      if (href.startsWith('http')) return originalPush(href, options);

      const locale = SupportedLanguages.find((lang) => href.startsWith(`/${lang}`));
      const prefixedHref = locale
        ? href
        : `/${DEFAULT_LOCALE}${href.startsWith('/') ? href : '/' + href}`;

      console.log('useLocalizedRouter push', {
        href,
        prefixedHref,
        locale,
      });
      return originalPush(prefixedHref, options);
    }) as typeof router.push;

    return () => {
      router.push = originalPush;
    };
  }, [router]);
};
