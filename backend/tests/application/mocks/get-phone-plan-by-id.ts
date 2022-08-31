import { GetPhonePlanByIdRepository } from "../../../src/application/repositories"
import { PhonePlan } from "../../../src/domain/entities"
import { makeFakePhonePlan } from "../../domain/mocks"

export class GetPhonePlanByIdRepositoryMock implements GetPhonePlanByIdRepository {
  input = ""
  output = makeFakePhonePlan()
  async getById(planId: string): Promise<PhonePlan> {
    this.input = planId
    return this.output
  }
}
