import { PhonePlan } from "../entities";

export interface GetPhonePlanByIdUseCase {
  getById(planId: string): Promise<PhonePlan>
}
