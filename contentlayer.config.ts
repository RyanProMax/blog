import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files';
import { writeFileSync } from 'fs';
import readingTime from 'reading-time';
import { slug } from 'github-slugger';
import path from 'path';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
// Remark packages
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { remarkAlert } from 'remark-github-blockquote-alert';
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js';
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeKatexNoTranslate from 'rehype-katex-notranslate';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import siteMetadata from './data/siteMetadata';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import prettier from 'prettier';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';

const root = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => {
      // return doc._raw.flattenedPath.replace(/^.+?(\/)/, '');
      // remove blog/en(zh)/ prefix: blog/en/article -> article
      return doc._raw.flattenedPath.replace(/^.+?\/(zh|en)(\/)/, '');
    },
  },
  path: {
    type: 'string',
    resolve: (doc) => {
      // 保持完整路径，包含语言前缀: blog/en/article -> en/blog/article
      const fullPath = doc._raw.flattenedPath;
      // 提取语言和文章路径: blog/en/article -> en/blog/article
      const match = fullPath.match(/^blog\/(zh|en)\/(.+)$/);
      if (match) {
        const [, language, articleSlug] = match;
        return `${language}/blog/${articleSlug}`;
      }
      // 如果没有匹配到，返回原路径去掉 blog/ 前缀
      return fullPath.replace(/^blog\//, '');
    },
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
async function createTagCount(allBlogs) {
  const tagCountByLang: Record<Locale, Record<string, number>> = {
    [Locale.EN]: {},
    [Locale.ZH]: {},
  };
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      const locale = file.language || DEFAULT_LOCALE;
      file.tags.forEach((tag) => {
        const tagKey = slug(tag);
        tagCountByLang[locale][tagKey] = (tagCountByLang[locale][tagKey] || 0) + 1;
      });
    }
  });
  const formatted = await prettier.format(JSON.stringify(tagCountByLang, null, 2), {
    parser: 'json',
  });
  writeFileSync('./app/tag-data.json', formatted);
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    // 为每种语言生成独立的搜索索引
    const blogsByLanguage = {
      [Locale.EN]: [],
      [Locale.ZH]: [],
    };

    // 按语言分组博客文章
    allBlogs.forEach((blog) => {
      const language = blog.language || DEFAULT_LOCALE;
      if (blogsByLanguage[language]) {
        blogsByLanguage[language].push(blog);
      }
    });

    // 为每种语言生成搜索索引文件
    Object.entries(blogsByLanguage).forEach(([language, blogs]) => {
      const searchData = allCoreContent(sortPosts(blogs));
      const fileName = language === DEFAULT_LOCALE ? 'search.json' : `search-${language}.json`;
      writeFileSync(`public/${fileName}`, JSON.stringify(searchData));
      console.log(`Search index for ${language} generated: ${fileName}`);
    });
  }
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    language: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}));

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    locale: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    bluesky: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData();
    createTagCount(allBlogs);
    createSearchIndex(allBlogs);
  },
});
