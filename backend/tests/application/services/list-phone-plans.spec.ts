import { ListPhonePlansService } from "../../../src/application/services/list-plans"
import { ListPhonePlansRepositoryMock } from "../mocks"

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
