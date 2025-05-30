'use client';

import { usePathname, useParams } from 'next/navigation';
import Image from 'next/image';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import LocaleSwitcher from './LocaleSwitcher';

import { DEFAULT_LOCALE, Locale } from '@/locales/config';

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10';
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50';
  }
  const pathname = usePathname();
  const { locale = DEFAULT_LOCALE } = useParams();
  const currentNavLinks = headerNavLinks[locale as Locale] || headerNavLinks[DEFAULT_LOCALE];
  const basePath = process.env.BASE_PATH || '';

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Image
              src={`${basePath}/static/favicons/android-chrome-192x192.png`}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {currentNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => {
              const isActive = pathname.includes(link.href);
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100 ${
                    isActive ? 'text-primary-500 dark:text-primary-400' : ''
                  } ${locale === Locale.ZH ? 'font-normal' : 'font-medium'}`}
                >
                  {link.title}
                </Link>
              );
            })}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <LocaleSwitcher />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
