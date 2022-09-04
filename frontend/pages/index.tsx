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
import Swal from 'sweetalert2'

const Home: NextPage = () => {
  const [resultsOpen, setResultsOpen] = useState<boolean>(false)
  const [amountMinutes, setAmountMinutes] = useState<number | undefined>(undefined)
  const [phonePlanName, setPhonePlanName] = useState<string>('')
  const [originDDD, setOriginDDD] = useState<string>('')
  const [destinationDDD, setdestinationDDD] = useState<string>('')
  const [priceWithPlan, setPriceWithPlan] = useState<number | undefined>(undefined)
  const [priceWithoutPlan, setPriceWithoutPlan] = useState<number | undefined>(undefined)

  // all phone plans
  const [plans, setPlans] = useState<PhonePlan[]>([])
  // all phone calls
  const [calls, setCalls] = useState<PhoneCall[]>([])

  const onCloseResultsHandler = () => {
    setResultsOpen(false)
    setAmountMinutes(undefined)
  }

  const calcultaCallPrice = async (): Promise<boolean> => {
    const fieldsOk = checkFields(phonePlanName, amountMinutes, originDDD, destinationDDD,)
    if (!fieldsOk) return false

    if (originDDD === destinationDDD) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'origin DDD and destination DDD must be different!',
      })
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

      setPriceWithPlan(result.data.priceWithPlan)
      setPriceWithoutPlan(result.data.priceWithoutPlan)
    } catch (error) {
      console.log(error)
      return false
    }

    return true
  }

  const calcultaCallPriceHandler = async () => {
    const ok = await calcultaCallPrice()
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
              value={amountMinutes}
              type={'number'}
              onChange={(e) => setAmountMinutes(Number(e.target.value))} />

            <div className={styles.dropDown}>
              <DropDownMenu defaultValue="Origem" elements={getOriginDDDs(calls)} onSelect={setOriginDDD} />
              <DropDownMenu defaultValue="Destino" elements={getDestinationDDDs(calls)} onSelect={setdestinationDDD} />
              <DropDownMenu defaultValue="Plano" elements={getPlanNames(plans)} onSelect={setPhonePlanName} />
            </div>

            <button
              className={styles.calculateButton}
              onClick={() => calcultaCallPriceHandler()
              }>
              Calcular
            </button>
          </>
        ) : (
          <Results
            priceWithPlan={priceWithPlan}
            priceWithoutPlan={priceWithoutPlan}
            onClose={() => onCloseResultsHandler()} />
        )}
      </main>
    </div>
  )
}

export default Home
