'use client';
import { useRouter } from '@/i18n/navigation';
import styles from '@/styles/not-found.module.css';
import { useTranslations } from 'next-intl';

const NotFoundPage = () => {
  const router = useRouter();
  const t = useTranslations('notFound');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.text}>{t('text')}</p>
        <div className={styles.pokeball}>
          <div className={styles.pokeballTop}></div>
          <div className={styles.pokeballCenter}></div>
          <div className={styles.pokeballBottom}></div>
        </div>
        <button className={styles.homeButton} onClick={() => router.push('/')}>
          {t('button')}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
