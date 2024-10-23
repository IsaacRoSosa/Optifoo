import Image from "next/image";
import styles from "./page.module.css";




export default function Home() {


  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image src="/Images/sidebar/Jobmiga_logo.png" alt="Jobmiga Logo" width={90} height={90} />
        <h1 className={styles.brand}>JOBHILL</h1>

      </div>



  
    </main>
  );
}
 