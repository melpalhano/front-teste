import '@styles/global.css';

import { fonts } from '@components/styles/fonts';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { CentralCounterProvider } from '../presentation/providers/central-counter-provider';
import { QueryProvider } from '../presentation/providers/query-provider';

export const metadata: Metadata = {
  title: 'Defense IA | Middlewares e Centrais',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br' className={fonts.nunito}>
      <body>
        <QueryProvider>
          <CentralCounterProvider>
            {children}
          </CentralCounterProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
