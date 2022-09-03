import { PhonePlan } from "../../../src/domain/entities";

export const makeFakePhonePlan = (): PhonePlan => ({
  name: 'any_name',
  id: 'any_phone_plan_id',
  tax: 0.1,
  durationInMinutes: 30
})
