import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
// import demo from './demo';

export default function news() {
  return (
    <div className={styles.container}>
         <Link href="/demo">
        <button className={styles.button}>Redirect to Chart</button>
        </Link>
        <Link href="/alter">
        <button className={styles.button}>Redirect to Alter</button>
        </Link>
       {/* <demo /> */}
      </div>
  )
}

