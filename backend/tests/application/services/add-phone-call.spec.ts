import { IdGenerator } from "../../../src/application/providers"
import { AddPhoneCallRepository } from "../../../src/application/repositories/add-phone-call"
import { PhoneCall } from "../../../src/domain/entities"
import { InvalidDDDError } from "../../../src/domain/erros/invalid-ddd"
import { AddPhoneCallUseCase } from "../../../src/domain/useCases"
import { IdGeneratorMock } from "../mocks"
import { AddPhoneCallRepositorySpy } from "../mocks/add-phone-call"

class AddPhoneCallService implements AddPhoneCallUseCase {
  constructor(
    private readonly repo: AddPhoneCallRepository,
    private readonly idGenerator: IdGenerator
  ) { }


  private hasOnlyNumbers(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  async add({ originDDD, destinationDDD, pricePerMinue }: AddPhoneCallUseCase.Props): Promise<PhoneCall> {

    if (originDDD.length != 3) throw new InvalidDDDError(originDDD)
    if (destinationDDD.length != 3) throw new InvalidDDDError(destinationDDD)

    if (!this.hasOnlyNumbers(originDDD)) throw new InvalidDDDError(originDDD)
    if (!this.hasOnlyNumbers(destinationDDD)) throw new InvalidDDDError(destinationDDD)

    const newCallWithId = {
      id: this.idGenerator.generate(),
      destinationDDD,
      originDDD,
      pricePerMinue
    }
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

  it('should throw if originDDD or destinationDDD are not numbers', async () => {
    const { sut } = makeSut()

    const invalidOrigin = { ...makeFakePhoneCall(), originDDD: '0a0' }
    let promise = sut.add(invalidOrigin)
    await expect(promise).rejects.toThrowError(new InvalidDDDError('0a0'))
  })
})
