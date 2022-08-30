import { ListPhonePlansRepository } from "../../../src/application/repositories/list-phone-plans"
import { PhonePlan } from "../../../src/domain/entities"
import { makeFakePhonePlan } from "../../domain/mocks"

export class ListPhonePlansRepositoryMock implements ListPhonePlansRepository {
  output = [makeFakePhonePlan(), makeFakePhonePlan()]
  async list(): Promise<PhonePlan[]> {
    return this.output
  }
}
