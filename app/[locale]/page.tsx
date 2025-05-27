import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import Main from './Main';
import { DEFAULT_LOCALE } from '@/locales/config';

export { generateStaticParams } from '@/locales/generateStaticParams';

export default async function Page({ params }) {
  const { locale = DEFAULT_LOCALE } = await params;
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts).filter(
    (i) => (i.language || DEFAULT_LOCALE) === locale
  );
  return <Main posts={posts} locale={locale} />;
}
