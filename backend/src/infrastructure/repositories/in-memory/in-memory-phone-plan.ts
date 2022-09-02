import {
  AddPhonePlanRepository,
  GetPhonePlanByDurationRepository,
  GetPhonePlanByIdRepository,
  ListPhonePlansRepository
} from "../../../application/repositories";
import { PhonePlan } from "../../../domain/entities";

let phonePlans: PhonePlan[] = []

export class InMemoryPhonePlanRepository implements
  AddPhonePlanRepository, GetPhonePlanByDurationRepository, ListPhonePlansRepository, GetPhonePlanByIdRepository {

  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    phonePlans.push(newPlan)
    return newPlan
  }

  async getByDuration(duration: number): Promise<PhonePlan> {
    return phonePlans.find(phonePlan => phonePlan.durationInMinutes == duration)
  }

  async list(): Promise<PhonePlan[]> {
    return phonePlans
  }

  async getById(planId: string): Promise<PhonePlan> {
    return phonePlans.find(phonePlan => phonePlan.id === planId)
  }
}

