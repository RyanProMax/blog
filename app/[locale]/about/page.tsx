import { Authors, allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import AuthorLayout from '@/layouts/AuthorLayout';
import { coreContent } from 'pliny/utils/contentlayer';
import { genPageMetadata } from 'app/[locale]/seo';
import { Timeline } from '@/components/Experience';
import { DEFAULT_LOCALE } from '@/locales/config';
import { ComponentProps } from '@/types/index';
import { getNavLinkData } from '@/data/headerNavLinks';

export const metadata = genPageMetadata({ title: 'About' });

export default async function Page({ params }: ComponentProps) {
  const { locale = DEFAULT_LOCALE } = await params;
  const author = allAuthors.find(
    (p) => p.slug.includes('default') && p.locale === (locale || DEFAULT_LOCALE)
  ) as Authors;
  const mainContent = coreContent(author);
  const title = getNavLinkData(locale, '/about')?.title || 'About';

  return (
    <>
      <AuthorLayout title={title} content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <Timeline locale={locale} />
      </AuthorLayout>
    </>
  );
}
