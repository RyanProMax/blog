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
            className=":border-white flex items-center justify-center gap-2 rounded-md border bg-black p-1 px-2 text-sm font-bold text-white md:text-base"
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
