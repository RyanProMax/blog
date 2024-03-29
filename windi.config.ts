import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';

/**
 * windicss document
 * English: https://windicss.org/
 * Chinese: https://cn.windicss.org/
 */
export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
      colors: {
        gray: colors.gray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia
      }
    }
  },
  shortcuts: {
    'btn': 'py-1 px-4 font-sans font-thin rounded transition duration-250',
    'btn-red': 'text-white bg-red-500 hover:bg-red-700',
    'input': 'py-2 px-4 text-center border-1 rounded border-gray-500 outline-none font-thin bg-transparent hover:(border-red-500) focus:(border-red-500) transition duration-250',
    'icon': 'w-6 h-6 transition duration-250 cursor-pointer',
    'icon-red': 'fill-gray-500 hover:fill-red-500 dark:fill-gray-300 dark:hover:fill-red-500',
    'text-hover': 'transition duration-250 cursor-pointer border border-transparent',
    'text-hover-red': 'hover:(border-b-red-500 text-red-500)',
    'text-oh-ellipsis': 'overflow-hidden whitespace-nowrap overflow-ellipsis'
  }
});
