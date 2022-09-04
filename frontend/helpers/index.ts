import { PhoneCall } from "../types/phone-call"
import { PhonePlan } from "../types/phone-plan"

export const getPlanNames = (plans: PhonePlan[]): string[] => {
  return plans.map(plan => plan.name)
}

export const getOriginDDDs = (calls: PhoneCall[]): string[] => {
  // extract just the originDDDs 
  const ddds = calls.map(call => call.originDDD)
  // create an array with sorted unique ddds
  const uniqueDdds = [...new Set(ddds)].sort()
  return uniqueDdds
}

export const getDestinationDDDs = (calls: PhoneCall[]): string[] => {
  // extract just the destinationDDDs 
  const ddds = calls.map(call => call.destinationDDD)
  // create an array with sorted unique ddds
  const uniqueDdds = [...new Set(ddds)].sort()
  return uniqueDdds
}

export const getPhonePlanId = (plans: PhonePlan[], planName: string): string | undefined => {
  const plan = plans.find(plan => plan.name === planName)
  if (!plan) return undefined
  return plan.id
}
