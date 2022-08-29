import { PhonePlan } from "../../domain/entities";

export interface GetPhonePlanByDurationRepository {
  getByDuration(duration: number): Promise<PhonePlan>
}
