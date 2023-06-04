import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>R!ck Ye110w</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/R.svg" type="image/svg+xml" />
      </Head>
      <main className={styles.main}>
        {/* 狀態顯示的部分 */}
        <div className={styles.status}>
        </div>

        {/* 主要內容 */}
        <div className={styles.contents}>
          <h1 className={styles.title}>
            Hi, I'm<Link href="/about" className={styles.rick}>R!ck Ye110w.</Link>
          </h1>
          <p className={styles.description}>
            Software Developer & Engineer/ Poker Lover
          </p>
        </div>

        {/* 其他連結與互動 */}
        <div className={styles.interactions}>
          <Link href="/contact" className={styles.hireMe}>
            <span className={styles.leftPointer}>👉🏼</span>
            <span>Hire Me</span>
            <span className={styles.rightPointer}>👈🏼</span>
          </Link>
        </div>
      </main>
    </>
  )
}
