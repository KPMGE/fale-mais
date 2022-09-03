import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { DropDownList } from '../components/DropDownList'
import { Results } from '../components/Results'
import { useState } from 'react'

const Home: NextPage = () => {
  const [resultsOpen, setResultsOpen] = useState<boolean>(true)

  return (
    <div className={styles.container}>
      <header>
        <h2>Fale mais!</h2>
      </header>

      <main className={styles.main}>
        {resultsOpen ? (
          <>
            <input placeholder='Tempo (em minutos)' type={'number'} />
            <DropDownList />
            <button className={styles.calculateButton} onClick={() => setResultsOpen(false)}>Calcular</button>
          </>
        ) : (
          <Results
            priceWithoutPlan={30}
            priceWithPlan={20}
            onClose={() => setResultsOpen(true)} />
        )}
      </main>
    </div>
  )
}

export default Home
