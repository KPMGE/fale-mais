import { ListPhoneCallsRepository } from "../../../src/application/repositories"
import { ListPhoneCallsService } from "../../../src/application/services"
import { PhoneCall } from "../../../src/domain/entities"
import { makeFakePhoneCall } from "../../domain/mocks"

class ListPhoneCallsRepositoryStub implements ListPhoneCallsRepository {
  private fakePhoneCall: PhoneCall = {
    ...makeFakePhoneCall(),
    id: 'any id'
  }
  output = [this.fakePhoneCall, this.fakePhoneCall, this.fakePhoneCall]

  async list(): Promise<PhoneCall[]> {
    return this.output
  }
}

type SutTypes = {
  sut: ListPhoneCallsService,
  repo: ListPhoneCallsRepositoryStub
}

const makeSut = (): SutTypes => {
  const repo = new ListPhoneCallsRepositoryStub()
  const sut = new ListPhoneCallsService(repo)

  return { sut, repo }
}

describe('list-phone-calls-service', () => {
  it('should return from repository', async () => {
    const { sut, repo } = makeSut()

    const phoneCalls = await sut.list()

    expect(phoneCalls).toEqual(repo.output)
  })

  it('should throw error if repository throws', async () => {
    const { sut, repo } = makeSut()
    repo.list = () => { throw new Error('repo error') }

    const promise = sut.list()

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })
})
