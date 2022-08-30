import { IdGenerator } from "../../../src/application/providers"
import { IdGeneratorMock } from "../mocks"

type PhoneCall = {
  id: string
  origin: string
  destination: string
  pricePerMinue: number
}

export namespace AddPhoneCallUseCase {
  export type Props = Omit<PhoneCall, 'id'>
}

interface AddPhoneCallUseCase {
  add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall>
}

interface AddPhoneCallRepository {
  add(newCall: PhoneCall): Promise<PhoneCall>
}

class AddPhoneCallRepositorySpy implements AddPhoneCallRepository {
  input = null
  output = null
  async add(newCall: PhoneCall): Promise<PhoneCall> {
    this.input = this.output = newCall
    return this.output
  }
}

class AddPhoneCallService implements AddPhoneCallUseCase {
  constructor(
    private readonly repo: AddPhoneCallRepository,
    private readonly idGenerator: IdGenerator
  ) { }

  async add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall> {
    const newCallWithId = { ...newCall, id: this.idGenerator.generate() }
    const addedCall = await this.repo.add(newCallWithId)
    return addedCall
  }
}

const makeFakePhoneCall = (): AddPhoneCallUseCase.Props => ({
  destination: '000',
  origin: '000',
  pricePerMinue: 2.2,
})

type SutTypes = {
  sut: AddPhoneCallService,
  idGeneratorMock: IdGeneratorMock,
  addRepoSpy: AddPhoneCallRepositorySpy
}

const makeSut = (): SutTypes => {
  const addRepoSpy = new AddPhoneCallRepositorySpy()
  const idGeneratorMock = new IdGeneratorMock()
  const sut = new AddPhoneCallService(addRepoSpy, idGeneratorMock)
  return {
    sut,
    idGeneratorMock,
    addRepoSpy
  }
}

describe('add-phone-call-service', () => {
  it('should create an id for the phone call before sending it to the repository', async () => {
    const { addRepoSpy, idGeneratorMock, sut } = makeSut()

    await sut.add(makeFakePhoneCall())

    expect(addRepoSpy.input).toEqual({ ...makeFakePhoneCall(), id: idGeneratorMock.output })
  })

  it('should return the added phone call', async () => {
    const { addRepoSpy, sut } = makeSut()

    const addedCall = await sut.add(makeFakePhoneCall())

    expect(addedCall).toEqual(addRepoSpy.output)
  })

  it('should throw if repository throws', async () => {
    const { addRepoSpy, sut } = makeSut()
    addRepoSpy.add = () => { throw new Error('repo error') }

    const promise = sut.add(makeFakePhoneCall())

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })
})
