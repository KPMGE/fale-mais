import { AddPhonePlanRepository } from "../../../src/application/repositories"
import { PhonePlan } from "../../../src/domain/entities"

export class AddPhonePlanRepositoryMock implements AddPhonePlanRepository {
  input = {}
  callsCount = 0
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    this.callsCount++
    return newPlan
  }
}
