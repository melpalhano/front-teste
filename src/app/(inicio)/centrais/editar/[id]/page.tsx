'use client';

import { EditCentralForm } from '../../../../../presentation/pages/centrais-page/edit-central-form';
import * as styles from '../../nova-central/styles/page.css';

interface EditCentralPageProps {
  params: {
    id: string;
  };
}

export default function EditCentralPage({ params }: EditCentralPageProps) {
  const centralId = parseInt(params.id, 10);

  if (isNaN(centralId)) {
    return <div>ID de central inválido</div>;
  }

  return (
    <div className={styles.container}>
      <EditCentralForm centralId={centralId} />
    </div>
  );
}
