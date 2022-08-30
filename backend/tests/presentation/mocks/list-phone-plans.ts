import { PhonePlan } from "../../../src/domain/entities"
import { ListPhonePlansUseCase } from "../../../src/domain/useCases"
import { makeFakePhonePlan } from "../../domain/mocks"

export class ListPhonePlansServiceMock implements ListPhonePlansUseCase {
  output = [makeFakePhonePlan(), makeFakePhonePlan()]
  async list(): Promise<PhonePlan[]> {
    return this.output
  }
}
