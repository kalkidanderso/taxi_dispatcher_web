import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link  from "next/link";
import Script from "next/script";

export default function Home() {
  return (
     <div>
       
      <div className={styles.container}>
         <Link href="/dashboard">
        <button className={styles.button}>Redirect to Dispatcher Page</button>
        </Link>
      </div>
    </div>
  )
}
