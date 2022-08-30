import { PhonePlan } from "../../../src/domain/entities"
import { makeFakePhonePlan } from "../../domain/mocks"

interface ListPhonePlansUseCase {
  list(): Promise<PhonePlan[]>
}

interface ListPhonePlansRepository {
  list(): Promise<PhonePlan[]>
}

class ListPhonePlansRepositoryMock implements ListPhonePlansRepository {
  output = [makeFakePhonePlan(), makeFakePhonePlan()]
  async list(): Promise<PhonePlan[]> {
    return this.output
  }
}

class ListPhonePlansService implements ListPhonePlansUseCase {
  constructor(private readonly listPhonePlansRepo: ListPhonePlansRepository) { }

  async list(): Promise<PhonePlan[]> {
    return await this.listPhonePlansRepo.list()
  }
}

describe('list-phone-plans-service', () => {
  it('should return plans from repository', async () => {
    const repo = new ListPhonePlansRepositoryMock()
    const sut = new ListPhonePlansService(repo)

    const plans = await sut.list()

    expect(plans).toEqual(repo.output)
  })
})
