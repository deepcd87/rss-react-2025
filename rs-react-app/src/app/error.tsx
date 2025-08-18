'use client';
import { useEffect } from 'react';
import styles from '../styles/error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorFallback}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className={styles.reloadButton}>
        Try Again
      </button>
    </div>
  );
}
