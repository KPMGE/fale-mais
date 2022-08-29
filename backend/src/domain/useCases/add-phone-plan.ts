import { PhonePlan } from "../entities";

export interface AddPhonePlanUseCase {
  add(newPlan: PhonePlan): Promise<PhonePlan>
}
