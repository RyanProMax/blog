import projectsData, { Description } from '@/data/projectsData';
import Card from '@/components/Card';
import { genPageMetadata } from 'app/[locale]/seo';
import { DEFAULT_LOCALE, Locale } from '@/locales/config';
import { getNavLinkData } from '@/data/headerNavLinks';

export const metadata = genPageMetadata({ title: 'Projects' });

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale = DEFAULT_LOCALE } = await params;
  const title = getNavLinkData(locale, '/projects')?.title || 'Projects';
  const desc = Description[locale];

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{desc}</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData[locale].map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
