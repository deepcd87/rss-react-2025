'use client';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import styles from './about.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const { theme } = useTheme();
  const t = useTranslations('aboutPage');
  return (
    <div className={`${styles.container} ${styles[theme]} `}>
      <div className={`${styles.content} ${styles[theme]}`}>
        <h1 className={styles.title}>{t('title')}</h1>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('project.title')}</h2>
          <p className={styles.text}>{t('project.text1')}</p>
          <p className={styles.text}>{t('project.text2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('aboutMe.title')}</h2>
          <p className={styles.text}>{t('aboutMe.text')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('acknowledgments.title')}</h2>
          <p className={styles.text}>{t('acknowledgments.text')}</p>
          <div className={styles.linksContainer}>
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rsSchoolLink}
            >
              <Image
                src="/assets/rsschoolLogo.webp"
                alt="RS School Logo"
                width={100}
                height={40}
                className={styles.rsLogo}
              />
              <span>{t('acknowledgments.link')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
