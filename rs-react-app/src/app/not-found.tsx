'use client';
import { useRouter } from 'next/navigation';
import styles from '../styles/not-found.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404 - Pokémon Not Found!</h1>
        <p className={styles.text}>
          The page you&apos;re looking for has fled like a scared Rattata!
        </p>
        <div className={styles.pokeball}>
          <div className={styles.pokeballTop}></div>
          <div className={styles.pokeballCenter}></div>
          <div className={styles.pokeballBottom}></div>
        </div>
        <button className={styles.homeButton} onClick={() => router.push('/')}>
          Go to Pokémon Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
