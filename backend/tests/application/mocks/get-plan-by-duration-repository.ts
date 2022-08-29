import { GetPhonePlanByDurationRepository } from "../../../src/application/repositories"
import { PhonePlan } from "../../../src/domain/entities"

export class GetPhonePlanByDurationRepositoryMock implements GetPhonePlanByDurationRepository {
  input = 0
  output = null
  async getByDuration(duration: number): Promise<PhonePlan> {
    this.input = duration
    return this.output
  }
}

