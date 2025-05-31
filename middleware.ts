import { NextResponse, NextRequest } from 'next/server';
import { SupportedLanguages, DEFAULT_LOCALE, Locale } from '@/locales/config';

const LOCALE_REGEX = new RegExp(`^/(${SupportedLanguages.join('|')})(/.*)?$`);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl.clone();

  const localeMatch = pathname.match(LOCALE_REGEX);

  let locale: string | null = null;
  let basePath = pathname;

  if (localeMatch) {
    locale = localeMatch[1];
    basePath = localeMatch[2] || '/';
  }

  const referer = request.headers.get('referer');
  let currentLocale: Locale = DEFAULT_LOCALE;
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererMatch = refererUrl.pathname.match(LOCALE_REGEX);
      if (refererMatch) {
        currentLocale = refererMatch[1] as Locale;
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage && acceptLanguage.includes('zh')) {
      currentLocale = Locale.ZH;
    }
  }

  if (pathname === '/' || !locale) {
    url.pathname = `/${currentLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const switchLocale = url.searchParams.get('locale') as Locale;
  if (switchLocale && SupportedLanguages.includes(switchLocale)) {
    url.searchParams.delete('locale');
    url.pathname = `/${switchLocale}${basePath}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // 排除api路由、静态文件、带扩展名的文件、Next.js内部文件
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
