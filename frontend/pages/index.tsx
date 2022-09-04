import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { Results } from '../components/Results'
import { useEffect, useState } from 'react'
import { api } from '../axios/config'
import { DropDownMenu } from '../components/DropDownMenu'
import { PhonePlan } from '../types/phone-plan'
import { PhoneCall } from '../types/phone-call'
import { getDestinationDDDs, getOriginDDDs, getPhonePlanId, getPlanNames } from '../helpers'
import { checkFields } from '../helpers/check-fields'
import { CallPrices } from '../types/call-prices'
import { alerError } from '../helpers/alert-error'

const Home: NextPage = () => {
  const [resultsOpen, setResultsOpen] = useState<boolean>(false)
  const [amountMinutes, setAmountMinutes] = useState<number>(-1)
  const [phonePlanName, setPhonePlanName] = useState<string>('')
  const [originDDD, setOriginDDD] = useState<string>('')
  const [destinationDDD, setdestinationDDD] = useState<string>('')
  const [prices, setPrices] = useState<CallPrices>()
  const [plans, setPlans] = useState<PhonePlan[]>([])
  const [calls, setCalls] = useState<PhoneCall[]>([])

  const onCloseResultsHandler = () => {
    setAmountMinutes(-1)
    setResultsOpen(false)
  }

  const calculateCallPrice = async (): Promise<boolean> => {
    const fieldsOk = checkFields(phonePlanName, amountMinutes, originDDD, destinationDDD,)
    if (!fieldsOk) return false

    if (originDDD === destinationDDD) {
      alerError('origin DDD and destination DDD must be different!')
      return false
    }

    const phonePlanId = getPhonePlanId(plans, phonePlanName)
    try {
      const result = await api.post('/phone-call/price', {
        phonePlanId,
        amountMinutes,
        originDDD,
        destinationDDD
      })

      const { priceWithoutPlan, priceWithPlan } = result.data
      setPrices({ priceWithoutPlan, priceWithPlan })
      return true
    } catch (error) {
      alerError("Can't calculate price, please try again")
      console.log(error)
      return false
    }
  }

  const calculateCallPriceHandler = async () => {
    const ok = await calculateCallPrice()
    setResultsOpen(ok)
  }

  // loads phone plans and phone calls when the application first renders
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
        {!resultsOpen ? (
          <>
            <input placeholder='Tempo (em minutos)'
              value={amountMinutes > 0 ? amountMinutes : undefined}
              type={'number'}
              onChange={(e) => setAmountMinutes(Number(e.target.value))} />

            <div className={styles.dropDown}>
              <DropDownMenu defaultValue="Origem" elements={getOriginDDDs(calls)} onSelect={setOriginDDD} />
              <DropDownMenu defaultValue="Destino" elements={getDestinationDDDs(calls)} onSelect={setdestinationDDD} />
              <DropDownMenu defaultValue="Plano" elements={getPlanNames(plans)} onSelect={setPhonePlanName} />
            </div>

            <button
              className={styles.calculateButton}
              onClick={() => calculateCallPriceHandler()
              }>
              Calcular
            </button>
          </>
        ) : (
          <Results
            priceWithPlan={prices?.priceWithPlan}
            priceWithoutPlan={prices?.priceWithoutPlan}
            onClose={() => onCloseResultsHandler()} />
        )}
      </main>
    </div>
  )
}

export default Home
