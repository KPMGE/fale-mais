import { PhonePlan } from "../../../src/domain/entities"
import { GetPhonePlanByIdUseCase } from "../../../src/domain/useCases"
import { makeFakePhonePlan } from "../../domain/mocks"

export class GetPhonePlanByIdServiceStub implements GetPhonePlanByIdUseCase {
  output = makeFakePhonePlan()
  async getById(planId: string): Promise<PhonePlan> {
    return this.output
  }
}
