import { PhoneCall } from "../../../src/domain/entities"
import { makeFakePhoneCall } from "../../domain/mocks"

interface ListPhoneCallsUseCase {
  list(): Promise<PhoneCall[]>
}

interface ListPhoneCallsRepository {
  list(): Promise<PhoneCall[]>
}

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

class ListPhoneCallsService implements ListPhoneCallsUseCase {
  constructor(private readonly repo: ListPhoneCallsRepository) { }
  async list(): Promise<PhoneCall[]> {
    return await this.repo.list()
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
