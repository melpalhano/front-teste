import CentraisPage from '@pages/centrais-page';
import { Suspense } from 'react';

export default function Centrais() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CentraisPage />
    </Suspense>
  );
}
