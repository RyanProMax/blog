import ListLayout from '@/layouts/ListLayoutWithTags';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';

const POSTS_PER_PAGE = 5;

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));

  return paths;
};

export default async function Page({
  params,
}: {
  params: Promise<{ page: string; locale: Locale }>;
}) {
  const { page, locale = DEFAULT_LOCALE } = await params;
  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = parseInt(page as string);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound();
  }
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  };

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={locale === Locale.ZH ? '全部文章' : 'All Posts'}
      locale={locale}
    />
  );
}
