import clsx from 'clsx'
import {
  ElectronIcon,
  ReactIcon,
  TypeScript,
  JavaScript,
  PythonIcon,
  Git,
} from '@/components/tech-icons'

export const DevIcons = {
  Electron: ElectronIcon,
  React: ReactIcon,
  TypeScript: TypeScript,
  JavaScript: JavaScript,
  Python: PythonIcon,
  Git: Git,
}

export const FamiliarTechStack = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(DevIcons).map(([t, Icon]) => {
        return (
          <div
            key={t}
            className={clsx([
              'flex items-center justify-center',
              'gap-2 p-1 px-2',
              'rounded-md border',
              'text-sm font-bold md:text-base',
              'border-black bg-transparent text-black dark:border-white dark:text-white',
            ])}
          >
            {t}
            <div>
              <Icon />
            </div>
          </div>
        )
      })}
    </div>
  )
}
