import Link from 'next/link';
import { slug } from 'github-slugger';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';

interface Props {
  text: string;
  locale?: Locale;
}

const Tag = ({ text, locale = DEFAULT_LOCALE }: Props) => {
  return (
    <Link
      href={`/${locale}/tags/${slug(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
