import { ListPhonePlansRepository } from "../../../src/application/repositories/list-phone-plans"
import { ListPhonePlansService } from "../../../src/application/services/list-plans"
import { PhonePlan } from "../../../src/domain/entities"
import { makeFakePhonePlan } from "../../domain/mocks"

class ListPhonePlansRepositoryMock implements ListPhonePlansRepository {
  output = [makeFakePhonePlan(), makeFakePhonePlan()]
  async list(): Promise<PhonePlan[]> {
    return this.output
  }
}

describe('list-phone-plans-service', () => {
  it('should return plans from repository', async () => {
    const repo = new ListPhonePlansRepositoryMock()
    const sut = new ListPhonePlansService(repo)

    const plans = await sut.list()

    expect(plans).toEqual(repo.output)
  })

  it('should throw if repository throws', async () => {
    const repo = new ListPhonePlansRepositoryMock()
    const sut = new ListPhonePlansService(repo)
    repo.list = () => { throw new Error('repo error') }

    const promise = sut.list()

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })
})
