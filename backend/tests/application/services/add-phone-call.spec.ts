import { IdGenerator } from "../../../src/application/providers"
import { IdGeneratorMock } from "../mocks"

type PhoneCall = {
  id: string
  originDDD: string
  destinationDDD: string
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
    if (newCall.originDDD.length != 3) throw new InvalidDDDError(newCall.originDDD)
    if (newCall.destinationDDD.length != 3) throw new InvalidDDDError(newCall.destinationDDD)

    const newCallWithId = { ...newCall, id: this.idGenerator.generate() }
    const addedCall = await this.repo.add(newCallWithId)
    return addedCall
  }
}

const makeFakePhoneCall = (): AddPhoneCallUseCase.Props => ({
  destinationDDD: '000',
  originDDD: '000',
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

class InvalidDDDError extends Error {
  constructor(invalidDDD: string) {
    super(`${invalidDDD} is not a valid DDD!`)
    this.name = 'InvalidDDDError '
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

  it('should throw if originDDD or destinationDDD length is different than 3', async () => {
    const { sut } = makeSut()

    const invalidOrigin = { ...makeFakePhoneCall(), originDDD: 'invalid_origin' }
    let promise = sut.add(invalidOrigin)
    await expect(promise).rejects.toThrowError(new InvalidDDDError('invalid_origin'))

    const invalidDestination = { ...makeFakePhoneCall(), destinationDDD: 'invalid_destination' }
    promise = sut.add(invalidDestination)
    await expect(promise).rejects.toThrowError(new InvalidDDDError('invalid_destination'))
  })
})
