'use client';

import { CreateCentralForm } from '../../../../presentation/pages/centrais-page/create-central-form';
import * as styles from './styles/page.css';

export default function CreateNovaCentralPage() {
  return (
    <div className={styles.container}>
      <CreateCentralForm />
    </div>
  );
}
