import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Login.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login page for testing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
}