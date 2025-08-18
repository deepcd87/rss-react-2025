'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={styles.container}>
      <select
        value={currentLocale}
        onChange={(e) => changeLanguage(e.target.value)}
        className={styles.select}
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
