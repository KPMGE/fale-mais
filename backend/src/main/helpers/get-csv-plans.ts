import { readFileSync } from 'fs'
import { PhonePlan } from "../../domain/entities";

type PhonePlanInput = Omit<PhonePlan, 'id'>

export const getCsvPlans = (location: string): PhonePlanInput[] => {
  const csvBuf = readFileSync(location)
  const csvData = String(csvBuf)
  const rows = csvData.slice(csvData.indexOf("\n") + 1).split("\n");

  let plans: PhonePlanInput[] = []

  for (const row of rows) {
    const [name, durationStr, taxStr] = row.split(',')
    const durationInMinutes = Number(durationStr)
    const tax = Number(taxStr)

    plans.push({
      durationInMinutes,
      name,
      tax
    })
  }

  plans.pop()
  return plans
}
