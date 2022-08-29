import { PhonePlan } from "../../domain/entities";

export interface AddPhonePlanRepository {
  add(newPlan: PhonePlan): Promise<PhonePlan>
}
