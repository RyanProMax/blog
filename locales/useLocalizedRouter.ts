import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { DEFAULT_LOCALE, SupportedLanguages } from '@/locales/config';

export const useLocalizedRouter = () => {
  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    const originalPush = router.push;

    router.push = ((href: string, options) => {
      if (href.startsWith('http') || SupportedLanguages.find((lang) => href.startsWith(`/${lang}`)))
        return originalPush(href, options);

      const _locale = SupportedLanguages.find((lang) => lang === locale) || DEFAULT_LOCALE;
      const prefixedHref = `/${_locale}${href.startsWith('/') ? href : '/' + href}`;

      console.log('useLocalizedRouter push', {
        href,
        locale,
        prefixedHref,
      });
      return originalPush(prefixedHref, options);
    }) as typeof router.push;

    return () => {
      router.push = originalPush;
    };
  }, [locale, router]);
};
