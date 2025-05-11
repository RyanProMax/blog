import { TimelineItem } from '@/components/TimelineItem'

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
export const EXPERIENCES = [
  {
    org: 'ByteDance',
    url: 'https://www.bytedance.com/',
    logo: '/static/images/timeline/bytedance.svg',
    start: 'Jul 2021',
    end: 'PRESENT',
    title: '🧑‍💻​Gaming Director of Douyin Live Studio',
    event: 'career-bytedance',
    // details: () => {
    //   return (
    //     <ul className="[&>li]:my-2 [&>li]:pl-0">
    //       <li>
    //         Build{' '}
    //         <a href="https://ecomheat.youneteci.com" rel="noopener noreferrer" target="_blank">
    //           Ecomheat
    //         </a>{' '}
    //         - a website helps to measure the performance of the industry and players on E-Commerce
    //         platforms thru cross E-commerce channels.
    //       </li>
    //       <li>
    //         Build <strong>AppCore</strong> - Developed and published core NestJS packages, including
    //         DatabaseModule, CacheModule, RedisModule, ConfigModule and others on npm to accelerate
    //         development and deployment across multiple projects.
    //       </li>
    //     </ul>
    //   )
    // },
  },
  {
    org: 'GainerTech Co., Ltd.',
    url: 'http://www.gainer-tech.com/',
    logo: '/static/images/timeline/gainer.png',
    start: 'Jun 2020',
    end: 'Jul 2021',
    title: '🧑‍💻Front-end Group Lead',
    event: 'career-gainer',
  },
  {
    org: 'China Unicom',
    url: 'https://www.chinaunicom.com.cn/',
    logo: '/static/images/timeline/china-unicom.svg',
    start: 'Jul 2016',
    end: 'May 2020',
    title: '🧑‍💻Front-end Engineer',
    event: 'career-china-unicom',
  },
  {
    org: 'Sun Yat-sen University',
    url: 'https://www.sysu.edu.cn/',
    logo: '/static/images/timeline/SYSU.svg',
    start: 'Sep 2012',
    end: 'Jun 2016',
    title: '🧑‍💻BEng | Microelectronics',
    event: 'education-BEng',
  },
]
