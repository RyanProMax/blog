import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'

import Link from '@/components/Link'
import Image from '@/components/Image'

import { EXPERIENCES } from './Experience'

export const TimelineItem = ({ exp, last }: { exp: (typeof EXPERIENCES)[0]; last?: boolean }) => {
  const { org, url, logo, start, end, title, event, details: Details } = exp

  return (
    <div
      className={clsx(
        'group/timeline-item',
        'relative -mx-3 flex flex-row items-start gap-3 rounded-lg p-3',
        'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800',
        !last && [
          'before:-z-1',
          'before:absolute before:top-10 before:left-[35px]',
          'before:h-full before:w-px',
          'before:bg-gray-300 dark:before:bg-gray-500',
        ]
      )}
    >
      <Image
        src={logo}
        alt={org}
        className="!m-0 h-12 w-12 shrink-0 rounded-md bg-white object-contain group-hover/timeline-item:bg-slate-100 dark:bg-gray-950 dark:group-hover/timeline-item:bg-slate-800"
        width={200}
        height={200}
      />
      <details className="relative w-full !bg-inherit [&_.minus]:open:block [&_.plus]:open:hidden">
        <summary className="pr-10 marker:content-none">
          <div className="flex flex-col">
            <div className="line-clamp-1 text-xs text-gray-500 tabular-nums dark:text-gray-400">
              <span>{start}</span> – <span>{end}</span>
            </div>
            <Link
              href={url}
              className="line-clamp-1 w-fit font-semibold text-gray-900 no-underline hover:text-gray-900 dark:text-white dark:hover:text-white"
            >
              {org}
            </Link>
            <div className="flex items-center gap-1 pt-1 text-sm text-gray-700 dark:text-gray-200">
              <span>{title}</span>
            </div>
          </div>
        </summary>
        {Details ? (
          <>
            <div className={clsx(['absolute top-1 right-1'])}>
              <Plus
                size={18}
                className={clsx([
                  'plus',
                  'group-hover/timeline-item:visible md:invisible',
                  'transition-transform duration-300 ease-in-out',
                  'text-gray-600 dark:text-gray-500',
                ])}
                data-umami-event={`${event} expand`}
              />
              <Minus
                size={18}
                className={clsx([
                  'minus hidden',
                  'transition-transform duration-300 ease-in-out',
                  'text-gray-600 dark:text-gray-500',
                ])}
                data-umami-event={`${event} collapse`}
              />
            </div>

            <div className="pt-1 text-base">
              <Details />
            </div>
          </>
        ) : null}
      </details>
    </div>
  )
}
