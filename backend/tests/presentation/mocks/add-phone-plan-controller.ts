import { PhonePlan } from "../../../src/domain/entities"
import { AddPhonePlanUseCase } from "../../../src/domain/useCases"
import { makeFakePhonePlan } from "../../domain/mocks"

export class AddPhonePlanServiceMock implements AddPhonePlanUseCase {
  input = null
  output = makeFakePhonePlan()
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    return this.output
  }
}
