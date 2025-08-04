import '@styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { fonts } from '@components/styles/fonts';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { UndoNotificationDefault } from '../presentation/components/core/undo-notification';
import { CentralCounterProvider } from '../presentation/providers/central-counter-provider';
import { QueryProvider } from '../presentation/providers/query-provider';

export const metadata: Metadata = {
  title: 'Defense IA | Middlewares e Centrais',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br' className={fonts.nunito}>
      <head>
        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </head>
      <body>
        <QueryProvider>
          <CentralCounterProvider>
            {children}
            <UndoNotificationDefault />
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
            />
          </CentralCounterProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
