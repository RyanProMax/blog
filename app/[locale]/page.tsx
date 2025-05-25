import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import Main from './Main';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);
  return <Main posts={posts} />;
}
