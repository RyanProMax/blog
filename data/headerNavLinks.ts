import { Locale } from '@/locales/config';

const headerNavLinks = {
  [Locale.EN]: [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
    { href: '/tags', title: 'Tags' },
    { href: '/projects', title: 'Projects' },
    { href: '/about', title: 'About' },
  ],
  [Locale.ZH]: [
    { href: '/', title: '首页' },
    { href: '/blog', title: '博客' },
    { href: '/tags', title: '标签' },
    { href: '/projects', title: '项目' },
    { href: '/about', title: '关于' },
  ],
};

export default headerNavLinks;
