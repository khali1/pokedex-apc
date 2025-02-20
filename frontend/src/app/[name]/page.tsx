'use client';
import styles from './page.module.scss';
import Link from 'next/link';

export default function PokemonDetail() {
  return (
    <div className={styles.container}>
      <Link href="/browse" className={styles.backLink}>← Back to list</Link>
    </div>
  );
} 