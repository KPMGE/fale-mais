import { AddPhonePlanRepository, GetPhonePlanByDurationRepository } from "../../../application/repositories";
import { PhonePlan } from "../../../domain/entities";

let phonePlans: PhonePlan[] = []

export class InMemoryPhonePlanRepository implements AddPhonePlanRepository, GetPhonePlanByDurationRepository {
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    phonePlans.push(newPlan)
    return newPlan
  }

  async getByDuration(duration: number): Promise<PhonePlan> {
    return phonePlans.find(phonePlan => phonePlan.durationInMinutes == duration)
  }
}

