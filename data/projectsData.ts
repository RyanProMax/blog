interface Project {
  title: string;
  description: string;
  href?: string;
  imgSrc?: string;
}

const projectsData: Project[] = [
  {
    title: 'Douyin Live Studio',
    description: `Douyin's official live streaming tool, supporting various live streams including
    entertainment, gaming, and e-commerce. It offers one-click streaming start, real-time audio/video 
    processing, beauty filters, and comment management, helping hosts create high-quality broadcasts effortlessly.`,
    imgSrc: '/static/images/webcast-mate.png',
    href: 'https://streamingtool.douyin.com/',
  },
  {
    title: 'Electron React Rspack',
    description: `An Electron-React boilerplate with TypeScript & Rspack, supporting persistent storage, 
    local logging, incremental updates, and more.`,
    imgSrc: '/static/images/electron-react-rspack.png',
    href: 'https://github.com/RyanProMax/electron-react-rspack',
  },
];

export default projectsData;
