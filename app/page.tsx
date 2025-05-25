import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/locales/config';

export default function Home() {
  redirect(`/${DEFAULT_LOCALE}`);
}
