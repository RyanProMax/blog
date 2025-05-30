import { NextResponse, NextRequest } from 'next/server';
import { SupportedLanguages, DEFAULT_LOCALE, Locale } from '@/locales/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl.clone();

  // console.log(`[Middleware] Processing: ${pathname}`, {
  //   searchParams: Object.fromEntries(url.searchParams.entries()),
  //   referer: request.headers.get('referer')
  // });

  // 1. 处理语言切换查询参数
  const targetLocale = url.searchParams.get('locale') as Locale;
  if (targetLocale && SupportedLanguages.includes(targetLocale)) {
    url.searchParams.delete('locale');

    // 获取当前路径（不含语言前缀）
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
    const currentHasLocale = localeMatch && SupportedLanguages.includes(localeMatch[1] as Locale);

    let basePath = pathname;
    if (currentHasLocale) {
      basePath = localeMatch[2] || '/';
    }

    // console.log(`[Middleware] Language switch detected:`, {
    //   targetLocale,
    //   currentHasLocale,
    //   basePath,
    //   localeMatch
    // });

    // 构建目标路径
    if (targetLocale === DEFAULT_LOCALE) {
      url.pathname = basePath;
    } else {
      url.pathname = `/${targetLocale}${basePath}`;
    }

    // 添加临时参数标记这是语言切换，并保存目标语言
    url.searchParams.set('_ls', targetLocale);

    // console.log(`[Middleware] Redirecting to: ${url.pathname}${url.search}`);
    return NextResponse.redirect(url);
  }

  // 检查是否是语言切换后的重定向
  const languageSwitchTarget = url.searchParams.get('_ls') as Locale;
  const isFromLanguageSwitch = !!languageSwitchTarget;
  if (isFromLanguageSwitch) {
    url.searchParams.delete('_ls');
  }

  // 2. 判断当前用户的语言环境
  let userLocale: Locale = DEFAULT_LOCALE;

  // 先检查当前路径是否有语言前缀
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  const hasLocalePrefix = localeMatch && SupportedLanguages.includes(localeMatch[1] as Locale);

  if (hasLocalePrefix) {
    userLocale = localeMatch[1] as Locale;
  } else if (!isFromLanguageSwitch) {
    // 只有在非语言切换的情况下才使用referer判断语言
    const referer = request.headers.get('referer');
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        const refererMatch = refererUrl.pathname.match(/^\/([a-z]{2})(\/.*)?$/);
        if (refererMatch && SupportedLanguages.includes(refererMatch[1] as Locale)) {
          userLocale = refererMatch[1] as Locale;
        }
      } catch (e) {
        // 忽略无效的 referer URL，使用默认语言
      }
    }
  }

  // console.log(`[Middleware] Language detection:`, {
  //   hasLocalePrefix,
  //   localeMatch,
  //   isFromLanguageSwitch,
  //   languageSwitchTarget,
  //   userLocale
  // });

  // 3. 处理根路径
  if (pathname === '/') {
    if (isFromLanguageSwitch) {
      // 语言切换到根路径，重写到目标语言的内部路径
      url.pathname = `/${languageSwitchTarget}`;
      // console.log(`[Middleware] Language switch to root, rewrite to: /${languageSwitchTarget}`);
      return NextResponse.rewrite(url);
    } else {
      // 正常访问根路径，基于用户语言重写
      url.pathname = `/${userLocale}`;
      // console.log(`[Middleware] Root path rewrite to: /${userLocale}`);
      return NextResponse.rewrite(url);
    }
  }

  // 4. 如果已经有语言前缀
  if (hasLocalePrefix) {
    const [, locale, restPath = ''] = localeMatch;

    // 如果是默认语言，重定向去掉语言前缀
    if (locale === DEFAULT_LOCALE) {
      url.pathname = restPath || '/';
      // console.log(`[Middleware] Remove default locale prefix, redirect to: ${url.pathname}`);
      return NextResponse.redirect(url);
    }

    // 非默认语言，保持原样
    // console.log(`[Middleware] Non-default locale, continue`);
    return NextResponse.next();
  }

  // 5. 没有语言前缀的路径，基于用户语言环境处理
  if (userLocale === DEFAULT_LOCALE || isFromLanguageSwitch) {
    // 默认语言或语言切换，重写到内部路径
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    // console.log(`[Middleware] Default locale rewrite to: ${url.pathname}`);
    return NextResponse.rewrite(url);
  } else {
    // 非默认语言，重定向添加语言前缀
    url.pathname = `/${userLocale}${pathname}`;
    // console.log(`[Middleware] Non-default locale redirect to: ${url.pathname}`);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
