import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { Results } from '../components/Results'
import { useEffect, useState } from 'react'
import { api } from '../axios/config'
import { DropDownMenu } from '../components/DropDownMenu'

type PhonePlan = {
  id: string
  name: string
  durationInMinutes: number
  tax: number
}

type PhoneCall = {
  id: string
  originDDD: string
  destinationDDD: string
  pricePerMinute: number
}

const Home: NextPage = () => {
  const [resultsOpen, setResultsOpen] = useState<boolean>(true)
  const [amountMinutes, setAmountMinutes] = useState<number | undefined>(undefined)
  const [phonePlanName, setPhonePlanName] = useState<string>('')
  const [originDDD, setOriginDDD] = useState<string>('')
  const [destinationDDD, setdestinationDDD] = useState<string>('')
  const [priceWithPlan, setPriceWithPlan] = useState<number>(-1)
  const [priceWithoutPlan, setPriceWithoutPlan] = useState<number>(-1)

  const [plans, setPlans] = useState<PhonePlan[]>([])
  const [calls, setCalls] = useState<PhoneCall[]>([])


  const getPhonePlanId = (): string => {
    const plan = plans.find(plan => plan.name === phonePlanName)
    if (!plan) throw new Error('plan id not found!')
    return plan.id
  }

  const calculatePrice = async () => {
    console.log('plan id: ', getPhonePlanId())

    try {
      const result = await api.post('/phone-call/price', {
        phonePlanId: getPhonePlanId(),
        amountMinutes,
        originDDD,
        destinationDDD
      })

      console.log('data: ', result.data)
      setPriceWithPlan(result.data.priceWithPlan)
      setPriceWithoutPlan(result.data.priceWithoutPlan)
    } catch (error) {
      console.log(error)
    }
  }

  const calculatePriceHandler = async () => {
    await calculatePrice()
    setResultsOpen(false)
  }

  const getPlanNames = (): string[] => {
    return plans.map(plan => plan.name)
  }

  const getOriginDDDs = (): string[] => {
    return calls.map(call => call.originDDD)
  }

  const getDestinationDDDs = (): string[] => {
    return calls.map(call => call.destinationDDD)
  }

  useEffect(() => {
    (async () => {
      try {
        const plans = await api.get('/phone-plan')
        setPlans(plans.data)

        const calls = await api.get('phone-call')
        setCalls(calls.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      <header>
        <h2>Fale mais!</h2>
      </header>

      <main className={styles.main}>
        {resultsOpen ? (
          <>
            <input placeholder='Tempo (em minutos)'
              value={amountMinutes}
              type={'number'}
              onChange={(e) => setAmountMinutes(Number(e.target.value))} />

            <div className={styles.dropDown}>
              <DropDownMenu defaultValue="Origem" elements={getOriginDDDs()} onSelect={setOriginDDD} />
              <DropDownMenu defaultValue="Destino" elements={getDestinationDDDs()} onSelect={setdestinationDDD} />
              <DropDownMenu defaultValue="Plano" elements={getPlanNames()} onSelect={setPhonePlanName} />
            </div>

            <button
              className={styles.calculateButton}
              onClick={() => calculatePriceHandler()
              }>
              Calcular
            </button>
          </>
        ) : (
          <Results
            priceWithPlan={priceWithPlan}
            priceWithoutPlan={priceWithoutPlan}
            onClose={() => setResultsOpen(true)} />
        )}
      </main>
    </div>
  )
}

export default Home
