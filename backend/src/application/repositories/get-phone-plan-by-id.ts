import { PhonePlan } from "../../domain/entities";

export interface GetPhonePlanByIdRepository {
  getById(planId: string): Promise<PhonePlan>
}
