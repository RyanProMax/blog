import { JSX } from 'react'
import { TimelineItem } from '@/components/TimelineItem'

export interface Experience {
  org: string
  url: string
  logo: string
  start: string
  end: string
  title: string
  details?: () => JSX.Element
}

export const Timeline = () => {
  return (
    <ul className="m-0 list-none p-0">
      {EXPERIENCES.map((experience, idx) => (
        <li key={experience.url} className="m-0 p-0">
          <TimelineItem exp={experience} last={idx === EXPERIENCES.length - 1} />
        </li>
      ))}
    </ul>
  )
}
export const EXPERIENCES: Experience[] = [
  {
    org: 'ByteDance',
    url: 'https://www.bytedance.com/',
    logo: '/static/images/timeline/bytedance.svg',
    start: 'Jul 2021',
    end: 'PRESENT',
    title: '🧑‍💻​Head of Game Direction at Douyin Live Studio',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            Responsible for developing and iterating core live-stream features such as{' '}
            <a
              href="https://developer.open-douyin.com/docs/resource/zh-CN/interaction/introduction/live-play/1"
              rel="noopener noreferrer"
              target="_blank"
            >
              Bullet‐screen Gameplay
            </a>
            ,{' '}
            <a
              href="https://streamingtool.douyin.com/docs/guide/dual"
              rel="noopener noreferrer"
              target="_blank"
            >
              Dual-Screen broadcasting
            </a>
            , and{' '}
            <a
              href="https://streamingtool.douyin.com/docs/guide/72891"
              rel="noopener noreferrer"
              target="_blank"
            >
              Game-linking
            </a>
            .
          </li>
          <li>
            Optimized <strong>PC game capture</strong> and <strong>mobile-to-screen casting</strong>
            , enhancing performance and stability.
          </li>
        </ul>
      )
    },
  },
  {
    org: 'GainerTech Co., Ltd.',
    url: 'http://www.gainer-tech.com/',
    logo: '/static/images/timeline/gainer.png',
    start: 'Jun 2020',
    end: 'Jul 2021',
    title: '🧑‍💻Front-end Group Lead',
  },
  {
    org: 'China Unicom',
    url: 'https://www.chinaunicom.com.cn/',
    logo: '/static/images/timeline/china-unicom.svg',
    start: 'Jul 2016',
    end: 'May 2020',
    title: '🧑‍💻Front-end Engineer',
  },
  {
    org: 'Sun Yat-sen University',
    url: 'https://www.sysu.edu.cn/',
    logo: '/static/images/timeline/SYSU.png',
    start: 'Sep 2012',
    end: 'Jun 2016',
    title: '🧑‍🎓BEng | Microelectronics',
  },
]
