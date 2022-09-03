import { PhonePlan } from "../entities";

export interface AddPhonePlanUseCase {
  add(newPlan: AddPhonePlanUseCase.Props): Promise<PhonePlan>
}

export namespace AddPhonePlanUseCase {
  export type Props = {
    name: string
    tax: number
    durationInMinutes: number
  }
}
