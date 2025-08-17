'use client';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './about.module.css';
import Image from 'next/image';

const AboutPage = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${styles.container} ${styles[theme]} `}
      data-testid="about-page"
    >
      <div
        className={`${styles.content} ${styles[theme]}`}
        data-testid="about-content"
      >
        <h1 className={styles.title}>About Pokémon App</h1>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>The Project</h2>
          <p className={styles.text} data-testid="about-me-text">
            This Pokémon application was created as a course project for the RS
            School React course. It demonstrates my skills in React, TypeScript,
            and modern web development.
          </p>
          <p className={styles.text}>
            The app allows users to browse Pokémon information, view details
            about each Pokémon, and experience Pokémon-themed UI elements.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.text}>
            Hello! I&apos;m Denis, a beginner web developer passionate about
            creating interactive and user-friendly applications. This project
            represents my journey in learning React and modern frontend
            development.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Acknowledgments</h2>
          <p className={styles.text}>
            Special thanks to RS School for providing excellent learning
            materials and this opportunity to grow as a developer.
          </p>
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
              <span>Visit RS School React Course</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
