import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { isAuthenticated } from '../utils/auth';
import styles from '../styles/Login.module.css';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard after successful login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to the Dashboard</h1>
        <p>You have successfully logged in!</p>
        <button 
          className={styles.logoutButton}
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('isAuthenticated');
              router.replace('/');
            }
          }}
        >
          Logout
        </button>
      </main>
    </div>
  );
}