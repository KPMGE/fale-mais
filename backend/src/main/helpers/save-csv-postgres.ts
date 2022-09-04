import { makeAddPhoneCallController, makeAddPhonePlanController } from "../factories/controllers"
import { getCsvPlans } from "./get-csv-plans"
import { getCsvPrices } from "./get-csv-prices"

export const saveCsvPricesToPostgres = async (csvLocation: string) => {
  const prices = getCsvPrices(csvLocation)

  for (const price of prices) {
    await makeAddPhoneCallController().handle(price)
  }
}

export const saveCsvPlansToPostgres = async (csvLocation: string) => {
  const plans = getCsvPlans(csvLocation)

  for (const plan of plans) {
    await makeAddPhonePlanController().handle(plan)
  }
}
